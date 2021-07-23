import React, { Fragment, useEffect, useState } from 'react';
import ResourcesItem from './ResourcesItem';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

const ShowResource2 = ({ props, match }) => {
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
          <button
            onClick={() => {
              history.goBack();
            }}
            className='btn btn-light'
          >
            Volver
          </button>
          <div className='post bg-white p-1 my-1'>
            <div>
              <Fragment>
                <h4>{resource.addedBy}</h4>
                <small>Invitad@</small>
              </Fragment>
            </div>
            <div>
              <iframe
                width='560'
                height='315'
                src='https://www.youtube.com/embed/eJ00TUCgJZE'
                title='YouTube video player'
                frameborder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowfullscreen
              ></iframe>
              <h1>{resource.title}</h1>
              <ReactMarkdown
                remarkPlugins={[gfm]}
                children={'string'}
                className='text-body'
              >
                {resource.description}
              </ReactMarkdown>

              <Fragment>
                <Link to={{ pathname: resource.url }} target='_blank'>
                  {resource.url}
                </Link>
              </Fragment>
            </div>
          </div>
          {/* {resource.comments.length > 0 && (
            <h1 className='text-primary'>Comentarios:</h1>
          )}
          <div className='comments'>
            {resource.comments.map(comment => (
              <CommentItem
                key={comment._id}
                comment={comment}
                resourceId={resource._id}
              />
            ))}
          </div>
          {toggleComment && (
            <CommentForm
              resourceId={resource._id}
              username={user ? user.username : ''}
              setLoading2={setLoading2}
            />
          )} */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ShowResource2;
