

document.getElementById("insertForm").addEventListener("submit", function (event) {
  event.preventDefault();
  validate();

  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let mobile = document.getElementById("mobile").value;

  let gendTemp = document.getElementsByName('gender');
  let gender;
  for (i = 0; i < gendTemp.length; i++) {
    if (gendTemp[i].checked)
      gender = gendTemp[i].value;
  }

  let dateOfBirth = document.getElementById("dateOfBirth").value;
  let language = document.getElementById("language").value;
  let message = document.getElementById("message").value;

  // fetch("/insert", {
  //   //check
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     firstName: firstName, lastName: lastName, email: email, mobile: mobile,
  //     gender: gender, dateOfBirth: dateOfBirth, language: language, message: message
  //   }),
  // }).then(function (response) {
  //   if (response.ok) {
  //     getUserData();
  //   } else {
  //     alert("Failed to insert data!");
  //   }
  // })
  //   .catch(function (error) {
  //     console.error("Error:", error);
  //     alert("An error occurred!");
  //   });
});

// document.getElementById("getComp").addEventListener("submit", function (event) {
//   event.preventDefault();
//   getData();
// });
// function getData() {
//   //clear any existing data
//   const dataList = document.getElementById("insertForm");
//   while (dataList.firstChild) {
//     dataList.removeChild(dataList.lastChild);
//   }
//   //refresh
//   fetch("/view")
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {


//       data.forEach(function (item) {
//         let listItem = document.createElement("h1");
//         listItem.textContent = item.companyName;
//         dataList.appendChild(listItem);
//       });
//     })
//     .catch(function (error) {
//       console.error("Error:", error);
//       alert("An error occurred!");
//     });
// }

// function getUserData() {
//   //clear any existing data
//   const dataList = document.getElementById("dataList");
//   while (dataList.firstChild) {
//     dataList.removeChild(dataList.lastChild);
//   }
//   //refresh
//   fetch("/show")
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {


//       data.forEach(function (item) {
//         let listItem = document.createElement("li");
//         listItem.textContent = item.firstName;
//         dataList.appendChild(listItem);
//       });
//     })

//     .catch(function (error) {
//       console.error("Error:", error);
//       alert("An error occurred!");
//     });
// }

// getUserData();


function validate() {

  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let phoneNumber = document.getElementById("mobile").value;

  let gendTemp = document.getElementsByName('gender');
  let gender;
  for (i = 0; i < gendTemp.length; i++) {
    if (gendTemp[i].checked)
      gender = gendTemp[i].value;
  }

  let birthday = document.getElementById("dateOfBirth").value;
  let language = document.getElementById("language").value;
  let message = document.getElementById("message").value;

  //regular expression for the name and email and Saudi phone number
  var regEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  var regPhone = /^[0-9]{10}$/;
    //check that entered name is only letters, and at least 2 letters
  var regfName, reglName = /^[A-Za-z]+$/; 
  let messages=[];

  if (firstName == "") {
    messages.push("The FIRST NAME is required!!");
  } else {
    if (!firstName.match(regfName) || firstName.length < 2) {
      messages.push("The first name should contain 2 letters at least!");
    }
  }
  //check the last name validity
  if (lastName == "") {
    messages.push("The LAST NAME is required!!");
  } else {
    if (!lastName.match(reglName) || lastName.length < 2) {
      messages.push("The last name should contain 2 letters at least!");
    }
  }

  //check email validity
  if (email == "") {
    messages.push("The EMAIL is required!!");
  } else {
    if (!email.match(regEmail) || email.length < 2) {
      messages.push("Check the email format!");
    }
  }

  //check phone number validity
  if (mobile == "") {
    messages.push("Phone Number is required!");
  } else {
    if (phoneNumber.length != 10 || !phoneNumber.match(regPhone)) {
      messages.push("phone should be 10 numbers only and doesn't contain any letters");
    }
  }
  //check message validity
  if (language == "") {
    messages.push("Please choose which language you want to be contacted with!");
  }
  //check gender validity
  if (gender == "") {
    messages.push("Please enter your gender!");
  }

  //check date of birth validity
  if (birthday == "") {
    messages.push("The birthday  is required!!");
  }

  //check message validity
  if (message == "") {
    messages.push("your message is required!");
  }

  if (firstName.length >= 2 && firstName.match(regfName) &&
    lastName.length >= 2 && lastName.match(reglName) &&
    mobile.match(regPhone) && email.match(regEmail) &&
    gender != "" && dateOfBirth != "" && language != "" && message != "") {
    var output = "Thank you!\nName: " + firstName + " " + lastName +
      "\nPhone: " + mobile + "\nEmail: " + email +
      "\nGender: " + gender + "\nDOB: " + dateOfBirth +
      "\nLanguage: " + language + "\nMessage: " + message;

    alert(output);
  } 

  if(messages.length>0){
    var output =messages.join('\n')+".";
    console.log(messages.length);
    alert(output);

    // event.preventDefault();
  }
}

// function myFunction() {
//   alert("Input first name field lost focus.");
// }

// //functon to make onblur event
// //the enterd name will be in capital letters
// function blur() {
//   let x = document.getElementById("fName");
//   x.value = x.value.toUpperCase();
// }

// function clearAll() {
//   document.getElementById("myForm").reset();
// }

// function start() {
//   var submitButton = document.getElementById("submitButton");
//   submitButton.addEventListener("click", validate, false);
// }

// window.addEventListener("load", start, false);