import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadImage } from '../../actions/images';

const AddImage = ({ uploadImage }) => {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  // const onChange = e => {
  //   setImage({ ...image, [e.target.name]: e.target.value });
  //   e.target = '';
  // };

  const handleFileInputChange = e => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = e => {
    e.preventDefault();
    if (!previewSource) return;
    const reader = new FileReader();
    uploadImage(previewSource);
  };

  return (
    <div>
      <h1>Este es el lugar para seleccionar imágenes y agregarlas a la DB</h1>
      <form onSubmit={handleSubmitFile}>
        <input
          onChange={handleFileInputChange}
          type='file'
          placeholder='Image File'
          name='image'
          className='form-input'
          value={fileInputState}
        />
        <input className='form-input' type='submit' value='Submit!' />
      </form>
      {previewSource && (
        <img
          src={previewSource}
          alt='chosen'
          style={{ height: '300px', width: 'auto' }}
        />
      )}
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
