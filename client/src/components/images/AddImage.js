import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddImageForm from './AddImageForm';
import { uploadImage } from '../../actions/images';

const AddImage = ({ uploadImage }) => {
  const [fileInputState, setFileInputState] = useState('');
  const [imageData, setImageData] = useState({
    date: '052021VII',
    title: '',
    text: '',
    previewSource: '',
  });

  const handleFileInputChange = e => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageData({ ...imageData, previewSource: reader.result });
    };
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!imageData.previewSource) return;
    console.log('inside the handle submit part');
    uploadImage(imageData);
  };

  const onChange = e =>
    setImageData({ ...imageData, [e.target.name]: e.target.value });

  return (
    <div>
      <h1>Agregar una nueva imagen</h1>
      {imageData.previewSource && (
        <img
          src={imageData.previewSource}
          alt='chosen'
          style={{ height: '300px', width: 'auto' }}
        />
      )}
      <p>Title: {imageData.title}</p>
      <p>Date: {imageData.date}</p>
      <p>Text: {imageData.text}</p>
      <hr />
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleFileInputChange}
          type='file'
          placeholder='Image File'
          name='image'
          className='form-input'
          value={fileInputState}
        />
        <div className='form-group'>
          <label>Título: </label>
          <br />
          <input
            type='text'
            className='form-control'
            name='title'
            value={imageData.title}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <label>¿Cómo te sientes?: </label>
          <br />
          <textarea
            type='text'
            className='form-control'
            rows='16'
            cols='44'
            name='text'
            value={imageData.text}
            onChange={e => onChange(e)}
          />
        </div>
        <input className='form-input' type='submit' value='Submit!' />
      </form>

      <Link to='/images'>Back to Images</Link>
    </div>
  );
};

AddImage.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { uploadImage })(AddImage);
