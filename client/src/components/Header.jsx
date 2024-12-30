import { IoSearchSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assest/banner/aashapura-logo-transparent.png';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import summmryApi from "../common";
import { setUserDetaile } from "../sotre/userSlice";
import { useContext, useEffect, useState } from "react";
import ROLE from "../common/role";
import Context from "../context";
import axios from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state?.user?.user);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const [search, setSearch] = useState(searchInput?.search?.split("=")[1] || "");
  const [newLogo, setNewLogo] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Get logo
  const getLogo = async () => {
    try {
      const { data } = await axios.get(summmryApi.getCustomization.url, {
        withCredentials: true,
      });
      if (data?.logo) {
        setNewLogo(data?.logo);
      }
    } catch (error) {
      console.error("Failed to fetch logo:", error);
    }
  };

  useEffect(() => {
    getLogo();
  }, []);

  const userLogout = async () => {
    try {
      const fetchData = await fetch(summmryApi.logout_user.url, {
        method: summmryApi.logout_user.method,
        credentials: "include",
      });
      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message, { autoClose: 1000 });
        dispatch(setUserDetaile(null));
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const onSearchProducts = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
    if (isSearchOpen) {
      setSearch("");
    }
  };

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link to={"/"}>
            <img src={newLogo || logo} className="h-12" alt="Ashapura Logo" />
          </Link>
        </div>
          
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input
            type="text"
            placeholder='Search items here...'
            className='w-full outline-none px-4'
            onChange={onSearchProducts}
            value={search}
          />
          <div className='text-lg min-w-[50px] h-8 bg-primary flex items-center justify-center rounded-r-full text-white'>
            <IoSearchSharp />
          </div>
        </div>

        {
          <div className="lg:hidden py-2 flex items-center">
            <button onClick={toggleSearch} className='text-2xl '>
            <IoSearchSharp />
          </button>
          </div>
        }

        <div className='flex items-center gap-4 md:gap-7'>
          {
            user?._id&&(user?.role==='ADMIN'?(
              <Link to={'/admin-panel/Dashboard'} className='text-3xl cursor-pointer'>
                 {user?.profilePic ? (
                  <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                ) : (<FaRegUserCircle />           
                )}
              </Link>
            ):(<Link to={'/EditProfile'}>
               {user?.profilePic ? (
                  <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                ) : (<FaRegUserCircle className="text-3xl" />           
                )}
            </Link>))
          }

          {user?._id && (
            <Link to={'/cart'} className='text-3xl relative'>
              <MdOutlineShoppingCart />
              <div className='bg-primary text-white p-1 flex items-center justify-center w-5 h-5 rounded-full -top-2 -right-3 absolute'>
                <p className='text-sm'>{context?.countProductCart}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={userLogout}
                className="px-3 py-1 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-full">
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-full">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Responsive search bar for mobile */}
      <div className='lg:hidden px-4 py-2 flex items-center border-t'>
        {isSearchOpen && (
          <div className='flex w-full items-center gap-2 '>
            <input
              type="text"
              placeholder='Search items here...'
              className='w-full outline-none px-4 py-2 border rounded-lg'
              onChange={onSearchProducts}
              value={search}
            />
            <button onClick={toggleSearch} className='text-lg text-primary bg-white px-3 py-1 border border-primary  rounded-lg '>Close</button>
          </div>
        )
          
        }
      </div>
    </header>
  );
};

export default Header;
