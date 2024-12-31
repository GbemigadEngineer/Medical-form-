"use strict";
// Patient ID Generator. TBh i dont really get this i asked chat gpt to help me generate patient ID so i can use as key in my database.
function generatePatientID() {
  let counter = parseInt(localStorage.getItem("patientCounter")) || 0;
  counter++;
  localStorage.setItem("patientCounter", counter);
  return "patient" + String(counter).padStart(3, "0"); // e.g., patient001, patient002
}

//  Initializing the patientDatabase. Again another thing i dont know in javascript yet, used chatgpt here
let patientDatabase = JSON.parse(localStorage.getItem("patientDatabase")) || {};

// Retrieve the staff ID from the URL and display it
const urlParams = new URLSearchParams(window.location.search);
const staffID = urlParams.get("staffID");
document.querySelector(
  "#staff-id-display"
).textContent = `Staff Id: ${staffID}`;

document.querySelector("#next-btn").addEventListener("click", function () {
  if (
    document.querySelector("#patient-name").value !== "" &&
    document.querySelector("#patient-age").value !== "" &&
    document.querySelector("#patient-gender").value !== ""
  ) {
    // Generate the patient id
    const patientID = generatePatientID();

    // Add new patient in the database
    patientDatabase = {
      [patientID]: {
        name: document.querySelector("#patient-name").value,
        age: document.querySelector("#patient-age").value,
        gender: document.querySelector("#patient-gender").value,
      },
    };

    // Save the updated patientDatabase to localStorage
    localStorage.setItem("patientDatabase", JSON.stringify(patientDatabase));
    document.querySelector("#medical-exam").style.display = "block";
  } else {
    alert("All patient info feilds needs to be filled.");
  }
});

const bloodPressure = document.querySelector("#blood-pressure").value;

const pulse = document.querySelector("#pulse").value;

const weight = document.querySelector("#weight").value;
const height = document.querySelector("#height").value;

const bmi = document.querySelector("#bmi").value;

const oxygen = document.querySelector("#oxygen");

const temeperature = document.querySelector("#temperature");



// function to validate the examination data and make sure they are in the right format.

// blood pressure validation
function validateBloodPressure(bp){
  const bpPattern = /^\d+\/\d+$/
  return bpPattern.test(bp)

}


function formField(exam){
  exam.addEventListener('blur', function(){
    if (exam === bloodPressure){
      validateBloodPressure(exam)
    }
  })
} 