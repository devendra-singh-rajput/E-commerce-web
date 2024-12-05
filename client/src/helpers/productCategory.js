import { useEffect, useState } from "react";

const productCategroy=[
    {id :1,label:"Airpodes",value:"airpodes"},
    {id :2,label:"Camera",value:"camera"},
    {id :3,label:"Earphones",value:"earphones"},
    {id :4,label:"Moblies",value:"mobiles"},
    {id :5,label:"Mouse",value:"mouse"},
    {id :6,label:"Printers",value:"printers"},
    {id :7,label:"Processor",value:"processor"},
    {id :8,label:"Refrigerator",value:"refrigerator"},
    {id :9,label:"Speakers",value:"speakers"},
    {id :10,label:"Trimmers",value:"trimmers"},
    {id :11,label:"Televisions",value:"televisions"},
    {id :12,label:"Watches",value:"watches"}
]
export default productCategroy

useEffect(() => {
    const [categories,setCategories]=useState([])
    const fetchCustomization = async () => {
      try {
        const { data } = await axios.get(summmryApi.getCustomization.url, {
          withCredentials: true,
        });
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Failed to fetch customization:", error);
      }
    };

    fetchCustomization();
  }, []);