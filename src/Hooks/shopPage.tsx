/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { Dispatch, useEffect, useRef, useState } from "react";
import { Product } from "../interfaces/product.interface";
import { useLoaderData, useLocation } from "react-router-dom";

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
  const routeCategoryId = useLoaderData() as number;
  const location = useLocation();
  const byCategory = useRef<boolean>(false);
  const categoryId = useRef<number>(routeCategoryId);
  const [productOrder, setProductOrder] = useState<ProductOrder>("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [pagesNavList, setPagesNavList] = useState<number[] | null>(null);
  const [numShowProducts, setNumShowProducts] = useState(
    Number(localStorage.getItem(`@numShowProducts-${location.pathname}`)) !== 0
      ? Number(localStorage.getItem(`@numShowProducts-${location.pathname}`))
      : DEFAULT_NUMBER_PRODUCTS
  );
  const [paginationData, setPaginationData] = useState<PaginationData | null>(
    null
  );

  async function getProducts(
    page: number,
    perPage: number,
    order: ProductOrder = "asc",
    orderType: "price" | "discount_percent" = "price"
  ) {
    try {
      const products: {
        data: { pagination: PaginationData } & { products: Product[] };
      } = await axios.get(
        byCategory.current
          ? `${PRODUCTS_URL}?page=${page}&perPage=${perPage}&orderBy=${orderType}&sortType=${order}&category=${categoryId.current}`
          : `${PRODUCTS_URL}?page=${page}&perPage=${perPage}&orderBy=${orderType}&sortType=${order}`
      );

      const pageData: PaginationData = {
        hasNextPage: products.data.pagination.hasNextPage,
        hasPrevPage: products.data.pagination.hasPrevPage,
        nextPage: products.data.pagination.nextPage,
        pageCount: products.data.pagination.pageCount,
        prevPage: products.data.pagination.prevPage,
        productCount: products.data.pagination.productCount,
        totalProducts: products.data.pagination.totalProducts,
      };

      return { products: products.data.products, pageData };
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }

  function buildPage(
    products: Product[],
    pageData: PaginationData,
    setTotal?: Dispatch<() => number>
  ) {
    setProducts(() => products);
    setTotal && setTotal(() => products.length);

    setPagesNavList(() =>
      Array.from({ length: pageData.pageCount }, (_, i) => i + 1)
    );
    setPaginationData(() => pageData);

    let localStorageNumProducts = Number(
      localStorage.getItem(`@numShowProducts-${location.pathname}`)
    );

    let totalShowProducts = DEFAULT_NUMBER_PRODUCTS;
    if (localStorageNumProducts > 0) {
      totalShowProducts =
        pageData.totalProducts < localStorageNumProducts
          ? pageData.totalProducts
          : localStorageNumProducts;
    }

    setNumShowProducts(() => totalShowProducts);
  }

  async function changeNumShowProducts(val: number) {
    const { products, pageData } = await getProducts(
      1,
      val,
      productOrder,
      "price"
    );

    buildPage(products, pageData, undefined);
  }

  async function changePage(page: number) {
    const { products, pageData } = await getProducts(
      page,
      numShowProducts,
      productOrder
    );

    buildPage(products, pageData, undefined);
    setCurrentPage(() => page);
  }

  async function nextPage() {
    if (paginationData?.hasNextPage) {
      const { products, pageData } = await getProducts(
        currentPage + 1,
        numShowProducts,
        productOrder
      );

      buildPage(products, pageData, undefined);
      setCurrentPage((prev) => prev + 1);
    }
  }

  async function prevPage() {
    if (paginationData?.hasPrevPage) {
      const { products, pageData } = await getProducts(
        currentPage - 1,
        numShowProducts,
        productOrder
      );
      buildPage(products, pageData, undefined);
      setCurrentPage((prev) => prev - 1);
    }
  }

  async function pageFilterByCategory() {
    byCategory.current = true;

    const { products, pageData } = await getProducts(
      1,
      numShowProducts,
      "asc",
      "price"
    );

    buildPage(products, pageData, undefined);
  }

  async function defaultShopPage() {
    byCategory.current = false;

    const { products, pageData } = await getProducts(
      1,
      DEFAULT_NUMBER_PRODUCTS,
      "asc",
      "price"
    );

    buildPage(products, pageData, setNumShowProducts);
  }

  async function changeSortOrder(order: ProductOrder) {
    const { products, pageData } = await getProducts(
      currentPage,
      numShowProducts,
      order
    );
    setProductOrder(order);
    buildPage(products, pageData, setNumShowProducts);
  }

  async function pageFilter() {
    const { products, pageData } = await getProducts(
      1,
      numShowProducts,
      "desc",
      "discount_percent"
    );
    setProductOrder("desc");
    buildPage(products, pageData, setNumShowProducts);
  }

  useEffect(() => {
    localStorage.setItem(
      `@numShowProducts-${location.pathname}`,
      numShowProducts.toString()
    );
  }, [numShowProducts, products]);

  useEffect(() => {
    if (routeCategoryId) {
      pageFilterByCategory();
      return;
    }

    defaultShopPage();
  }, [location.pathname]);

  return {
    products,
    currentPage,
    pagesNavList,
    numShowProducts,
    totalProducts: paginationData?.totalProducts,
    hasNextPage: paginationData?.hasNextPage,
    setNumShowProducts,
    pageFilterByCategory,
    changeSortOrder,
    changeNumShowProducts,
    changePage,
    pageFilter,
    nextPage,
    prevPage,
  };
}
