import { Link } from "react-router-dom"

export default function Navbar() {
    return <nav className="nav">
        <Link to="/" className="site-title">Home</Link>
        <ul>
            <CustomLinks to="/upload">Upload</CustomLinks>
            <CustomLinks to="/report">Report</CustomLinks>
            <CustomLinks to="/filter_id">Filter ID</CustomLinks>
            <CustomLinks to="/filter_time">Filter Time</CustomLinks>
        </ul>
    </nav >
}
function CustomLinks({ to, children, ...props }) {
    const path = window.location.pathname
    return (
        <li className={path === to ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )

}