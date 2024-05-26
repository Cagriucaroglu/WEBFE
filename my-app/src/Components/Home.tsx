import React from 'react'
import { NavLink } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <div>
      <header className="WelcomePage-header">
        <div className="loginstudent mainpagebtn">
          <NavLink to="/Login" className="navLoginstudent navwords">Kullanıcı girişi yap</NavLink>  
        </div>
        <div className='logincoach mainpagebtn'>
          <NavLink to="/Signup" className="navLogincoach navwords">Kayıt ol</NavLink>
        </div>
        {/* <div className='loginadmin mainpagebtn'>
          <NavLink to="/LoginAdmin" className="navAdmin navwords">Admin</NavLink>
        </div>
        <div className='signup mainpagebtn'>
          <NavLink to="/SignUp" className="navSignUp navwords">Kayıt ol</NavLink>
        </div> */}
      </header>
    </div>
  )
}
