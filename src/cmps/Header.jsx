import Logo from '../assets/img/logo.jpg';
import { NavLink } from 'react-router-dom';

export function Header() {
    return (
        <header className="header flex align-center justify-between">
            <NavLink to="/">
                <img src={Logo} height="40px" />
            </NavLink>
            <nav className="links flex">
                <div className="link flex align-center">
                    <NavLink to="/editor">Editor</NavLink>
                </div>
                <div className="link flex align-center">
                    <NavLink to="/templates">Templates</NavLink>
                </div>
                <div className="link flex align-center">
                    <NavLink to="/about">About</NavLink>
                </div>
            </nav>
        </header>
    )
}