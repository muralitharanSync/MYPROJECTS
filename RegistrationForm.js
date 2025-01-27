import React, { useState } from 'react';
import './RegistrationForm.css'; // Import the CSS file

const RegistrationForm = () => {
  // Define state for form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Define state for error messages
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form data
  const validateForm = () => {
    let valid = true;
    let errorMessages = { ...errors };

    if (!formData.username) {
      errorMessages.username = 'Username is required';
      valid = false;
    } else {
      errorMessages.username = '';
    }

    if (!formData.email) {
      errorMessages.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errorMessages.email = 'Email is invalid';
      valid = false;
    } else {
      errorMessages.email = '';
    }

    if (!formData.password) {
      errorMessages.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      errorMessages.password = 'Password must be at least 6 characters';
      valid = false;
    } else {
      errorMessages.password = '';
    }

    if (!formData.confirmPassword) {
      errorMessages.confirmPassword = 'Confirm Password is required';
      valid = false;
    } else if (formData.confirmPassword !== formData.password) {
      errorMessages.confirmPassword = 'Passwords do not match';
      valid = false;
    } else {
      errorMessages.confirmPassword = '';
    }

    setErrors(errorMessages);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {  // Marked the function as `async`
    e.preventDefault();
    if (validateForm()) {
      // Simulating API call to register user
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirm_Password: formData.confirmPassword,
      };
      console.log("User Data: ", userData);

      try {
        const response = await fetch('http://127.0.0.1:8000/api/signup/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();
        console.log(response)
        if (response.ok) {
          alert('Registration successful!');
          // Redirect to login or dashboard after successful registration
          // e.g., history.push('/login');
        } else {
          alert('Registration failed: ' + data.message);
        }
      } catch (error) {
        console.error('Error during registration:', error);
        alert('There was an error registering the user.');
      }
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        {/* Email Field */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Password Field */}
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
