import User from "../model/user.js"

export const createnewUser = async (name, email, phoneNumber, password, gender) => {
  try {
    const user = new User({
    name: name,
    email:email,
    phoneNumber: phoneNumber,
    password: password,
    gender:gender
  })
  await user.save()
  return user;
  } catch (error) {
    console.log(error);
    return null;
  }
  
}

export const getUserbyId = async (id) => {
  const newuser = await User.findById(id); 
  return newuser
}

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
}

export const updateUser = async (id, name, email, phoneNumber, password, gender) => {
  const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, phoneNumber, password, gender },
      { new: true, runValidators: true } 
    )
  return updatedUser; 
}

export const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id)
 
  return deletedUser;
}
