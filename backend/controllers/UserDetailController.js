async function userDetailController(req,res){
    try {
        console.log(userId)
    } catch (error) {
        return res.status(400).json({
            message: error.message ||error,
            error: true,
            success: false,
          });
    }
}
module.exports=userDetailController