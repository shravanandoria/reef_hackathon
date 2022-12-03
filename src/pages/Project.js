import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Uik from '@reef-defi/ui-kit'
import "../styles/project.css";


const Project = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Uik.Card title='Project Information' condensed>


        <Uik.Text
          className="fontCustom"
          text="Integrate web3.js library in Reef Dapp"
          type="headline"
        />
        <div className='labelDiv'>
          <div style={{marginRight:"20px"}}>
            <Uik.Label text='Published On' className='labelText'/>
            <Uik.Tag color="purple" text="25 November, 2022" />
          </div>
          <div>
            <Uik.Label text='Deadline At'  className='labelText' />
            <Uik.Tag color="yellow" text="21 November, 2022"/>
          </div>
        </div>

        <Uik.Text
          className="title"
          text="Hi, We are looking for a developer to integrate web3.js library to connect to a smart contract. This would be an HMTL web page requesting user payment in USDT or Reef, user will initiate payment from their wallet and coins will be transferred to the smart contract."
          type="title"
        />

        {/* <Uik.Button text='Apply' fill/> */}
        <div className='btndiv'>

          <Uik.Button text='Apply' success className='applyBtn' />
          <Uik.Tooltip text='Coming Soon..' position='right'>
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

        {!show && <Button onClick={() => setShow(true)}>See Alert</Button>}
      </Uik.Card>
    </>
  )
}

export default Project
