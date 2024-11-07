const backendDomin ="http://localhost:8080"
// const backendDomin ="https://e-commerce-web-aq5g.onrender.com"

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
}
 export default summmryApi
 