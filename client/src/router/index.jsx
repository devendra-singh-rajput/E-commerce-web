import{createBrowserRouter} from "react-router-dom"
import App from "../App"
import Home from "../pages/Home"
import Login from "../pages/Login"
import ForgotPassword from "../pages/ForgotPassword"
import SignUp from "../pages/SignUp"
import AdminPenal from "../pages/AdminPenal"
import AllUser from "../pages/AllUser"
import AllProducts from"../pages/AllProducts"
import ProductCategory from "../pages/ProductCategory"
import ProductDetail from '../pages/ProductDetail';
import Cart from "../pages/Cart"
import SearchProducts from "../pages/SearchProducts"
import CheckoutPage from "../pages/orderCheckOut"
import OrderHistoryPage from "../pages/OrderHistoryPage"


const router = createBrowserRouter([{
    path:"/",
    element: <App/>
    ,children:[
        {
            path:""
            ,element:<Home/>
        },
        {
            path:"login"
            ,element:<Login/>
        },
        {
            path:"forgot-password"
            ,element:<ForgotPassword/>
        },
        {
            path:"sign-up"
            ,element:<SignUp/>
        },
        {
            path:"product-category"
            ,element:<ProductCategory/>
        },
        {
            path:"productDetail/:id"
            ,element:<ProductDetail/>
            
        },
        {
            path:"cart"
            ,element:<Cart/>
            
        },
        {
            path:"search"
            ,element:<SearchProducts/>
        },
        {
            path:"OrderHistoryPage"
            ,element:<OrderHistoryPage/>
        },
        {
            path:"CheckoutPage/:productId"
            ,element:<CheckoutPage/>
        },
        {
            path:"admin-panel"
            ,element:<AdminPenal/>
            ,children:[
                {
                    path:"all-users"
                    ,element:<AllUser/>
                }, {
                    path:"all-products"
                    ,element:<AllProducts/>
                },
            ]
        }
    ]
}])
export default router