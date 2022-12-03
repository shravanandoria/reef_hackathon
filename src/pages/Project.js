import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Uik from '@reef-defi/ui-kit'
import "../styles/project.css";
import ethindia from '../assets/ethindia.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";


import "swiper/swiper-bundle.min.css";
// import "swiper/swiper-bundle.min.css/free-mode";
// import "swiper/swiper-bundle.min.css/pagination";

import { FreeMode, Pagination } from "swiper";
const Project = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Uik.Card title='' condensed>
        <div className='divDesign'>
          <div className='divTextArea'>
            <Uik.Text
              className="fontCustom"
              text="Integrate web3.js library in Reef Dapp"
              type="headline"
            />

            <div className='labelDiv'>
              <div style={{ marginRight: "20px" }}>
                <Uik.Label text='Published On' className='labelText' />
                <Uik.Tag color="purple" text="25 November, 2022" />
              </div>
              <div>
                <Uik.Label text='Project Deadline' className='labelText' />
                <Uik.Tag color="yellow" text="21 November, 2022" />
              </div>
            </div>

            <div className='userProfile'>
            <Uik.Label text='Requested By' className='userText' />
            <Link to={"/profile"} style={{textDecoration:"none"}}>
              <Uik.Avatar
                name="Darshan Petkar"
                image={ethindia}
                className="avatarTest"
              />
            </Link>
            </div>

            <Uik.Text
              className="title titleProject"
              text="Hi, We are looking for a developer to integrate web3.js library to connect to a smart contract. This would be an HMTL web page requesting user payment in USDT or Reef, user will initiate payment from their wallet and coins will be transferred to the smart contract."
              type="title"
            />
          </div>

          <div className='ImageDivHero'>
            <img src={ethindia} className='heroImgMain' />
          </div>
        </div>
        <div className='btndiv'>
          <Uik.Button text='Apply' success className='applyBtn' />
          <Uik.Tooltip text='Coming Soon..' position='right'>
            {!show && <Button onClick={() => setShow(true)} className='applyBtn'>See Alert</Button>}
            <Uik.Button text='Chat' />
          </Uik.Tooltip>
        </div>

        <Alert show={show} variant="success">
          <Alert.Heading>Important Alert !</Alert.Heading>
          <p>
            Please make a reliable request for the project, the requester of this project will definitely select the best deal :
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Close
            </Button>
          </div>
        </Alert>


        <Uik.Text className='textDivProj' text='Other Related Images' />
        <div className='ImageDiv'>
          <Swiper
            // slidesPerView={3}
            spaceBetween={10}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              700: {
                slidesPerView: 2,
              },
              1050: {
                slidesPerView: 3,
              },
              1400: {
                slidesPerView: 4,
              },
            }}
            modules={[FreeMode, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide> <img src={ethindia} className='heroImg' /></SwiperSlide>
            <SwiperSlide> <img src={ethindia} className='heroImg' /></SwiperSlide>
            <SwiperSlide> <img src={ethindia} className='heroImg' /></SwiperSlide>
            <SwiperSlide> <img src={ethindia} className='heroImg' /></SwiperSlide>
            <SwiperSlide> <img src={ethindia} className='heroImg' /></SwiperSlide>
            <SwiperSlide> <img src={ethindia} className='heroImg' /></SwiperSlide>
            <SwiperSlide> <img src={ethindia} className='heroImg' /></SwiperSlide>
          </Swiper>
        </div>

      </Uik.Card>
    </>
  )
}

export default Project
