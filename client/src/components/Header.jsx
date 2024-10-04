
import Logo from './logo'
import { IoSearchSharp } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import logo from '../assest/banner/aashapura-logo-transparent.png'
const Header = () => {
  return (
<header className='h-16 shadow-md bg-white'>
    <div className="h-full container mx-auto flex items-center px-4 justify-between">
    <div>
      <Link to={"/"}>
        <img src={logo} width={150} height={70} alt="aashapura logo" />
      </Link>
    </div>
    <div className='hidden lg:flex items-center  w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'> 
      <input type="text"placeholder='search item hear...'className='w-full outline-none '/>
    <div className='text-lg min-w-[50px] h-8 bg-primary flex items-center justify-center rounded-r-full
text-white'><IoSearchSharp /></div></div>
       <div className='flex items-center gap-7'> 
        <div className='text-3xl cursor-pointer'><FaRegUserCircle/></div>
        <div className='text-3xl relative'><span><MdOutlineShoppingCart/></span>
        <div className='bg-primary text-white p-1 flex items-center justify-center w-5 h-5 rounded-full -top-2 -right-3 absolute'>
          <p className='text-sm'>0</p>
        </div>
        </div>

        <div>
          <Link to={"/login"} className="px-3 py-1 bg-primary text-white rounded-full hover:bg-secondary">
            login
          </Link>
        </div>
       </div>

    
    </div></header>
  )
}

export default Header
