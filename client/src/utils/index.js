const emailRe = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const validateEmails = (email = '') => {
  if (emailRe.test(email.trim())) {
    return;
  }
  return 'Email is invalid';
};
