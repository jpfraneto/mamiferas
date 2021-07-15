import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ResourcesItem = props => {
  return (
    <Fragment>
      <h1 className='large text-primary'>{props.tema}</h1>
      <p>
        Acá se va a hablar de este tema, y se va a compartir material asociado a
        él.
      </p>
      <Link to={'/resources'} className='btn btn-primary'>
        Volver
      </Link>
    </Fragment>
  );
};

export default ResourcesItem;
