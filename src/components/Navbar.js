import { useState } from "react"
import "../styles/navbar.css"
import Uik from "@reef-defi/ui-kit"


export default function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [firstTab, setFirstTab] = useState("First")
  const [secondTab, setSecondTab] = useState("tokens")

  return (
    <>
      <nav className="navigation">
        <a href="/" className="brand-name">
          QuickLance
        </a>
        <button
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded)
          }} J
        >
        </button>
        <div
          className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }
        >
          <ul className={isNavExpanded ? "ListStyle" : ""}>
            <Uik.Button text='Connect Wallet' />
          </ul>
        </div>
      </nav>
    </>
  );
}