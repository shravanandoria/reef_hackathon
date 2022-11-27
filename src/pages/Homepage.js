import React from 'react'
import "../styles/homepage.css"
import HeroSvg from "../assets/hero.svg"
import Uik from '@reef-defi/ui-kit'

const Homepage = () => {
  return (
    <div className='heroContainer'>
      <div>
        <Uik.Text text="Find The Best Work For You!" type="headline" />
        <Uik.Text text="Request | Work | Earn" type="headline" />
        <Uik.Text className='normalText' text="Choose your direction and let's start!!" type="light" />
        <div className='ButtonContainer'>
          <Uik.Button className='btn1' text='Quick Project' fill />
          <Uik.Button text='Get Started' success />
        </div>
      </div>
      <div>
        <img src={HeroSvg} />
      </div>
    </div>
  )
}

export default Homepage