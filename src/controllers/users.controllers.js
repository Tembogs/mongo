import {createnewUser, getUserbyId, getAllUsers, updateUser, deleteUser} from '../services/user.services.js';

export const createUser = async (req, res) => {
  const {username, emailAddress, phoneNumber, password, gender} = req.body;
  const newUser = await createnewUser(username, emailAddress, phoneNumber, password, gender);
  res.status(201).json(newUser);
}


export const getUserId = async (req, res) => {
  const {id} = req.params;
  const newUser = await getUserbyId(id);

  if(!newUser) {
    return res.status(404).json({
      message: "new user not found"
    })
  }

  res.json(newUser)
}

export const getUsers = async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
}

export const updateUsers = async (req, res) => {
  const {id} = req.params;
  const {username, emailAddress, phoneNumber, password, gender} = req.body;

  const updatedUser = await updateUser(id, username, emailAddress, phoneNumber, password, gender);

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(updatedUser);
} 

export const deleteUsers = async (req, res) => {
  const {id} = req.params;
  const {username, emailAddress, phoneNumber, password, gender} = req.body;

  const deletedUser = await deleteUser(id, username, emailAddress, phoneNumber, password, gender);

  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(deletedUser);
} 