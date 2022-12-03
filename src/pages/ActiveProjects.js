import React, { useEffect, useState, useContext } from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import "../styles/activeprojects.css"
import reef from '../assets/reef.png'
import ethindia from '../assets/ethindia.png'
import dapp from '../assets/dapp.png'
import Uik from '@reef-defi/ui-kit';
import ProjectFactory from "../contracts/ProjectFactory.json";
import SignerContext from "../signerContext";
import { Contract } from "ethers";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/rpc-provider";
import { Link } from 'react-router-dom';

const ActiveProjects = () => {

    const [isWalletConnected, setWalletConnected] = useState(false);
    const [signer, setSigner] = useState();
    const FactoryAbi = ProjectFactory.abi;
    const factoryContractAddress = ProjectFactory.address;
    const { signerState } = useContext(SignerContext);
    const URL = "wss://rpc-testnet.reefscan.com/ws";


    const checkExtension = async () => {
        console.log("check ex called");
        let allInjected = await web3Enable("Reef");

        if (allInjected.length === 0) {
            return false;
        }

        let injected;
        if (allInjected[0] && allInjected[0].signer) {
            injected = allInjected[0].signer;
        }

        const evmProvider = new Provider({
            provider: new WsProvider(URL),
        });

        evmProvider.api.on("ready", async () => {
            const allAccounts = await web3Accounts();

            allAccounts[0] && allAccounts[0].address && setWalletConnected(true);

            console.log(allAccounts);

            const wallet = new Signer(evmProvider, allAccounts[0].address, injected);

            // Claim default account
            if (!(await wallet.isClaimed())) {
                console.log(
                    "No claimed EVM account found -> claimed default EVM account: ",
                    await wallet.getAddress()
                );
                await wallet.claimDefaultAccount();
            }

            setSigner(wallet);
        });
    };

    const checkSigner = async () => {
        if (!signer) {
            await checkExtension();
        }
        return true;
    };

    const contract = new Contract(
        factoryContractAddress,
        FactoryAbi,
        signerState
    );

    // useEffect(() => {

    //     const projects = contract.getDeployedProjects();
    //     console.log({ projects });
    // })

    // const fetchProjects = async () =>{
    //     await checkSigner();
    // if (!signerState) return alert("Please Connect your wallet first");
    //     const projects = await contract.getDeployedProjects();
    //     console.log({ projects });
    // }


    return (
        <CardGroup className='cardDesign'>
            <Card className='cardDiv'>
                <Card.Img variant="top" src={reef} style={{ maxHeight: "320px", width: "auto" }} />
                <Card.Body>
                    <Card.Title>Integrate web3.js library in Reef Dapp</Card.Title>
                    <Card.Text>
                        Hi, We are looking for a developer to integrate web3.js library to connect to a smart contract.

                        This would be an HMTL web page requesting user payment in USDT or Reef, user will initiate payment from their wallet and coins will be transferred to the smart contract.
                    </Card.Text>
                    <Link to={"/project"} style={{textDecoration:"none"}}>
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
    )
}

export default ActiveProjects