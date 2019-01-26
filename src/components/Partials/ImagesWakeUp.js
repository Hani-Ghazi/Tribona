import React from 'react';

const ImagesWakeUp = () => (
  <div className={'loading-wrapper fadein'}>
    <h4>Heroku is spinning up, one moment please...</h4>
    <div className={'loading'}>
      <div className={'background'}>
        <i className="icon-heroku"/>
      </div>
      <div className={'spinner'} />
    </div>
  </div>
);

export default ImagesWakeUp