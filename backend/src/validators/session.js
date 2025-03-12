import Validator from "validator";
import isEmpty from "is-empty";

function validateSessionInput(data) {
  let errors = {};

  data.semester = !isEmpty(data.semester) ? data.semester : "";
  data.startDate = !isEmpty(data.startDate) ? data.startDate : "";
  data.endDate = !isEmpty(data.endDate) ? data.endDate : "";
  data.courses = !isEmpty(data.courses) ? data.courses : [];

  // Semester field check
  if (Validator.isEmpty(data.semester)) {
    errors.semester = "Semester field is required";
  }

  // Start date check
  if (Validator.isEmpty(data.startDate)) {
    errors.startDate = "Start date is required";
  } else if (!Validator.isDate(data.startDate)) {
    errors.startDate = "Start date must be a valid date";
  }

  // End date check
  if (Validator.isEmpty(data.endDate)) {
    errors.endDate = "End date is required";
  } else if (!Validator.isDate(data.endDate)) {
    errors.endDate = "End date must be a valid date";
  }

  // Courses field check (must be a non-empty array)
  if (!Array.isArray(data.courses) || data.courses.length === 0) {
    errors.courses = "Courses field must be a non-empty array";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export { validateSessionInput };
