"use server";

import User from "@/app/_server/models/userModel";

const registerUser = async (payload) => {
  const data = JSON.parse(payload);
  console.log("Registering user...", data);
  const user = {
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    email: data.email,
    hash: data.hash
  };

  const newUser = new User(user);
  return newUser.save();
};



export { registerUser };
