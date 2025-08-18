// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation rules
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

// Username validation rules
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }
  
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return null;
};

/**
 * Validates a password
 * @param {string} password - The password to validate
 * @param {boolean} requireStrong - Whether to require strong password rules
 * @returns {string|null} - Error message or null if valid
 */
export const validatePassword = (password, requireStrong = true) => {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`;
  }
  
  if (requireStrong && !PASSWORD_REGEX.test(password)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  }
  
  return null;
};

/**
 * Validates password confirmation
 * @param {string} password - The original password
 * @param {string} confirmPassword - The confirmation password
 * @returns {string|null} - Error message or null if valid
 */
export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return null;
};

/**
 * Validates a username
 * @param {string} username - The username to validate
 * @returns {string|null} - Error message or null if valid
 */
export const validateUsername = (username) => {
  if (!username) {
    return 'Username is required';
  }
  
  if (username.length < USERNAME_MIN_LENGTH) {
    return `Username must be at least ${USERNAME_MIN_LENGTH} characters long`;
  }
  
  if (username.length > USERNAME_MAX_LENGTH) {
    return `Username must be no more than ${USERNAME_MAX_LENGTH} characters long`;
  }
  
  if (!USERNAME_REGEX.test(username)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  
  return null;
};

/**
 * Validates a required field
 * @param {string} value - The value to validate
 * @param {string} fieldName - The name of the field for error messages
 * @returns {string|null} - Error message or null if valid
 */
export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  
  return null;
};

/**
 * Validates login form data
 * @param {Object} formData - The form data to validate
 * @param {string} formData.email - The email/username
 * @param {string} formData.password - The password
 * @returns {Object} - Object with field errors
 */
export const validateLoginForm = (formData) => {
  const errors = {};
  
  // Validate email (can be email or username for login)
  if (!formData.email) {
    errors.email = 'Email or username is required';
  }
  
  // Validate password
  const passwordError = validateRequired(formData.password, 'Password');
  if (passwordError) {
    errors.password = passwordError;
  }
  
  return errors;
};

/**
 * Validates signup form data
 * @param {Object} formData - The form data to validate
 * @param {string} formData.username - The username
 * @param {string} formData.email - The email
 * @param {string} formData.password - The password
 * @param {string} formData.confirmPassword - The password confirmation
 * @returns {Object} - Object with field errors
 */
export const validateSignupForm = (formData) => {
  const errors = {};
  
  // Validate username
  const usernameError = validateUsername(formData.username);
  if (usernameError) {
    errors.username = usernameError;
  }
  
  // Validate email
  const emailError = validateEmail(formData.email);
  if (emailError) {
    errors.email = emailError;
  }
  
  // Validate password
  const passwordError = validatePassword(formData.password);
  if (passwordError) {
    errors.password = passwordError;
  }
  
  // Validate password confirmation
  const confirmPasswordError = validatePasswordConfirmation(formData.password, formData.confirmPassword);
  if (confirmPasswordError) {
    errors.confirmPassword = confirmPasswordError;
  }
  
  return errors;
};

/**
 * Checks if an errors object has any errors
 * @param {Object} errors - The errors object
 * @returns {boolean} - True if there are errors, false otherwise
 */
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};
