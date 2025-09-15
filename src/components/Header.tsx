import { NavLink, Link } from 'react-router-dom'

import { Logo } from './Logo'
import { useTheme } from './ThemeContext'
import DarkModeToggle from './DarkModeToggle'
import { useNavigationData } from './NavigationContext'

export default function Header() {
    const { colors } = useTheme()
    const { isMobile } = useNavigationData()

    const activeStyles = {
        color: colors.accent,
        backgroundColor: 'transparent',
        outline: '0'
    }

    function getActiveStyles({ isActive }: { isActive: boolean }) {
        return isActive ? activeStyles : {}
    }

    return (
        <header>
            <div className='logo-container'>
                <Link to="/" className='logo-link'>
                    <Logo fill="var(--color-accent)" className="logo" />
                    <span>Transit card collection tracker</span>
                </Link>
            </div>
            <div className='nav-container'>
                <NavLink to="/" style={getActiveStyles}>Map</NavLink>
                <NavLink to="/stats" style={getActiveStyles}>Stats</NavLink>
                <NavLink to="/about" style={getActiveStyles}>About</NavLink>
            </div>
            {!isMobile && <div className='nav-more-options'>
                {/* <DarkModeToggle /> */}
            </div>}
        </header>
    );
}