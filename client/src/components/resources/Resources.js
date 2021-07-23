import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import axios from 'axios';

const temas = [
  'Embarazo',
  'Parto',
  'Puerperio',
  'Lactancia',
  'Crianza',
  'Relaciones',
];

const Resources = () => {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState({});
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Recursos</h1>
          <p>
            En esta página habrán recursos para apoyar el proceso de la
            gestación e informar acerca de todos lo relacionado con traer un
            nuevo ser humano al mundo.
          </p>
          <ul className='resources-list'>
            <li className='resource-item'>
              <Link to={`/resources/embarazo`}>
                <img src='https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/pregnant_woman_2_other/1800x1200_pregnant_woman_2_other.jpg?resize=750px:*' />
                Embarazo
              </Link>
            </li>
            <li className='resource-item'>
              <Link to={`/resources/parto`}>
                <img src='https://i.guim.co.uk/img/media/9ae1c0e2bf89d118d3d8d5e57bcbfd38f9d0d1a6/0_23_1475_885/master/1475.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=a445228df629d878428b72a0afdfa702' />
                Parto
              </Link>
            </li>
            <li className='resource-item'>
              <Link to={`/resources/puerperio`}>
                <img src='https://static.tuasaude.com/media/article/cq/pu/puerperio_27514_l.jpg' />
                Puerperio
              </Link>
            </li>
            <li className='resource-item'>
              <Link to={`/resources/lactancia`}>
                <img src='https://www.bbmundo.com/wp-content/uploads/2014/09/Dieta-de-la-mama-que-amamanta.jpg' />
                Lactancia
              </Link>
            </li>
            <li className='resource-item'>
              <Link to={`/resources/crianza`}>
                <img src='https://www.centropromethea.com/wp-content/uploads/2020/12/crianza-consciente-1080x675.jpg' />
                Crianza
              </Link>
            </li>
            <li className='resource-item'>
              <Link to={`/resources/relaciones`}>
                <img src='https://luciasecasa.com/contents/uploads/2018/05/10-cosas-que-no-debes-tolerar-en-tu-relacion-de-pareja-4.jpg' />
                Relaciones
              </Link>
            </li>
          </ul>
          <Link className='btn btn-primary' to={'/resources/new'}>
            Agregar Nuevo
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Resources;
