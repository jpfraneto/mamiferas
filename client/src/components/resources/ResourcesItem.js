import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const ResourcesItem = ({ resource }) => {
  return (
    <Fragment>
      <div style={{ border: 'solid black 1px' }}>
        <p>Category: {resource.category}</p>
        <h3>Name: {resource.name}</h3>
        <p>Added By: {resource.addedBy}</p>
        <p>Link: {resource.url}</p>
        <p>Description: {resource.description}</p>
      </div>
    </Fragment>
  );
};

export default ResourcesItem;
