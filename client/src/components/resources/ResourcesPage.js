import React, { Fragment, useEffect, useState } from 'react';
import ResourcesItem from './ResourcesItem';
import ResourcesItem2 from './ResourcesItem2';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import axios from 'axios';

const ResourcesPage = props => {
  const history = useHistory();
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
          <p>Información que ha sido compartida en torno a este tema:</p>
          {resources.length > 0 ? (
            resources.map((resource, index) => (
              <ResourcesItem2 key={index} resource={resource} />
            ))
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
