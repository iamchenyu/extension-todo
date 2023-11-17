const mongoose = require("mongoose");
const User = require("../schemas/User");

// Step 3: Create a Document
const newUser = (data) => {
  const user = {
    firstName: data.given_name,
    lastName: data.family_name,
    email: data,
  };
};

// Step 4: Save the Document to MongoDB
newUser
  .save()
  .then((savedUser) => {
    console.log("User saved:", savedUser);
  })
  .catch((error) => {
    console.error("Error saving user:", error);
  });
