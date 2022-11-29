import React from 'react'
import "../styles/homepage.css"
import HeroSvg from "../assets/hero.svg"
import Uik from '@reef-defi/ui-kit'
import Nav from "react-bootstrap/Nav";


const Homepage = () => {
  const openPage = () => {
    console.log("check")
  }
  return (
    <div className='heroContainer'>
      <div>
        <Uik.Text text="Find The Best Work For You!" type="headline" />
        <Uik.Text text="Request | Work | Earn" type="headline" />
        <Uik.Text className='normalText' text="Choose your direction and let's start!!" type="light" />
        <div className='ButtonContainer'>
          <Nav.Link href={"/createproject"}>
            <Uik.Button className='btn1' text='Quick Project' fill />
          </Nav.Link>
          <Nav.Link href={"/gettingstarted"}>
            <Uik.Button text='Get Started' success />
          </Nav.Link>
        </div>
      </div>
      <div>
        <img src={HeroSvg} className='heroImg' />
      </div>
    </div >
  )
}

export default Homepage