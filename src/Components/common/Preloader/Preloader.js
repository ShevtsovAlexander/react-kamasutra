import React from 'react';
import preloader from '../../../Asserts/images/Preloader.gif';
let Preloader = (props) => {
  return (
    <div>
      <img src={preloader} />
    </div>
  );
};

export default Preloader;