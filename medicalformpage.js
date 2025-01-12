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

document.querySelector("#next-btn").addEventListener("click", function (event) {
  event.preventDefault();
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
    localStorage.setItem("patientDatabase", JSON.stringify(patientDatabase))
    document.querySelector("#medical-exam").style.display = "block";
  } else {
    alert("All patient info feilds needs to be filled.");
  }
});

// function to validate the examination data and make sure they are in the right format.

// Form validation for medical examination
const fields = document.querySelectorAll("#medical-exam input");
fields.forEach(field => {
    field.addEventListener("blur", function () {
        validateField(field);
    });
});

function validateField(field) {
    const errorText = document.createElement("div");
    errorText.className = "error-text";
    const existingError = field.parentElement.querySelector(".error-text");

    let valid = true;
    let message = "";

    switch (field.id) {
        case "blood-pressure":
            valid = /^\d{2,3}\/\d{2,3}$/.test(field.value);
            message = "Format: 120/80";
            break;
        case "pulse":
        case "weight":
        case "height":
        case "oxygen":
            valid = !isNaN(field.value) && field.value !== "" && parseInt(field.value) > 0;
            message = "Must be a positive number";
            break;
        case "bmi":
        case "temperature":
            valid = !isNaN(field.value) && field.value !== "" && parseFloat(field.value) > 0;
            message = "Must be a positive number";
            break;
    }

    if (existingError) {
        existingError.remove();
    }

    if (!valid) {
        errorText.textContent = `Invalid input. ${message}`;
        field.parentElement.appendChild(errorText);
        field.style.borderColor = "#ef4444"; // Red border for invalid input
    } else {
        field.style.borderColor = "#10b981"; // Green border for valid input
    }
    return valid;
}

// Form submission
const submitBtn = document.querySelector("#submit-btn");
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let formValid = true;
    let firstInvalidField = null;

    fields.forEach(field => {
        const isValid = validateField(field);
        if (!isValid && !firstInvalidField) {
            firstInvalidField = field;
        }
        formValid = formValid && isValid;
    });

    if (!formValid) {
        alert("Please correct the errors in the form.");
        firstInvalidField.scrollIntoView({ behavior: "smooth" });
    } else {
        const patientID = generatePatientID();
        patientDatabase[patientID] = {
            bloodPressure: document.querySelector("#blood-pressure").value,
            pulse: document.querySelector("#pulse").value,
            weight: document.querySelector("#weight").value,
            height: document.querySelector("#height").value,
            bmi: document.querySelector("#bmi").value,
            oxygen: document.querySelector("#oxygen").value,
            temperature: document.querySelector("#temperature").value,
        };

        localStorage.setItem("patientDatabase", JSON.stringify(patientDatabase));
        alert("Saved to database successfully.");
        document.querySelector("#physical-Abnormality").style.display = "block";
    }
});


// Physical Abnormality

document.getElementById('submit-btn-abn').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent form submission

  const form = document.querySelector('#physical-Abnormality form');
  const inputs = form.querySelectorAll('input');

  const abnormalities = {}

  inputs.forEach(input => {
      if (input.value.trim() === '') {
          if (input.type === 'number') {
              input.value = 'Nill'; // Allow 'Nill' or 'None' for number fields
          } else {
              input.value = 'Nill'; // For text fields, set to Nill
          }
      }

      abnormalities[input.id] = input.value;
  });

  // After filling, you can submit the form
  const patientID = Object.keys(patientDatabase).pop(); // Assuming the most recent patient is the last key
  if (patientID) {
    // Retrieve the patient's data, update with abnormalities
    if (patientDatabase[patientID]) {
      patientDatabase[patientID].abnormalities = abnormalities; // Add or update abnormalities data
      localStorage.setItem("patientDatabase", JSON.stringify(patientDatabase));
      alert("Abnormalities added/updated successfully.");

    } else {
      alert("Patient not found in the database.");
    }
  } else {
    alert("No patient record found to update.");
  }

});

// confirmation page!

document.querySelectorAll(".confirm").forEach(checkbox => {
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      // Hide all other checkboxes
      document.querySelectorAll(".confirm").forEach(cb => {
        if (cb !== this) {
          cb.style.display = "none"; // Hide the checkbox itself
          cb.nextElementSibling.style.display = "none"; // Hide the associated label
        }
      });
    } else {
      // Show all checkboxes again if unchecked
      document.querySelectorAll(".confirm").forEach(cb => {
        cb.style.display = "inline-block"; // Show the checkbox itself
        cb.nextElementSibling.style.display = "inline"; // Show the associated label
      });
    }
  });
});




