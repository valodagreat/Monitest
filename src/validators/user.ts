import Joi from "joi";

class UserValidator {
  static register() {
    return Joi.object({
      firstName: Joi.string().min(5).max(50).required(),
      lastName: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).email().required(),
      password: Joi.string().min(5).max(255).required(),
    });
  }

  static login() {
    return Joi.object({
      email: Joi.string().min(5).max(255).email().required(),
      password: Joi.string().min(5).max(255).required(),
    });
  }
}

export default UserValidator;