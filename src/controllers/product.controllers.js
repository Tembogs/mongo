import {createnewProduct, getProductbyId, getAllProduct, deleteProduct} from '../services/product.services.js';


export const createProduct = async (req, res) => {
  const {name, price, description, images, stock} = req.body;
  const newProduct = await createnewProduct(name, price, description, images, stock);
  if(!newProduct) {
    return res.status(400).json({message: "Could not create new product"})}
  res.status(201).json(newProduct);
}


export const getProductId = async (req, res) => {
  const {id} = req.params;
  const newProduct = await getProductbyId(id);

  if(!newProduct) {
    return res.status(400).json({
      message: "product not found"
    })
  }

  res.json(newProduct)
}

export const getProduct = async (req, res) => {
  const{id}= req.params;
  const products = await getAllProduct(id);
  res.json(products);
}

export const deleteProducts = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await deleteProduct(id);

  if (!deletedProduct) {
    return res.status(400).json({ message: "products not found" });
  }

  res.json(deletedProduct); // ✅ This should return the full user object
};