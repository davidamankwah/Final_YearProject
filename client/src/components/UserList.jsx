// components/UserList.jsx
import React from 'react';

const UserList = ({ followers = [], onUserClick }) => {
  return (
    <div>
      <h2>Followers</h2>
      {followers.length > 0 ? (
        <ul>
          {followers.map((follower) => (
            <li key={follower._id} onClick={() => onUserClick(follower)}>
              <img src={follower.picturePath} alt={follower.userName} />
              {follower.userName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No followers available</p>
      )}
    </div>
  );
};

export default UserList;
