import Validator from "validator";
import isEmpty from "is-empty";

const validateRegisterInput = (data) => {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.fullName = !isEmpty(data.fullName) ? data.fullName : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "username field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  // Name checks
  if (Validator.isEmpty(data.fullName)) {
    errors.fullName = "Your Name field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export { validateRegisterInput };
