import { useState } from "react"
import "../styles/navbar.css"

export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        QuickLance
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}
      >
        {/* hamburger svg code... */}
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul className={isNavExpanded ? "ListStyle" : ""}>
          <li>
            <a href="/home">Connect Wallet</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}