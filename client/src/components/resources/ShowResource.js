import React, { Fragment, useEffect, useState } from 'react';
import ResourcesItem from './ResourcesItem';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import axios from 'axios';

const ShowResource = ({ props, match }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState({});
  useEffect(() => {
    const getResourceById = async () => {
      const res = await axios.get(`/api/resources/resource/${match.params.id}`);
      setResource(res.data);
      setLoading(false);
    };
    getResourceById();
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <p>Acá se muestra el recurso</p>
          <button
            onClick={() => {
              console.log(resource);
            }}
          >
            console resource
          </button>
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

export default ShowResource;
