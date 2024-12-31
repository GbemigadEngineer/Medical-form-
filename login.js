"use strict";
// staff database (Nothing serious for now, to add more staffs we have to add them manually in our code here.)
const staffDatabase = {
  staff001: "password123",
  staff002: "ypasscode1",
  staff003: "admin1123",
};

document.querySelector("#login-btn").addEventListener("click", function () {
  // Get the values inputed by the user and store them in variables
  const staffID = document.querySelector("#staff-id").value;
  const password = document.querySelector("#password").value;
  const message = document.querySelector("#message");
  // check to see if the value of the staff id is in our database
  if (staffDatabase[staffID]) {
    // if its in the database check to see if the value of the password given is the same as the corresponding value pair to the staff id in our database.
    if (staffDatabase[staffID] === password) {
      // if it is then log in is succesfull
      message.textContent = "Login Successful!";
      message.style.color = "green";
      // Directed to the next page using thr window.location.href property the query is used to pass information to the next webpage from the current webpage. In this case the staff ID of the person who logged in is being passed to the medical forms page.
      window.location.href = `medicalformpage.html?staffID=${staffID}`;
      // if not succesfull do this.
    } else {
      message.textContent = "Wrong Password";
      message.color = "red";
    }
  } else {
    message.textContent = "Staff ID not found!";
    message.style.color = "red";
  }
});
