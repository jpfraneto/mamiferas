import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import axios from 'axios';

const ResourcesItem = ({ resource }) => {
  const [likes, setLikes] = useState(resource.likes.length);
  const [disableBtn, setDisableBtn] = useState(false);
  const addLikeToResource = async id => {
    const res = await axios.get(`/api/resources/resource/${id}/add-like`);
    setLikes(res.data.resource.likes.length);
    setDisableBtn(true);
  };
  return (
    <Fragment>
      <div className='resource-display'>
        <p>
          <strong>Categoría:</strong> {resource.category}
        </p>
        <p>
          <strong>Nombre:</strong> {resource.title}
        </p>
        <p>
          <strong>Agregado Por:</strong> {resource.addedBy}
        </p>
        <p>
          <strong>Link:</strong> {resource.url}
        </p>
        <p>
          <strong>Descripción:</strong> {resource.description}
        </p>
        <Link
          className='btn btn-success'
          to={{ pathname: resource.url }}
          target='_blank'
        >
          Visitar
        </Link>
        <button
          className='btn btn-primary'
          onClick={() => {
            {
              disableBtn
                ? alert('Ya mencionaste la utilidad de este recurso una vez!')
                : addLikeToResource(resource._id);
            }
          }}
        >
          ¿Fue útil para ti? 👍🏻 {likes}
        </button>
      </div>
    </Fragment>
  );
};

export default ResourcesItem;
