import Joi from "joi";


export const createUserValidator = Joi.object().keys({
  fullName: Joi.string().trim().required(),
  username: Joi.string().trim().required(),
  password: Joi.string().required().min(4),
  confirmPassword: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').messages({ 'any.only': '{{#label}} does not match' }),
}).with('password', 'confirmPassword');
export const options = {
    abortEarly:
      false,
    errors: {
      wrap: { label: "" },
    },
  };

