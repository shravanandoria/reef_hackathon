import React, { useEffect, useState, useContext } from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import reef from '../assets/reef.png'
import Uik from '@reef-defi/ui-kit';
import ProjectFactory from "../contracts/ProjectFactory.json";
import SignerContext from "../signerContext";
import { Contract } from "ethers";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/rpc-provider";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import "../styles/activeprojects.css"

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
        <div className='cardDesign'>
            <Card style={{ margin: "15px 40px", maxWidth: "400px" }}>
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
            <Card style={{ margin: "15px 40px", maxWidth: "400px" }}>
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
            <Card style={{ margin: "15px 40px", maxWidth: "400px" }}>
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
            <Card style={{ margin: "15px 40px", maxWidth: "400px" }}>
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
        </div>
    )
}

export default ActiveProjects