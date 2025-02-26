import { NavLink } from 'react-router-dom'

export default function Footer() {
    return (
    <footer>
        <div className='footer-nav-container'>
            <span>PassMapper</span>
            <NavLink to="/about">About</NavLink>
        </div>
    </footer>
    );
}