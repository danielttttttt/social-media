/**
 * VALIDATION UTILITIES
 * Backend-friendly validation with clear contracts
 * 
 * All validation functions return:
 * - null if valid
 * - string error message if invalid
 * 
 * Form validators return object with field errors:
 * - {} if no errors
 * - { fieldName: errorMessage } if errors exist
 */

// ============================================================================
// VALIDATION CONSTANTS
// ============================================================================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;

// ============================================================================
// FIELD VALIDATORS
// ============================================================================

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

// ============================================================================
// FORM VALIDATORS (Backend-ready)
// ============================================================================

/**
 * Validates login form data
 * Expected backend fields: { email: string, password: string }
 */
export const validateLoginForm = (formData) => {
  const errors = {};
  
  // Email validation (can be email or username for login)
  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  }
  
  // Password validation
  if (!formData.password?.trim()) {
    errors.password = 'Password is required';
  }
  
  return errors;
};

/**
 * Validates registration form data
 * Expected backend fields: { email: string, password: string, username: string, firstName?: string, lastName?: string }
 */
export const validateRegistrationForm = (formData) => {
  const errors = {};
  
  // Username validation
  const usernameError = validateUsername(formData.username);
  if (usernameError) {
    errors.username = usernameError;
  }
  
  // Email validation
  const emailError = validateEmail(formData.email);
  if (emailError) {
    errors.email = emailError;
  }
  
  // Password validation
  const passwordError = validatePassword(formData.password);
  if (passwordError) {
    errors.password = passwordError;
  }
  
  // Password confirmation validation
  const confirmPasswordError = validatePasswordConfirmation(formData.password, formData.confirmPassword);
  if (confirmPasswordError) {
    errors.confirmPassword = confirmPasswordError;
  }
  
  return errors;
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Checks if an errors object has any errors
 */
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};

/**
 * Formats validation errors for API responses
 */
export const formatValidationErrors = (errors) => {
  return {
    success: false,
    error: 'Validation failed',
    details: errors,
  };
};

/**
 * Validates field requirements for backend consistency
 */
export const validateRequiredFields = (data, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!data[field]?.trim()) {
      errors[field] = `${field} is required`;
    }
  });
  
  return errors;
};
