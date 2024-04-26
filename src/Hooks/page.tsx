/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../interfaces/product.interface";

const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL as string;
const DEFAULT_NUMBER_PRODUCTS = 16;
type PaginationData = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: string;
  pageCount: number;
  prevPage: string;
  productCount: number;
  totalProducts: number;
};

type ProductOrder = "asc" | "desc";

export default function usePagination() {
  const [productOrder, setProductOrder] = useState<ProductOrder>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [products, setProducts] = useState<Product[]>([]);
  const [pagesNavList, setPagesNavList] = useState<number[] | null>(null);
  const [numShowProducts, setNumShowProducts] = useState(
    Number(localStorage.getItem("@numShowProducts")) !== 0
      ? Number(localStorage.getItem("@numShowProducts"))
      : DEFAULT_NUMBER_PRODUCTS
  );
  const [paginationData, setPaginationData] = useState<PaginationData | null>(
    null
  );

  async function getProducts(
    page: number,
    perPage: number,
    order: ProductOrder = "asc",
    setTotal?: (val: number) => void,
    orderType: "price" | "discount_percent" = "price"
  ) {
    try {
      const products = await axios.get(
        `${PRODUCTS_URL}?page=${page}&perPage=${perPage}&order=${order}&orderType=${orderType}`
      );
      const fetchProducts = products.data.products;
      setProducts(() => fetchProducts);
      setTotal && setTotal(fetchProducts.length as any);
      const data: PaginationData = {
        hasNextPage: products.data.hasNextPage,
        hasPrevPage: products.data.hasPrevPage,
        nextPage: products.data.nextPage,
        pageCount: products.data.pageCount,
        prevPage: products.data.prevPage,
        productCount: products.data.productCount,
        totalProducts: products.data.totalProducts,
      };
      setPagesNavList(() =>
        Array.from({ length: data.pageCount }, (_, i) => i + 1)
      );
      setPaginationData(() => data);
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }

  function handleChange(val: number) {
    if (val > (paginationData?.totalProducts ?? 0)) {
      return;
    }

    if (val <= (paginationData?.totalProducts ?? 0)) {
      getProducts(1, val, productOrder);
    }

    setNumShowProducts(() => val);
  }

  function changePage(page: number) {
    setCurrentPage(() => page);
    getProducts(page, numShowProducts);
  }

  function nextPage() {
    if (paginationData?.hasNextPage) {
      getProducts(currentPage + 1, numShowProducts, productOrder);
      setCurrentPage((prev) => prev + 1);
    }
  }

  function prevPage() {
    if (paginationData?.hasPrevPage) {
      getProducts(currentPage - 1, numShowProducts, productOrder);
      setCurrentPage((prev) => prev - 1);
    }
  }

  function changeSortOrder(order: ProductOrder) {
    getProducts(currentPage, numShowProducts, order);
    setProductOrder(order);
  }

  function pageFilter() {
    getProducts(1, numShowProducts, "desc", undefined, "discount_percent");
    setProductOrder("desc");
  }

  useEffect(() => {
    localStorage.setItem("@numShowProducts", numShowProducts.toString());
  }, [numShowProducts, products]);

  useEffect(() => {
    let numProducts: number | null = Number(
      localStorage.getItem("@numShowProducts")
    );

    if (numProducts === null) {
      numProducts = DEFAULT_NUMBER_PRODUCTS;
    }

    getProducts(1, numProducts, productOrder, setNumShowProducts);
  }, []);

  return {
    products,
    numShowProducts,
    currentPage,
    pagesNavList,
    totalProducts: paginationData?.totalProducts,
    hasNextPage: paginationData?.hasNextPage,
    handleChange,
    changePage,
    nextPage,
    prevPage,
    changeSortOrder,
    pageFilter,
  };
}
