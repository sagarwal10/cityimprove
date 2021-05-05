const Validator = require("validator"); 
const isEmpty = require("is-empty"); 

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Convert empty fields to empty strings
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

