// src/forms/schema.ts
import * as yup from 'yup';

export const formSchema = yup.object({
  fullName: yup.string().required('Full name is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .min(10, 'Age must be at least 10')
    .max(120, 'Age seems invalid')
    .required('Age is required'),
  height: yup
    .number()
    .typeError('Height must be a number')
    .required('Height is required'),
  weight: yup
    .number()
    .typeError('Weight must be a number')
    .required('Weight is required'),
  phone: yup
    .string()
    .required('Phone Number is required')
    .matches(/^\+?[1-9]\d{9,14}$/, 'Enter a valid phone number'),
  gender: yup.string().required('Please select gender'),
  activityLevel: yup.string().required('Please select activity level'),
});
