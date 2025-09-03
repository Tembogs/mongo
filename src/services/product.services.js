import product from "../model/product.schema.js";
export const createnewProduct = async (name, price, description, images, stock) => {
  try {
    const products = new product({
    name: name,
    price:price,
   description: description,
    images: images,
    stock:stock
  })
  await products.save()
  return products;
  } catch (error) {
    console.log(error);
    return null;
  }
  
}

export const getProductbyId = async (id) => {
  const newProduct = await product.findById(id); 
  return newProduct
}

export const getAllProduct = async () => {
  const products = await product.find();
  return products;
}



export const deleteProduct = async (id) => {
  const deletedProduct = await product.findByIdAndDelete(id)
 
  return deletedProduct;
}