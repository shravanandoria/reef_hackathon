import { React, useState } from 'react'
import Uik from '@reef-defi/ui-kit'
import "../styles/createproject.css"
import ProjectFactory from "../contracts/ProjectFactory.json";
import { Contract } from "ethers";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/rpc-provider";


const CreateProject = () => {
    const [projectName, setProjectName] = useState("");
    const [budget, setBudget] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");

    const [signer, setSigner] = useState();
    const FactoryAbi = ProjectFactory.abi;
    const factoryContractAddress = ProjectFactory.address;
    const [isWalletConnected, setWalletConnected] = useState(false);

    const checkExtension = async () => {
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

            allAccounts[0] &&
                allAccounts[0].address &&
                setWalletConnected(true);

            console.log(allAccounts);

            const wallet = new Signer(
                evmProvider,
                allAccounts[0].address,
                injected
            );

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

    const createProject = async () => {
        await checkSigner();
        const factoryContract = new Contract(
            factoryContractAddress,
            FactoryAbi,
            signer
        );
        await factoryContract.createProject(projectName, description, file, date);
        setProjectName("");
        setBudget("");
        setDate("");
        setDescription("");
        setFile("");
    };

    return (
        <div className='mainContainer'>
            <div className='FormContainer'>
                <Uik.Form>
                    <Uik.Text className='fontCustom' text="Create Your Project Request" type="headline" />
                    <Uik.Input onChange={e => setProjectName(e.target.value)}
                        value={projectName} label='Project Name' />
                    <Uik.Container>
                        <Uik.Input onChange={e => setBudget(e.target.value)}
                            value={budget} label='Budget (In REEF)' placeholder='Eg : 10000' />
                        <Uik.Input onChange={e => setDate(e.target.value)}
                            value={date} type='date' label='Deadline' />
                    </Uik.Container>
                    <Uik.Input onChange={e => setDescription(e.target.value)}
                        value={description} label='Project Description' textarea />
                    <Uik.Input onChange={e => setFile(e.target.value)}
                        value={file} type='file' label='Related Files (optional)' />
                    <Uik.Button text='Create' fill onClick={createProject} />
                </Uik.Form>
            </div>
        </div>
    )
}

export default CreateProject