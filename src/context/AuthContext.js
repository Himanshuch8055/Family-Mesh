"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { notify } = useNotification();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('familyflow_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('familyflow_user');
      }
    }
    setLoading(false);
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return {
      isValid: password.length >= 8 &&
               /[A-Z]/.test(password) &&
               /[0-9]/.test(password) &&
               /[!@#$%^&*]/.test(password),
      errors: [
        password.length < 8 && 'Password must be at least 8 characters',
        !/[A-Z]/.test(password) && 'Password must contain an uppercase letter',
        !/[0-9]/.test(password) && 'Password must contain a number',
        !/[!@#$%^&*]/.test(password) && 'Password must contain a special character'
      ].filter(Boolean)
    };
  };

  const login = async (email, password) => {
    try {
      setLoading(true);

      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }

      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful login
      const userData = {
        id: '1',
        email,
        name: email.split('@')[0],
        avatar: null,
        preferences: {
          theme: 'light',
          notifications: true
        }
      };
      
      setUser(userData);
      localStorage.setItem('familyflow_user', JSON.stringify(userData));
      notify('Welcome back!', 'success');
      return true;
    } catch (error) {
      notify(error.message || 'Failed to login. Please check your credentials.', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, name) => {
    try {
      setLoading(true);

      if (!validateEmail(email)) {
        throw new Error('Invalid email format');
      }

      const { isValid, errors } = validatePassword(password);
      if (!isValid) {
        throw new Error(errors[0]);
      }

      if (!name || name.trim().length < 2) {
        throw new Error('Name is required and must be at least 2 characters');
      }

      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful signup
      const userData = {
        id: '1',
        email,
        name,
        avatar: null,
        preferences: {
          theme: 'light',
          notifications: true
        }
      };
      
      setUser(userData);
      localStorage.setItem('familyflow_user', JSON.stringify(userData));
      notify('Account created successfully! Welcome to Family Flow.', 'success');
      return true;
    } catch (error) {
      notify(error.message || 'Failed to create account. Please try again.', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('familyflow_user');
    notify('You have been logged out successfully.', 'success');
  };

  const updateProfile = async (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('familyflow_user', JSON.stringify(updatedUser));
      notify('Profile updated successfully!', 'success');
      return true;
    } catch (error) {
      notify('Failed to update profile. Please try again.', 'error');
      return false;
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    validatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
