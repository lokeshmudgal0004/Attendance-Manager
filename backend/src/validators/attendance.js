import Validator from "validator";
import isEmpty from "is-empty";

function validateAttendanceInput(data) {
  let errors = {};
  data.date = !isEmpty(data.date) ? data.date : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  // Date checks
  if (Validator.isEmpty(data.date)) {
    errors.date = "Date is required";
  } else if (!Validator.isDate(data.date)) {
    errors.date = "Invalid date format";
  }

  // Status checks
  const validStatuses = ["present", "absent"];
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status is required";
  } else if (!validStatuses.includes(data.status.toLowerCase())) {
    errors.status = "Status must be either 'present' or 'absent'";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export { validateAttendanceInput };
