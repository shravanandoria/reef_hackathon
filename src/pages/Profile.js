import React from 'react'
import "../styles/profile.css"
import profileBack from '../assets/apex.jpg'
import ethindia from '../assets/ethindia.png'
import Uik from '@reef-defi/ui-kit'
import { Link } from 'react-router-dom'



const Profile = () => {
    return (
        <div>
            <div className='ImageDivBig'>
                <div className='ImageProfile'>
                <img src={profileBack} />
                </div>
            </div>
            <div className='textContainer'>
            <Uik.Text text='Darshan Petkar' type='headline' className='HeadText' />
            <Uik.Text text='Web 3 Developer' type='light'  className='descText' />
            </div>
            <div className='MainDivision'>
            <div className='socialMedia'>
                <Link>
                <Uik.Text text='Default text'/>
                </Link>
            </div>
            <div className='projectDiv'></div>
            </div>
        </div>
    )
}

export default Profile
