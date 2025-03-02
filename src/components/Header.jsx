import { NavLink, Link } from 'react-router-dom'

import projectLogo from '/assets/passmapper.png'

import { COLOR_ACCENT } from '../utils/constants'

export default function Header() {
    const activeStyles = {
        color: COLOR_ACCENT,
        backgroundColor: 'transparent',
        outline: '0'
    }

    function getActiveStyles({isActive}) {
        return isActive ? activeStyles : null
    }

    return (
    <header>
        <div className='logo-container'>
            <Link to="/" className='logo-link'>
                <img src={projectLogo} className="logo" alt="Pass logo" />
                <span>Transit card collection tracker</span>
            </Link>
        </div>
        <div className='nav-container'>
            <NavLink to="/" style={getActiveStyles}>Map</NavLink>
            <NavLink to="/stats" style={getActiveStyles}>Stats</NavLink>
            <NavLink to="/about" style={getActiveStyles}>About</NavLink>
        </div>
        <div className='nav-todo'></div>
    </header>
    );
}