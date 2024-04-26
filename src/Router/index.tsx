import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import SingleProduct from "../Pages/SingleProduct";
import { loader as rootLoader } from "./root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "shop/category/:id",
    loader: ({ params }: any): number => +params.id,
    element: <Shop />,
  },
  {
    path: "shop",
    element: <Shop />,
  },
  {
    path: "product/:id",
    loader: async ({ params }: any) => rootLoader(params.id),
    element: <SingleProduct />,
  },
  {
    path: "*",
    element: <div>404</div>,
  },
]);
