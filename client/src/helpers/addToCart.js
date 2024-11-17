import summmryApi from "../common";
import { toast } from 'react-toastify';

const addToCart = async(e,id)=>{
    e?.stopPropagation(); 
    e?.preventDefault();

    const response= await fetch(summmryApi.addToCart.url,{
     method:summmryApi.addToCart.method,
     credentials :'include',
     headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({productId:id}) 
    })

    const responseData   = await response.json()

    if (responseData.success) {
        toast.success(responseData.message,{autoClose: 1000});
    } else {
        toast.warn(responseData.message);
    }
    return responseData

}
export default addToCart