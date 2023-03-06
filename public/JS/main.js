const addUserBtn = document.querySelector(".nav-link");
const cancelBtn = document.querySelector(".cancel-btn");
const submitBtn = document.querySelector(".submit-btn");
const addUserForm = document.querySelector(".add-user-form");
const usersContainer = document.querySelector(".container");
const backgroundDiv = document.querySelector(".body-background");
console.log(cancelBtn, submitBtn);
const navbar = document.querySelector(".navbar");
addUserBtn.onclick = function () {
  addUserForm.classList.toggle("hidden");
  addUserForm.classList.toggle("show");
  backgroundDiv.classList.add("blur");
};

cancelBtn.onclick = function () {
  addUserForm.classList.toggle("show");
  addUserForm.classList.toggle("hidden");
  backgroundDiv.classList.toggle("blur");
};
