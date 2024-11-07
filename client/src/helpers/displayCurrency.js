const INRcurrency= (num)=>{
    const formatter = new Intl.NumberFormat('en-IN',{
        style:"currency",
        currency:"INR",
        minimumFractionDigits:2
    })
    return formatter.format(num)
}
export default INRcurrency