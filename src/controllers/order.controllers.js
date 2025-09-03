import {createnewOrder, getOrderbyId, getAllOrder, deleteOrder} from '../services/order.services.js';


export const createOrder = async (req, res) => {
  const {user, product, total, status} = req.body;
  const newOrder = await createnewOrder(user, product, total, status);
  if(!newOrder) {
    return res.status(400).json({message: "Could not create new product"})}
  res.status(201).json(newOrder);
}

export const getOrderId = async (req, res) => {
  const {id} = req.params;
  const newOrder = await getOrderbyId(id);

  if(!newOrder) {
    return res.status(400).json({
      message: "Order not found"
    })
  }

  res.json(newOrder)
}

export const getOrder = async (req, res) => {
  const{id}= req.params;
  const Orders = await getAllOrder(id);
  res.json(Orders);
}

export const deleteOrders = async (req, res) => {
  const { id } = req.params;
  const deletedOrder = await deleteOrder(id);

  if (!deletedOrder) {
    return res.status(400).json({ message: "Orders not found" });
  }

  res.json(deletedOrder); // ✅ This should return the full user object
};
