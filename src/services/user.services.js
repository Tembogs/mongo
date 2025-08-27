import User from "../model/user.js"

export const createnewUser = async (username, email, phoneNumber, password, gender) => {
  const user = new User({
    name: username,
    email:email,
    phoneNumber: phoneNumber,
    password: password,
    gender:gender
  })
  await user.save()
  return user;
}

export const getUserbyId = async (id) => {
  const newuser = await User.findById(id); 
  return newuser
}

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
}

export const updateUser = async (id, username, emailAddress, phoneNumber, password, gender) => {
  const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, emailAddress, phoneNumber, password, gender },
      { new: true, runValidators: true } 
    )
  return updatedUser; 
}

export const deleteUser = async (id, username, emailAddress) => {
  const deletedUser = await User.findByIdAndDelete(
    id,
    {username, emailAddress, phoneNumber, password, gender},
    { new: true, runValidators: true }
  )
  return deletedUser;
}
