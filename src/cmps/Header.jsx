import Logo from '../assets/img/logo.jpg';
import { NavLink } from 'react-router-dom';

export function Header() {
    return (
        <header className="flex justify-between header">
            <NavLink to="/"><img src={Logo} height="40px" /></NavLink>
            <nav className="links">
                <NavLink to="/editor">Editor</NavLink>
                <NavLink to="/templates">Templates</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
        </header>
    )
}