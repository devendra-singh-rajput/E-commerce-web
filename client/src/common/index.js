//const backendDomin ="http://localhost:8080"
 const backendDomin ="https://e-commerce-web-cxge.onrender.com"

const summmryApi={
    signUp:{
        url:`${backendDomin}/api/signup`,
        method:"post"
    },
    signIn:{
        url:`${backendDomin}/api/signin`,
        method:"post"
    },
    current_user:{
        url:`${backendDomin}/api/user`,
        method:"get"
    },
    logout_user:{
        url:`${backendDomin}/api/userLogout`,
        method:"get"
    },
    allUser:{
        url:`${backendDomin}/api/all-user`,
        method:"get"
    },
    updateUser:{
        url:`${backendDomin}/api/updateUser`,
        method:"put"
    },
    uploadProduct:{
        url:`${backendDomin}/api/uploadProduct`,
        method:"post"
    },
    getProducts:{
        url:`${backendDomin}/api/getProducts`,
        method:"get"
    },
    updateProducts:{
        url:`${backendDomin}/api/updateProducts`,
        method:"put"
    },
    deleteProduct:{
        url:`${backendDomin}/api/deleteProduct`,
        method:"delete"
    },
    productCategory:{
        url:`${backendDomin}/api/productCategory`,
        method:"get"
    },
    productCategoryWise:{
        url:`${backendDomin}/api/productCategoryWise`,
        method:"post"
    },
    productDetailes:{
        url:`${backendDomin}/api/productDetailes`,
        method:"post"
    },
    addToCart:{
        url:`${backendDomin}/api/addToCart`,
        method:"post"
    },
    countProductCart:{
        url:`${backendDomin}/api/countProductCart`,
        method:"get"
    },
    cartView:{
        url:`${backendDomin}/api/cartView`,
        method:"get"
    },
    updateCart:{
        url:`${backendDomin}/api/updateCart`,
        method:"post"
    },
    deleteCartProduct:{
        url:`${backendDomin}/api/deleteCartProduct`,
        method:"delete"
    },
    deleteAllCartItems:{
        url:`${backendDomin}/api/deleteAllCartItems`,
        method:"delete"
    },
    search:{
        url:`${backendDomin}/api/search`,
        method:"get"
    },
    getFilterProducts:{
        url:`${backendDomin}/api/getFilterProducts`,
        method:"get"
    },
    sendSMS:{
        url:`${backendDomin}/api/sendSMS`,
        method:"post"
    },
    placeOrder:{
        url:`${backendDomin}/api/placeOrder`,
        method:"post"
    },
    getOrderHistory:{
        url:`${backendDomin}/api/getOrderHistory`,
        method:"get"
    },
    getAllOrders:{
        url:`${backendDomin}/api/getAllOrders`,
        method:"get"
    },
    updateOrders:{
        url:`${backendDomin}/api/updateOrder`,
        method:"put"
    },
    getCustomization:{
        url:`${backendDomin}/api/getCustomization`,
        method:"get"
    },
    updateCustomization:{
        url:`${backendDomin}/api/updateCustomization`,
        method:"post"
    },
    getDashboardData:{
        url:`${backendDomin}/api/getDashboardData`,
        method:"get"
    },
    sendOtp:{
        url:`${backendDomin}/api/sendOtp`,
        method:"post"
    },
    verifyOtp:{
        url:`${backendDomin}/api/verifyOtp`,
        method:"post"
    },
    resetPassword:{
        url:`${backendDomin}/api/resetPassword`,
        method:"post"
    },
    createOrder:{
        url:`${backendDomin}/api/createOrder`,
        method:"post"
    },verifyPayment:{
        url:`${backendDomin}/api/verifyPayment`,
        method:"post"
    },
    EditProfile:{
        url:`${backendDomin}/api/EditProfile`,
        method:"put"
    },
}
 export default summmryApi
 
