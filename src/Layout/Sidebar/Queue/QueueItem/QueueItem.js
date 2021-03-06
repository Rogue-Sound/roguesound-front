import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const QueueItem = ({
  albumName,
  albumImg,
  title,
  artist,
  user,
  publicId,
  current,
}) => {
  const divClass = publicId === current ? 'queue-item active' : 'queue-item';
  return (
    <div className={divClass}>
      <img src={albumImg} alt={albumName} />
      <div className="queue-item__details">
        <h4>{title}</h4>
        <h5>{artist}</h5>
        <span>
          <FontAwesomeIcon icon="headphones" />
          {user}
        </span>
      </div>
    </div>
  );
};

QueueItem.propTypes = {
  // className: PropTypes.string,
  albumName: PropTypes.string,
  albumImg: PropTypes.string,
  title: PropTypes.string,
  artist: PropTypes.string,
  user: PropTypes.string,
  publicId: PropTypes.string,
  current: PropTypes.string,
};

export default QueueItem;
