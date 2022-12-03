import { React, useState } from 'react'
import "../styles/profile.css"
import profileBack from '../assets/apex.jpg'
import ethindia from '../assets/ethindia.png'
import Uik from '@reef-defi/ui-kit'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import reef from '../assets/reef.png'
import dapp from '../assets/dapp.png'


const Profile = () => {
    const [firstTab, setFirstTab] = useState("First")
    return (
        <div>
            <div className='ImageDivBig'>
                <div className='ImageProfile'>
                    <img src={profileBack} />
                </div>
            </div>
            <div className='textContainer'>
                <Uik.Text text='Darshan Petkar' type='title' className='HeadText' />
                <Uik.Text text='Web 3 Developer' type='light' className='descText' />
            </div>
            <div className='MainDivision'>
                <div className='projectDiv'>
                    <div className='TabsDiv'>
                        <Uik.Tabs
                            value={firstTab}
                            onChange={value => setFirstTab(value)}
                            options={["Requested Projects", "Completed Requests"]}
                        />
                    </div>
                    <CardGroup className='cardDesign'>
                        <Card className='cardDiv'>
                            <Card.Img variant="top" src={reef} style={{ maxHeight: "320px", width: "auto" }} />
                            <Card.Body>
                                <Card.Title>Integrate web3.js library in Reef Dapp</Card.Title>
                                <Card.Text>
                                    Hi, We are looking for a developer to integrate web3.js library to connect to a smart contract.

                                    This would be an HMTL web page requesting user payment in USDT or Reef, user will initiate payment from their wallet and coins will be transferred to the smart contract.
                                </Card.Text>
                                <Link to={"/project"} style={{ textDecoration: "none" }}>
                                    <Uik.Button
                                        fill
                                        text='View Project'
                                        size='large'
                                    />
                                </Link>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Project Request on 25 November, 2022</small>
                            </Card.Footer>
                        </Card>
                        <Card className='cardDiv'>
                            <Card.Img variant="top" src={ethindia} style={{ maxHeight: "320px", width: "auto" }} />
                            <Card.Body>
                                <Card.Title>ETH India Website</Card.Title>
                                <Card.Text>
                                    Want to create official website for ETH india event | Need a freelancer with good experience
                                </Card.Text>
                                <Uik.Button
                                    fill
                                    text='View Project'
                                    size='large'
                                    onClick={() => Uik.notify.info('Viewing project page is currently disabled')}
                                />
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Project Request on 24 November, 2022</small>
                            </Card.Footer>
                        </Card>
                        <Card className='cardDiv'>
                            <Card.Img variant="top" src={dapp} style={{ maxHeight: "320px", width: "auto" }} />
                            <Card.Body>
                                <Card.Title>Crypto Exchange Website</Card.Title>
                                <Card.Text>
                                    Hello, we are a low-budget startup We want to create a  USDT to USD (FIAT) exchange for the local market. The website should be written in React/Next.js (front)
                                    The idea is simple, we need a landing page where the course will be calculated easily ( USD- GEL course)
                                </Card.Text>
                                <Uik.Button
                                    fill
                                    text='View Project'
                                    size='large'
                                    onClick={() => Uik.notify.info('Viewing project page is currently disabled')}
                                />
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Project Request on 26 November, 2022</small>
                            </Card.Footer>
                        </Card>
                    </CardGroup>
                </div>
            </div>
        </div>
    )
}

export default Profile
