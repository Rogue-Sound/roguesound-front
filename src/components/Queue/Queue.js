import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import PropTypes from 'prop-types';
/** Styled components */
import QueueItem from './QueueItem';
import mockedItems from './mockedQueue.json';
// import { SidebarWrapper } from './sidebar.styled';
import './Queue.scss';

// TODO: Replace key with provided ID
const Queue = () => (
  <div className="queue-container">
    <div className="queue-top">
      <FontAwesomeIcon icon="align-justify" />
      <span>Queue</span>
    </div>
    <div className="queue-list">
      {mockedItems.map(item => (
        <QueueItem key={`queued-song-${item.title}`} {...item} />
      ))}
    </div>
  </div>
);

Queue.propTypes = {};

export default Queue;