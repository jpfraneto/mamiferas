import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVideo,
  faImage,
  faWindowMaximize,
  faNewspaper,
  faMusic,
  faBaby,
  faComment,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

const ResourcesItem = ({ resource }) => {
  const [likes, setLikes] = useState(resource.likes.length);
  const [disableBtn, setDisableBtn] = useState(false);
  const addLikeToResource = async id => {
    const res = await axios.get(`/api/resources/resource/${id}/add-like`);
    setLikes(res.data.resource.likes.length);
    setDisableBtn(true);
  };
  const getIcon = mediaType => {
    switch (mediaType) {
      case 'video':
        return faVideo;
      case 'image':
        return faImage;
      case 'webpage':
        return faWindowMaximize;
      case 'article':
        return faNewspaper;
      case 'music':
        return faMusic;
      default:
        return faBaby;
    }
  };
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <p>Agregado por:</p>
        <h4>{resource.addedBy}</h4>
      </div>
      <div>
        <h3>{resource.title}</h3>
        <ReactMarkdown remarkPlugins={[gfm]} children={'string'}>
          {resource.description.length > 111
            ? resource.description.substring(0, 111) + '...'
            : resource.description}
        </ReactMarkdown>

        <Fragment>
          <Link
            to={`/resources/resource/${resource._id}`}
            className='btn btn-success'
          >
            <FontAwesomeIcon icon={getIcon(resource.mediaType)} /> - Ver -{' '}
            <FontAwesomeIcon icon={faComment} /> {resource.comments.length}
          </Link>
          <button
            className='btn btn-primary'
            onClick={() => {
              {
                disableBtn
                  ? alert('Ya mencionaste la utilidad de este recurso una vez!')
                  : addLikeToResource(resource._id);
              }
            }}
          >
            <FontAwesomeIcon icon={faThumbsUp} /> {likes}
          </button>
        </Fragment>
      </div>
    </div>
  );
};

export default ResourcesItem;
