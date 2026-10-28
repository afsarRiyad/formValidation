

function validateRegistration(req, res, next) {

  const errs = {};
  const nameRegex = /^[A-Za-z ]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const { name, username, pass, email, confirmPass, terms } = req.body;

  const allEmpty =
    !name?.trim() &&
    !username?.trim() &&
    !email?.trim() &&
    !pass?.trim() &&
    !confirmPass?.trim();
  if (allEmpty) {
    errs.allempty = "all fields are empty!";
    return res.send(errs);
  }
  if (name?.trim() == "") {
    errs.name = "name can not be empty!";
  } else if (!nameRegex.test(name?.trim())) {
    errs.name = "Name cannot contain any symbols or numbers";
  }
  if (username?.trim() == "") {
    errs.username = "you must set a username!";
  }
  if (email?.trim() == "") {
    errs.email = "email can not be empty!";
  } else if (!emailRegex.test(email?.trim())) {
    errs.email = "Please enter a valid email address!";
  }
  if (pass?.trim() == "") {
    errs.pass = "password can not be empty!";
  } else if (!passRegex?.test(pass)) {
    errs.pass =
      "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character!";
  }
  if (confirmPass?.trim() == "") {
    errs.confirmPass = "please confirm your password!";
  }
  if (pass?.trim() !== confirmPass?.trim()) {
    errs.confirmPass = "passwords do not match!";
  }
  const hasErrs =
    errs.name ||
    errs.username ||
    errs.email ||
    errs.pass ||
    errs.confirmPass ||
    errs.terms;
  if (terms !== true) {
    errs.terms = "You must accept the terms and conditions!";
  }
  if (hasErrs) {
    return res.send(errs);
  }
  next();
}

export default validateRegistration