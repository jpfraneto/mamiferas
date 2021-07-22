import React, { Fragment, useEffect, useState } from 'react';
import ResourcesItem from './ResourcesItem';
import { Link, useLocation } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import axios from 'axios';

const ResourcesPage = props => {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);
  useEffect(() => {
    const getResources = async () => {
      const res = await axios.get(`/api/resources/${props.tema}`);
      // const res = await axios.get(`/api/resources`);
      setResources(res.data.resources);
      setLoading(false);
    };
    getResources();
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>{props.tema}</h1>
          <p>
            Acá se va a hablar de este tema, y se va a compartir material
            asociado a él.
          </p>
          {resources.length > 0 ? (
            resources.map((resource, index) => (
              <ResourcesItem key={index} resource={resource} />
            ))
          ) : (
            <Fragment>
              <p>Aún no hay recursos para este tema.</p>
              <Link
                className='btn btn-success'
                to={`/resources/new?tema=${props.tema}`}
              >
                Agregar Recurso
              </Link>
            </Fragment>
          )}
          <Link to={'/resources'} className='btn btn-primary'>
            Volver
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ResourcesPage;
