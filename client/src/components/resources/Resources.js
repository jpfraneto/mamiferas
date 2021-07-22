import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const temas = [
  'Embarazo',
  'Parto',
  'Puerperio',
  'Lactancia',
  'Crianza',
  'Relaciones',
];

const Resources = () => {
  return (
    <Fragment>
      <h1 className='large text-primary'>Recursos</h1>
      <p>
        En esta página habrán recursos para apoyar el proceso de la gestación e
        informar acerca de todos lo relacionado con traer un nuevo ser humano al
        mundo.
      </p>
      <ul>
        {temas.map((tema, index) => (
          <li key={index}>
            <Link to={`/resources/${tema.toLowerCase()}`}>{tema}</Link>
          </li>
        ))}
      </ul>
      <Link className='btn btn-primary' to={'/resources/new'}>
        Agregar Recurso
      </Link>
    </Fragment>
  );
};

export default Resources;
