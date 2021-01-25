import { Link } from 'react-router-dom'
//Link comes in handy when you want to instantly move between pages.
const Footer = () => {
    return (
        <footer>
            <p>Copyright &copy; 2021</p>
            <Link to="/about">About</Link>
        </footer>
    )
}

export default Footer
