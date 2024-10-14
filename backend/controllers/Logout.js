async function userLogout(req,res) {
    try {
       await res.clearCookie("token")


        res.json({
            Data:[],
            success:true,
            error:false,
            message:"logged out successfully..."
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message ||error,
            error: true,
            success: false,
          });
    }
}
module.exports=userLogout