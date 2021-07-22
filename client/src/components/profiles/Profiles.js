import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({
  getProfiles,
  profile: { profiles, loading },
  user: { parentIdentificator },
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {profiles === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>
            {parentIdentificator ? 'Futuros Papás' : 'Futuras Mamás'}{' '}
          </h1>
          <p className='lead'>
            Conoce a otr{parentIdentificator ? 'o' : 'a'}s que están en
            transición y apoyense mutuamente en este camino
          </p>
          <div className='profiles'>
            {profiles.length > 0 || loading ? (
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
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
