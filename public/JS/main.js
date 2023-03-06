const addUserBtn = document.querySelector(".nav-link");
const cancelBtn = document.querySelector(".cancel-btn");
const submitBtn = document.querySelector(".submit-btn");
const userForm = document.querySelector(".add-user-form");
const usersContainer = document.querySelector(".container");
const backgroundDiv = document.querySelector(".body-background");
const editIcons = document.querySelectorAll(".text-success");
const formHeader = document.querySelector(".form-header");
editIcons.forEach((icon) => {
  icon.onclick = function () {
    // first i should send request to get the user data
    console.log(icon.id);
    const id = icon.id;
    $.ajax({
      type: "GET",
      url: "/update/" + id,
      data: "dsf",
      async: true,
      success: function (res) {
        console.log(res);
      },
    });

    // showInputForm();
    // formHeader.textContent = "Update User";
    // console.log(userForm.elements[4]);
    // console.log(userForm.elements);
    // userForm.action = "update/";
    // console.log(userForm);
  };
});
const navbar = document.querySelector(".navbar");
addUserBtn.onclick = function () {
  showInputForm();
};

function showInputForm() {
  userForm.classList.toggle("hidden");
  userForm.classList.toggle("show");
  backgroundDiv.classList.add("blur");
}

cancelBtn.onclick = function () {
  userForm.classList.toggle("show");
  userForm.classList.toggle("hidden");
  backgroundDiv.classList.toggle("blur");
};
