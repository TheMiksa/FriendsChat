
export const loginValidator = (login: string) => {
  const result = {
    isValid: true,
    errorMessage: '',
    login,
  };
  if (login.length < 3) {
    result.isValid = false;
    result.errorMessage = 'Login should contain at least 3 characters';
  } else if (login.match(/\s+/)?.[0]) {
    result.isValid = false;
    result.errorMessage = 'Login cannot contain spaces';
  } else if (!login.match(/^[a-z0-9]+$/i)?.[0]) {
    result.isValid = false;
    result.errorMessage = 'Login can contain only numbers or letters of the English alphabet';
  }

  return result;
};

export const passwordValidator = (password: string, isNew: boolean = false) => {
  const result = {
    isValid: true,
    errorMessage: '',
    password,
  };

  if (password.length < 5) {
    result.isValid = false;
    result.errorMessage = 'Password should contain at least 5 characters';
  } else if (password.match(/\s+/)?.[0]) {
    result.isValid = false;
    result.errorMessage = 'password cannot contain spaces';
  } else if (!password.match(/^[a-z0-9!@#$%^&8*()_+=-]+$/i)?.[0]) {
    result.isValid = false;
    result.errorMessage = 'Password can contain only numbers, letters of the English alphabet and symbols !@#$%^&8*()_+=-';
  } else if (isNew
    && !password.match(/[!@#$%^&8*()_+=-]/) 
    || !password.match(/[0-9]/)
    || !password.match(/[a-z]/)
    || !password.match(/[A-Z]/)
    ) {
      result.isValid = false;
      result.errorMessage = 'Password should contain at least one digit, lower letter, capitalized letter and symbol';  
  }

  return result;
};