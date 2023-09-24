import React, { useCallback } from 'react';
const emailRegExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const nameRegExp = /^[а-яa-zё]+[а-яa-zё\-\s]*$/iu;

export function useFormWithValidation() {
  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const checkEmail = (email) => {
    return emailRegExp.test(email);
  };

  const checkName = (name) => {
    return nameRegExp.test(name);
  };

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    let validationMessage = target.validationMessage;
    let customIsValid = true;

    if (!validationMessage) {
      switch (name) {
        case 'email':
          if (!checkEmail(value)) {
            validationMessage = 'Некорректный email';
            customIsValid = false;
          }
          break;
        case 'name':
          if (!checkName(value)) {
            validationMessage = 'Используйте латиницу, кириллицу, затем пробел или дефис';
            customIsValid = false;
          }
          break;
        default:
          validationMessage = target.validationMessage;
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsValid(target.closest("form").checkValidity() && customIsValid);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, setValues, errors, isValid, resetForm };
}