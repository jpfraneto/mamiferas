import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  const [loading2, setLoading2] = useState(true);
  useEffect(() => {
    getProfiles();
    setLoading2(false);
  }, [getProfiles]);

  return (
    <Fragment>
      {profiles === null || loading || loading2 ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Futuras Mamás / Futuros Papás</h1>
          <p className='lead'>
            Conoce a otr@s que están en transición y apoyense mutuamente en este
            camino
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No hay otros papás...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
