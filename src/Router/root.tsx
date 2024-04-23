import axios from "axios";

const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL as string;

export async function loader(id: number) {
  const productData = await axios.get(`${PRODUCTS_URL}/${id}`);
  return { productData };
}
