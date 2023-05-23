import * as React from 'react';
import preloader from '../../../Asserts/images/Preloader.gif';
let Preloader: React.FC = () => {
  return (
    <div>
      <img alt="preloader" src={preloader} />
    </div>
  );
};

export default Preloader;
