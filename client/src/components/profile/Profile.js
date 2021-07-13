import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import functions from '../../utils/functions';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileImages from './ProfileImages';
import ProfileArticles from './ProfileArticles';
import { getProfileByUsername } from '../../actions/profile';

const Profile = ({
  getProfileByUsername,
  profile: { profile, loading },
  auth,
  match,
}) => {
  let history = useHistory();
  console.log('The match.params.username is: ', match.params.username);
  const [birthDate, setBirthDate] = useState('');
  useEffect(() => {
    const getProfileInfo = async () => {
      const profileInfo = await getProfileByUsername(match.params.username);
      if (profileInfo && profileInfo.miracle) {
        const miracleDate = functions.calculateWeekFromNow(profileInfo.miracle);
        setBirthDate(miracleDate);
      }
    };
    getProfileInfo();
  }, [getProfileByUsername, match.params.username]);
  return (
    <Fragment>
      {profile === null ||
      match.params.username !== profile.username ||
      loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <button onClick={() => history.goBack()} className='btn btn-light'>
            Volver
          </button>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Editar Perfil
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop birthDate={birthDate} profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
          <ProfileArticles profile={profile} />
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileByUsername: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileByUsername })(Profile);
