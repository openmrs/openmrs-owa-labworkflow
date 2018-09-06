import React from 'react';
import imageLoader from '../../../img/loading.gif';

const Loading = () => {
  return (
    <div>
      <img src={imageLoader} alt="loader" />
    </div>
  )
};

export default Loading;
