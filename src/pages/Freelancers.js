import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Uik from '@reef-defi/ui-kit';
import apeximg from '../assets/apex.jpg'
import bgmi from '../assets/bgmi.jpg'
import suchit from '../assets/suchit.jpg'
import darshan from '../assets/darshan.jpg'
import ani from '../assets/ani.jpg'
import shravan from '../assets/shravan.jpg'
import "../styles/freelancers.css"


const Freelancers = () => {
    return (
        <div className='freelancersDiv'>
            <div className='titleDiv'>
                <Uik.Text text="Freelancers" type="headline" />
            </div>
            <div className='cardsDiv'>
                <Card style={{ width: '18rem', marginRight: '40px' }}>
                    <Card.Img variant="top" src={apeximg} />
                    <Uik.Avatar
                        image={ani}
                        size="extra-large"
                        className='profileStyle'
                    />
                    <Card.Body className='cardBody'>
                        <Card.Title>Aniruddha</Card.Title>
                        <Card.Text>
                            I am a Freelancer with 5 years+ experience in programming, Currently building web3 dapps
                        </Card.Text>
                        <Uik.Button
                            fill
                            text='View Profile'
                            size='large'
                            onClick={() => Uik.notify.info('Viewing profile is currently disabled')}
                        />
                    </Card.Body>
                </Card>

                <Card style={{ width: '18rem', marginRight: '40px' }}>
                    <Card.Img variant="top" src={bgmi} />
                    <Uik.Avatar
                        image={shravan}
                        size="extra-large"
                        className='profileStyle'
                    />
                    <Card.Body className='cardBody'>
                        <Card.Title>Shravan</Card.Title>
                        <Card.Text>
                            I work in web3 and live in web3, A proffesional smart contract developer
                        </Card.Text>
                        <Uik.Button
                            fill
                            text='View Profile'
                            size='large'
                            onClick={() => Uik.notify.info('Viewing profile is currently disabled')}
                        />
                    </Card.Body>
                </Card>

                <Card style={{ width: '18rem', marginRight: '40px' }}>
                    <Card.Img variant="top" src={darshan} />
                    <Uik.Avatar
                        image={darshan}
                        size="extra-large"
                        className='profileStyle'
                    />
                    <Card.Body className='cardBody'>
                        <Card.Title>Darshan</Card.Title>
                        <Card.Text>
                            Frontend developer and freelancer | web2 developer and cricketer
                        </Card.Text>
                        <Uik.Button
                            fill
                            text='View Profile'
                            size='large'
                            onClick={() => Uik.notify.info('Viewing profile is currently disabled')}
                        />
                    </Card.Body>
                </Card>

                <Card style={{ width: '18rem', marginRight: '40px' }}>
                    <Card.Img variant="top" src={suchit} />
                    <Uik.Avatar
                        image={suchit}
                        size="extra-large"
                        className='profileStyle'
                    />
                    <Card.Body className='cardBody'>
                        <Card.Title>Suchit</Card.Title>
                        <Card.Text>
                            Backend developer | working on mobile apps and web applications
                        </Card.Text>
                        <Uik.Button
                            fill
                            text='View Profile'
                            size='large'
                            onClick={() => Uik.notify.info('Viewing profile is currently disabled')}
                        />
                    </Card.Body>
                </Card>
            </div>
        </div >
    )
}

export default Freelancers