import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const NewResource = ({ resource }) => {
  let location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const a = location.search;
  const index = a.indexOf('tema');
  const category = a.slice(index + 5, a.length).toLowerCase();
  const [data, setData] = useState({
    category,
  });

  const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const body = JSON.stringify(data);
    setLoading(true);
    const res = await axios.post('/api/resources', body, config);
    history.push(`/resources/${data.category}`);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Agrega Un Nuevo Recurso</h1>
      <p>Muchas gracias por contribuir a que tod@s nos informemos.</p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Título'
            name='title'
            required
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Título</small>
        </div>

        <div className='form-group'>
          <select
            name='category'
            value={data.category}
            label={data.category}
            onChange={e => onChange(e)}
          >
            <option value='parto'>Parto</option>
            <option value='puerperio'>Puerperio</option>
            <option value='embarazo'>Embarazo</option>
            <option value='lactancia'>Lactancia</option>
            <option value='crianza'>Crianza</option>
            <option value='relaciones'>Relaciones</option>
          </select>
          <small className='form-text'>Categoría</small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Tu Nombre'
            name='addedBy'
            required
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Nombre</small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Dirección Web'
            name='url'
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Ingresa el link del recurso</small>
        </div>

        <div className='form-group'>
          <select name='mediaType' onChange={e => onChange(e)}>
            <option value='video'>Video</option>
            <option value='image'>Imagen</option>
            <option value='article'>Artículo</option>
            <option value='music'>Música</option>
            <option value='webpage'>Página Web</option>
          </select>
          <small className='form-text'>Tipo de Recurso</small>
        </div>

        <div className='form-group'>
          <textarea
            placeholder='Descripción'
            name='description'
            required
            onChange={e => onChange(e)}
          />
          <small className='form-text'>Descripción</small>
        </div>

        <input type='submit' className='btn btn-success' value='Agregar' />
        <Link to='/resources' className='btn btn-primary'>
          Atrás
        </Link>
      </form>
    </Fragment>
  );
};

export default NewResource;
