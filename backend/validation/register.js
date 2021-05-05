const Validator = require("validator"); 
const isEmpty = require("is-empty"); 

module.exports = function validateRegisterInput(data) {
  let errors = {};


  // Convert empty fields to empty strings
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.zipcode = !isEmpty(data.zipcode) ? data.zipcode : ""; 

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  } 

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password Field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max:30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.zipcode)) {
    errors.zipcode = "Zipcode is needed";
  }
  if (!Validator.isPostalCode(data.zipcode, 'US')) {
    errors.zipcode = "Zipcode is not valid";
  } 

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

