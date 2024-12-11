
// import Logo from './logo'
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assest/banner/aashapura-logo-transparent.png'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import summmryApi from "../common";
import { setUserDetaile } from "../sotre/userSlice";
import { useContext, useEffect, useState } from "react";
import ROLE from "../common/role";
import Context from "../context";
import axios from "axios";
const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state?.user?.user)
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate =useNavigate()
  const searchInput=useLocation()
  const [search,setSearch]=useState(searchInput?.search?.split("=")[1])
  const [newLogo,setNewLogo]=useState('')


  //get logo
  const getLogo = async () => {
    try {
      const { data } = await axios.get(summmryApi.getCustomization.url, {
        withCredentials: true,
      });
      if (data?.logo) {
        setNewLogo(data?.logo)
      }
    } catch (error) {
      console.error("Failed to fetch logo:", error);
    }
  };
  useEffect(()=>{
  getLogo()
},[])
  const userLogout = async () => {
    const fetchData = await fetch(summmryApi.logout_user.url, {
      method: summmryApi.logout_user.method,
      credentials: "include"
    })
    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message, { autoClose: 1000 });
      dispatch(setUserDetaile(null))
      navigate("/")
    } else {
      toast.error(data.message);
    }
  }

  const onSerchProducts= async(e)=>{
  const{value}=e.target
  setSearch(value)
  if (value) {
    navigate(`/search?q=${value}`)
  }
  }

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className="h-full container mx-auto flex items-center px-4 justify-between ">
        <div>
          <Link to={"/"}>
            <img src={newLogo||logo} className="overflow-hidden  h-12" alt="Ashapura Logo" />
          </Link>
        </div>
        <div className='hidden lg:flex items-center  w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type="text" placeholder='Search items hear...' className='w-full outline-none px-4' onChange={onSerchProducts} value={search}/>
          <div className='text-lg min-w-[50px] h-8 bg-primary flex items-center justify-center rounded-r-full
          text-white'><IoSearchSharp /></div></div>
        <div className='flex items-center gap-4 md:gap-7'>
          <div className='relative group flex justify-center'>
            {
              user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)}>
                  {
                    user?.profilePic ? (<img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />) : (<FaRegUserCircle />)
                  }
                </div>
              )
            }

            {
              menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit pd-2 shadow-lg rounded '>
                  <nav >
                    {
                      user?.role === ROLE.ADMIN && <Link to={'/admin-panel/Dashboard'} className='whitespace-nowrap hidden md:block  bg-white hover:bg-slate-100 p-2 rounded-lg' onClick={() => setMenuDisplay(prev => !prev)}>Admin Panel</Link>
                    }
                  </nav>
                </div>
              )
            }
          </div>

          {
             user?._id&&(<Link to={'/cart'} className='text-3xl relative'><span><MdOutlineShoppingCart /></span>
              <div className='bg-primary text-white p-1 flex items-center justify-center w-5 h-5 rounded-full -top-2 -right-3 absolute'>
                <p className='text-sm'>{context?.countProductCart}</p>
              </div>
            </Link> )
          }
          

          <div>
            {
              user?._id ? (<button onClick={userLogout} className="px-3 py-1 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-full">logout</button>) : (
                <Link to={"/login"} className="px-3 py-1 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-full"> login</Link>
              )
            }
          </div>
        </div>


      </div></header>
  )
}

export default Header
