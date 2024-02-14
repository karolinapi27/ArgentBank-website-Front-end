// src/components/EditProfileForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfile, fetchUserProfile } from '../services/authService';

const EditProfileForm = ({ profile, onCancel }) => {
    
    const [userName, setUserName] = useState(profile?.userName || '');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        await dispatch(updateUserProfile({ userName })).unwrap();
        dispatch(fetchUserProfile());
        setShowConfirmation(true); 
        setTimeout(() => {
          onCancel(); 
          setShowConfirmation(false); 
        }, 1500); 
      } catch (error) {
      }
    };
    
    return (
        <div className="sign-in-content edit-form">
          <h1>Edit user info</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper-edit">
              <label htmlFor="userName">User name:</label>
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="input-wrapper-edit">
              <label htmlFor="firstName">First name:</label>
              <input
                id="firstName"
                type="text"
                value={profile?.firstName}
                disabled
                style={{ backgroundColor: '#f0f0f0' }} 
              />
            </div>
            <div className="input-wrapper-edit">
              <label htmlFor="lastName">Last name:</label>
              <input
                id="lastName"
                type="text"
                value={profile?.lastName}
                disabled
                style={{ backgroundColor: '#f0f0f0' }} 
              />
            </div>
            <div className='gap'>
              <button className='edit-button edit-form-button' type="submit">Save</button>
              <button className='edit-button edit-form-button' type="button" onClick={onCancel}>Cancel</button>
            </div>
            {
              showConfirmation && (
                <div className="confirmation-message">
                  Username updated successfully!
                </div>
              )
            }
          </form>
        </div>
      );
      
};

export default EditProfileForm;
