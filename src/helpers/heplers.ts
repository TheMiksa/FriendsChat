
export const loginValidator = (login: string) => {
  const result = {
    isValid: true,
    errorMessage: '',
    login,
  };
  if (login.length < 3) {
    result.isValid = false;
    result.errorMessage = 'Login should contain at least 3 characters';
  } else if (!login.match(/^[a-z0-9]+$/i)?.[0]) {
    result.isValid = false;
    result.errorMessage = 'Login can contain only numbers or letters of the English alphabet';
  }

  return result;
};