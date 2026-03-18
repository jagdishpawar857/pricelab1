
export const loginLocators = {
  // prefer data-cy but fall back to existing ids/values if present
  emailInput: '[data-cy="email"],#user_email,input[name="email"]',
  passwordInput: '[data-cy="password"],#password-field,input[type="password"]',
  loginButton: '[data-cy="login-button"],button:contains("Sign in"),[value="Sign in"]'
}
