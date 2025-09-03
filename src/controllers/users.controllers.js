import {createnewUser, getUserbyId, getAllUsers, updateUser, deleteUser} from '../services/user.services.js';

export const createUser = async (req, res) => {
  const {name, email, phoneNumber, password, gender} = req.body;
  const newUser = await createnewUser(name, email, phoneNumber, password, gender);
  if(!newUser) {
    return res.status(400).json({message: "Could not create user"})}
  res.status(201).json(newUser);
}


export const getUserId = async (req, res) => {
  const {id} = req.params;
  const newUser = await getUserbyId(id);

  if(!newUser) {
    return res.status(400).json({
      message: "new user not found"
    })
  }

  res.json(newUser)
}

export const getUsers = async (req, res) => {
  const{id}= req.params;
  const users = await getAllUsers(id);
  res.json(users);
}

export const updateUsers = async (req, res) => {
  const {id} = req.params;

  const updatedUser = await updateUser(id);

  if (!updatedUser) {
    return res.status(400).json({ message: "User not found" });
  }

  res.json(updatedUser);
} 



export const deleteUsers = async (req, res) => {
  const { id } = req.params;
  const deletedUser = await deleteUser(id);

  if (!deletedUser) {
    return res.status(400).json({ message: "User not found" });
  }

  res.json(deletedUser); // ✅ This should return the full user object
};