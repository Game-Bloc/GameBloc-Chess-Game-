import React, { useState } from 'react';
import './popupInfo.css'; 

const UsernamePopup = () => {

    // for the input

    

    // for the input
  const [username, setUsername] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (username) {
//       onSubmit(username); // Pass username back to parent component
//     }
//   };

  return (
    <div className="overlay">
      <div className="popup">
        <h2>Pick a username</h2>
        <p>Please select a username</p>
        <form onSubmit={handleSubmits}>
          <label>
            Username*
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </label>
          <button type="submit" className="submit-button">CONTINUE</button>
        </form>
      </div>
    </div>
  );
};

const PopupInfo = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [username, setUsername] = useState('');

  const handleUsernameSubmit = (username) => {
    setUsername(username);
    setIsPopupOpen(false); // Close the popup after submission
  };

  return (
    <div>
      {isPopupOpen && <UsernamePopup onSubmit={handleUsernameSubmit} />}
      <h1>Welcome, {username || 'User'}!</h1>
      {/* Your existing app components go here */}
    </div>
  );
};

export default PopupInfo;
