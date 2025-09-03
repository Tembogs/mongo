import Order from "../model/order.js";
export const createnewOrder = async (user, product, status,total ) => {
  try {
    const orders = new Order({
     user: user,
    product:product,
    total: total,
   status: status,
  })
  await orders.save()
  return orders;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getOrderbyId = async (id) => {
  const newOrder = await Order.findById(id); 
  return newOrder
}

export const getAllOrder = async () => {
  const Orders = await Order.find();
  return Orders;
}

export const deleteOrder = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id)
 
  return deletedOrder;
}
