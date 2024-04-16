import { Link, NavLink } from "react-router-dom";


const Header = () => {

    const link = 
    <>
        <NavLink to={'/'} className={({isActive}) => isActive ? 'text-red-500 underline' : 'text-white'}>Home</NavLink>
        <NavLink to={'/login'} className={({isActive}) => isActive ? 'text-red-500 underline' : 'text-white'}>Login</NavLink>
        <NavLink to={'/register'} className={({isActive}) => isActive ? 'text-red-500 underline' : 'text-white'}>Register</NavLink>
    </>
    return (
        <div className="border border-red-500">
            <div className="navbar py-6 container mx-auto px-4">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu-sm dropdown-content shadow bg-base-100 gap-4 px-10 pb-10 text-[18px] font-medium menu">
        {link}
      </ul>
    </div>
    <Link to={'/'} className="btn btn-ghost text-2xl font-bold">Authentication</Link>
  </div>
  <div className="navbar-end hidden lg:flex">
    <ul className="gap-6 menu-horizontal px-1 text-[18px] font-medium">
      {link}
    </ul>
  </div>
</div>
        </div>
    );
};

export default Header;