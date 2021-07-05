import React, { useState } from 'react';

const AddImageForm = ({ imageData, setImageData }) => {
  const onChange = e =>
    setImageData({ ...imageData, [e.target.name]: e.target.value });

  const onSubmitFunc = e => {
    e.preventDefault();
    console.log('inside here', imageData);
  };

  return (
    <div>
      <hr />
      <p>Here is where the AddImageForm starts</p>
      <form onSubmit={onSubmitFunc}></form>
    </div>
  );
};

export default AddImageForm;
