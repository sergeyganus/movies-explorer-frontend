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
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isValid, setIsValid] = React.useState(false);

  const checkName = (name) => {
    return nameRegExp.test(name);
  };

  const checkEmail = (email) => {
    return emailRegExp.test(email);
  };

  const handleChange = (e) => {
    const target = e.target;
    const { name, value } = target;
    let validationMessage = target.validationMessage;
    let currentIsValid = true;

    if (!validationMessage) {
      switch (name) {
        case 'name':
          if (!checkName(value)) {
            validationMessage = 'Используйте латиницу, кириллицу, затем пробел или дефис';
            currentIsValid = false;
            setIsNameValid(false);
          } else {
            setIsNameValid(true);
          }
          break;
        case 'email':
          if (!checkEmail(value)) {
            validationMessage = 'Некорректный email';
            currentIsValid = false;
            setIsEmailValid(false);
          } else {
            setIsEmailValid(true);
          }
          break;
        default:
          validationMessage = target.validationMessage;
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsValid(target.closest("form").checkValidity() && currentIsValid);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsNameValid = false, newIsEmailValid = false, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsNameValid(newIsNameValid);
      setIsEmailValid(newIsEmailValid);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, setValues, errors, isNameValid, isEmailValid, isValid, resetForm };
}