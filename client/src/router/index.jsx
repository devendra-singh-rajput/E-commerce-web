import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPenal from "../pages/AdminPenal";
import AllUser from "../pages/AllUser";
import AllProducts from "../pages/AllProducts";
import ProductCategory from "../pages/ProductCategory";
import ProductDetail from '../pages/ProductDetail';
import Cart from "../pages/Cart";
import SearchProducts from "../pages/SearchProducts";
import CheckoutPage from "../pages/orderCheckOut";
import OrderHistoryPage from "../pages/OrderHistoryPage";
import AllOrders from "../pages/AllOrders";
import CustomizationPage from "../pages/costomize";
import Dashboard from "../pages/dashboard";
import EditProfile from "../pages/EditProfile";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "sign-up",
          element: <SignUp />,
        },
        {
          path: "product-category",
          element: <ProductCategory />,
        },
        {
          path: "productDetail/:id",
          element: <ProductDetail />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "search",
          element: <SearchProducts />,
        },
        {
          path: "OrderHistoryPage",
          element: <OrderHistoryPage />,
        },
        {
          path: "CheckoutPage/:productId",
          element: <CheckoutPage />,
        },
        {
          path: "EditProfile",
          element: <EditProfile/>,
        },
        {
          path: "admin-panel",
          element: <AdminPenal />,
          children: [
            {
              path: "Dashboard",
              element: <Dashboard />,
            },
            {
              path: "all-users",
              element: <AllUser />,
            },
            {
              path: "all-products",
              element: <AllProducts />,
            },
            {
              path: "all-orders",
              element: <AllOrders />,
            },
            {
              path: "all-customization",
              element: <CustomizationPage />,
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
