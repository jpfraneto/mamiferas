import React, { Fragment, useEffect, useState } from 'react';
import ResourcesItem from './ResourcesItem';
import PropTypes from 'prop-types';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import axios from 'axios';
import { connect } from 'react-redux';

import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const ShowResource2 = ({ auth: { user, isAuthenticated }, props, match }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [youtubeId, setYoutubeId] = useState('');
  const [resource, setResource] = useState({});
  const [toggleComment, setToggleComment] = useState(true);
  useEffect(() => {
    const getResourceById = async () => {
      const res = await axios.get(`/api/resources/resource/${match.params.id}`);
      setResource(res.data);
      if (res.data.mediaType === 'video') {
        var video_id = res.data.url.split('v=')[1];
        var ampersandPosition = video_id.indexOf('&');
        if (ampersandPosition !== -1) {
          video_id = video_id.substring(0, ampersandPosition);
        }
        setYoutubeId(video_id);
      }
      setLoading(false);
    };
    getResourceById();
  }, []);
  const handleGoBack = () => {
    if (history.location.state) {
      history.push(history.location.state.returnTo);
    } else {
      history.goBack();
    }
  };
  const getMediaType = mediaType => {
    switch (mediaType) {
      case 'image':
        return 'imagen';
      case 'webpage':
        return 'página web';
      case 'article':
        return 'artículo';
      case 'music':
        return 'música';
    }
  };
  const addComment = async data => {
    setLoading(true);
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const body = JSON.stringify(data);
    const res = await axios.post(
      `/api/resources/resource/${resource._id}/add-comment`,
      body,
      config
    );
    setResource(res.data);
    setLoading(false);
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <button onClick={handleGoBack} className='btn btn-light'>
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
              {resource.mediaType === 'video' && (
                <div className='video-responsive'>
                  <iframe
                    width='853'
                    height='480'
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                    title='Embedded youtube'
                  />
                </div>
              )}

              <h1>{resource.title}</h1>
              <ReactMarkdown
                remarkPlugins={[gfm]}
                children={'string'}
                className='text-body'
              >
                {resource.description}
              </ReactMarkdown>
              {resource.mediaType !== 'video' && (
                <Link
                  className='btn btn-success'
                  to={{
                    pathname: resource.url,
                  }}
                  target='_blank'
                >
                  Ir al {getMediaType(resource.mediaType)}
                </Link>
              )}
            </div>
          </div>
          {resource.comments.length > 0 && (
            <h1 className='text-primary'>Comentarios:</h1>
          )}
          <div className='comments'>
            {resource.comments.map(comment => (
              <CommentItem
                key={comment._id}
                comment={comment}
                setLoading={setLoading}
                setResource={setResource}
                resourceId={resource._id}
              />
            ))}
          </div>
          {toggleComment && (
            <CommentForm
              resourceId={resource._id}
              username={user ? user.username : ''}
              setLoading2={setLoading2}
              addComment={addComment}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

ShowResource2.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ShowResource2);
