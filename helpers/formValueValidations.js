function isEmailValid(fieldId) {
  let email = document.getElementById(fieldId)?.value.trim();
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailPattern.test(email);
  if (!isValid) console.log({ emailFieldId: fieldId, message: "Email格式無效" });
  return isValid;
}

function isPhoneValid(fieldId) {
  let phone = document.getElementById(fieldId)?.value.trim();
  let phonePattern = /^[0-9]{8,15}$/;
  const isValid = phonePattern.test(phone);
  if (!isValid) console.log({ phoneFieldId: fieldId, message: "電話格式無效" });
  return isValid;
}
