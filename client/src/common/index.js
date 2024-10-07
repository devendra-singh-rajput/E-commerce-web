const backendDomin ="http://localhost:8080"

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
    }
}
 export default summmryApi
 