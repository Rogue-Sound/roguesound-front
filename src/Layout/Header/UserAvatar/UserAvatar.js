import React from 'react';
import PropTypes from 'prop-types';
/** Images */
import DefaultAvatar from '@assets/img/default-avatar.jpg';
/** Styled components */
import {
  UserAvatarWrapper,
  UserAvatarImage,
  UserName,
} from './UserAvatar.styled';

const UserAvatar = ({ displayName, avatarUrl }) => (
  <UserAvatarWrapper>
    {displayName && (
      <>
        <UserName>{displayName}</UserName>
        <UserAvatarImage alt="user_avatar" src={avatarUrl || DefaultAvatar} />
      </>
    )}
  </UserAvatarWrapper>
);

UserAvatar.propTypes = {
  displayName: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

export default UserAvatar;
