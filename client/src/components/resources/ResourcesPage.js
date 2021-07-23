import React, { Fragment, useEffect, useState } from 'react';
import ResourcesItem from './ResourcesItem';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import axios from 'axios';

const ResourcesPage = props => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  useEffect(() => {
    const getResources = async () => {
      const res = await axios.get(`/api/resources/${props.tema}`);
      // const res = await axios.get(`/api/resources`);
      setResources(res.data.resources);
      setFilteredResources(res.data.resources);
      setLoading(false);
    };
    getResources();
  }, []);
  const filterByMediaType = e => {
    if (e.target.value === 'none') return setFilteredResources(resources);
    const filtered = resources.filter(
      resource => resource.mediaType === e.target.value
    );
    console.log('the filtered resources are:', filtered);
    setFilteredResources(filtered);
  };
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>{props.tema}</h1>
          <p>Información que ha sido compartida en torno a este tema:</p>
          <div className='form-group'>
            <select name='filter' onChange={e => filterByMediaType(e)}>
              <option value='none'>Sin Filtro</option>
              <option value='video'>Video</option>
              <option value='image'>Imagen</option>
              <option value='article'>Artículo</option>
              <option value='music'>Música</option>
              <option value='webpage'>Página Web</option>
            </select>
            <small className='form-text'>
              {'     '}Filtrar por Tipo de Recurso
            </small>
          </div>
          {resources.length > 0 ? (
            filteredResources.length > 0 ? (
              <Fragment>
                {filteredResources.map((resource, index) => (
                  <ResourcesItem key={index} resource={resource} />
                ))}
              </Fragment>
            ) : (
              <Fragment>
                <p>Todavía no hay recursos de ese tipo en este tema.</p>
              </Fragment>
            )
          ) : (
            <Fragment>
              <p>Aún no hay recursos para este tema.</p>
            </Fragment>
          )}
          <Link
            className='btn btn-success'
            to={`/resources/new?tema=${props.tema}`}
          >
            Agregar Nuevo
          </Link>
          <button
            onClick={() => {
              history.goBack();
            }}
            className='btn btn-primary'
          >
            Volver
          </button>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResourcesPage;
