const addUserBtn = document.querySelector(".nav-link");
const cancelBtn = document.querySelector(".cancel-btn");
const submitBtn = document.querySelector(".submit-btn");
const userForm = document.querySelector(".add-user-form");
const usersContainer = document.querySelector(".container");
const backgroundDiv = document.querySelector(".body-background");
const editIcons = document.querySelectorAll(".text-success");
const formHeader = document.querySelector(".form-header");
const deleteIcons = document.querySelectorAll(".text-danger");
const imageLabel = document.querySelector(".form-label");

deleteIcons.forEach((icon) => {
  icon.onclick = function () {
    const id = icon.id;

    $.ajax({
      type: "GET",
      url: "/" + id,
      async: true,
      success: function (res) {
        showInputForm();
        formHeader.textContent = "Delete User (" + res.name + ")";
        formHeader.style.color = "#FF0000";
        userForm.elements[0].value = res.name;
        userForm.elements[1].value = res.email;
        userForm.elements[2].value = res.phone;
        userForm.elements[3].hidden = true;
        userForm.elements[4].textContent = "Delete";
        imageLabel.textContent = "User Image";
        userForm.elements[4].style.backgroundColor = "#FF0000";
        disableOrEnableInputs(true);

        userForm.elements[3].insertAdjacentHTML(
          "afterend",
          `<div class="old-image" style="text-align:center;margin-top:10px"><img src="./uploads/${res.image}" alt="" width="200" ></div>
          `
        );
        userForm.action = "delete/" + res._id;
        userForm.method = "post";
      },
      error: function () {
        alert(error.message);
      },
    });
  };
});

// for enabling inputs when flage is false and vice versa
function disableOrEnableInputs(flage) {
  for (let i = 0; i < userForm.elements.length; i++) {
    if (i > 3) break;
    userForm.elements[i].disabled = flage;
  }
}

// adding request actions for editing icons to get users data
editIcons.forEach((icon) => {
  icon.onclick = function () {
    // first i should send request to get the user data
    const id = icon.id;
    $.ajax({
      type: "GET",
      url: "/" + id,
      async: true,
      success: function (res) {
        showInputForm();
        formHeader.textContent = "Update User (" + res.name + ")";
        userForm.elements[0].value = res.name;
        userForm.elements[1].value = res.email;
        userForm.elements[2].value = res.phone;
        userForm.elements[3].required = false;
        userForm.elements[4].textContent = "Update";
        userForm.elements[3].insertAdjacentHTML(
          "afterend",
          `<div class="old-image" style="text-align:center;margin-top:10px"><img src="./uploads/${res.image}" alt="" width="200" ></div>
          `
        );
        // to get old image name to remove it from the server if he uploaded a new one
        userForm.elements[4].insertAdjacentHTML(
          "afterend",
          `  <input type="hidden" id="old-image" name="old_image" value="${res.image}">`
        );
        userForm.action = "update/" + res._id;
        userForm.method = "post";
      },
      error: function (error) {
        alert(error.message);
      },
    });
  };
});

// openning the form for adding
addUserBtn.onclick = function () {
  showInputForm();
  backgroundDiv.disabled = true;
  addUserBtn.disabled = true;
};

// function which responsible for showing the form
function showInputForm() {
  formHeader.textContent = "Add User";
  userForm.classList.toggle("hidden");
  userForm.classList.toggle("show");
  backgroundDiv.classList.add("blur");
}

// hidding the form and returning it's initial styles
function hideInputForm() {
  addUserBtn.disabled = false;
  userForm.classList.toggle("show");
  userForm.classList.toggle("hidden");
  backgroundDiv.classList.toggle("blur");
  userForm.action = "add";
  formHeader.style.color = "#4CAF50";
  userForm.elements[4].style.backgroundColor = "#4CAF50";
  userForm.method = "post";
  userForm.elements[0].value = "";
  userForm.elements[1].value = "";
  userForm.elements[2].value = "";
  userForm.elements[3].required = true;
  userForm.elements[4].textContent = "Add User";
  userForm.elements[3].hidden = false;
  imageLabel.textContent = "Select Image";
  // the photo that's appeared on the form
  document.querySelector(".old-image")?.remove();
  // this is the hidden input
  document.getElementById("old-image")?.remove();
}

cancelBtn.onclick = function () {
  hideInputForm();
  disableOrEnableInputs(false);
};

