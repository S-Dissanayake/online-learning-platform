import React, { useState } from 'react'
import './Navbar.css'
import { Link, NavLink } from 'react-router-dom'
import Button from '@mui/material/Button'
import logo from '../Assets/nav-logo.png'
import login from '../Assets/nav-login.png'

import { useRouter } from '../../routes/hooks/use-router'

const Navbar = () => {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogedin, setIsLogedin] = useState(false);

  const loginOnclickHandler = () => {
    router.push('/login');
  }

  return (
    <nav className='nav'>
      <Link to='/' style={{ textDecoration: 'none' }} className="nav-logo">
        <img src={logo} alt="logo" height={'50px'}/>
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : "default-nav"}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/courses">Courses</NavLink>
        </li>
        <li>
          <NavLink to="/aboutus">About Us</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
      <div className="nav-login">
        <img src={login} alt="login" height={'35px'} onClick={()=> {loginOnclickHandler()}}/>
      </div>
    </nav>
  )
}

export default Navbar
