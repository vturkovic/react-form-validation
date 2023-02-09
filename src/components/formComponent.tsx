import React, { useState } from 'react';
import { FormInterface } from '../interfaces';

const FormComponent = () => {

  const initalFormState: FormInterface = {
    name: '',
    surname: '',
    dateOfBirth: '',
    email: '',
  };

  const [formData, setFormData] = useState<FormInterface>(initalFormState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!formData.name) {
      newErrors.name = 'Required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Too Short!';
    }

    if (!formData.surname) {
      newErrors.surname = 'Required';
    } else if (formData.surname.length < 3) {
      newErrors.surname = 'Too Short!';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Required';
    }

    if (!formData.email) {
      newErrors.email = 'Required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert(JSON.stringify(formData, null, 2));
    setFormData(initalFormState);
    setErrors({});
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  
    validateField(name, value);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
  };

  const validateField = (fieldName: string, value: string) => {
    let errorMessage = "";
  
    switch (fieldName) {
      case "name":
        errorMessage =
          value.length < 3 ? "Too short": "";
        break;
      case "surname":
        errorMessage =
          value.length < 3 ? "Too short!": "";
        break;
      case "dateOfBirth":
        errorMessage = value === "" ? "Required" : "";
        break;
      case "email":
        errorMessage = value === "" ? "Required" : "";
        if (!validateEmail(value)) {
          errorMessage = "Invalid email";
        }
        break;
      default:
        break;
    }
  
    setErrors((prevState) => ({
      ...prevState,
      [fieldName]: errorMessage,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Form</h2>
      <div>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'danger': ''} />
        {errors.name && (<div className='error-message'>{errors.name}</div>)}
      </div>
      <div>
        <input
          type="text"
          id="surname"
          name="surname"
          placeholder="Surname"
          value={formData.surname}
          onChange={handleChange}
          className={errors.surname ? 'danger': ''} />
           {errors.surname && (<div className='error-message'>{errors.surname}</div>)}
        </div>
        <div>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={errors.dateOfBirth ? 'danger': ''} />
          {errors.dateOfBirth && (<div className='error-message'>{errors.dateOfBirth}</div>)}
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className={errors.email ? 'danger': ''} />
          {errors.email && (<div className='error-message'>{errors.email}</div>)}
        </div>
        <button type="submit" disabled={Object.values(formData).some(x => !x) || Object.values(errors).some(x => x)}>
          Submit
        </button>
      </form>
    );
  };
  
export default FormComponent;