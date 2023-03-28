import "../styles/Navbar.css"

export default function Navbar(){
    return <nav class="navbar">
        <a href="/" class="Title">Home</a>
        <ul>
            <li>
                <a href="/carsForRent">Rent a Car</a>
            </li>
            <li>
                <a href="/loaner-login">Loaner Login</a>
            </li>
            <li>
                <a href="/renter-login">Renter Login</a>
            </li>
        </ul>
    </nav>
    
}