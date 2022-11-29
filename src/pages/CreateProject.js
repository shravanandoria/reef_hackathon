import { React, useState } from 'react'
import Uik from '@reef-defi/ui-kit'
import "../styles/createproject.css"
import ProjectFactory from "../contracts/ProjectFactory.json";
import { Contract } from "ethers";


const CreateProject = () => {
    const [isWalletConnected, setWalletConnected] = useState(false);
    const [signer, setSigner] = useState();
    const FactoryAbi = ProjectFactory.abi;
    const factoryContractAddress = ProjectFactory.address;

    const createProject = async () => {
    };

    return (
        <div className='mainContainer'>
            <div className='FormContainer'>
                <Uik.Form>
                    <Uik.Text className='fontCustom' text="Create Your Project Request" type="headline" />
                    <Uik.Input label='Project Name' />
                    <Uik.Container>
                        <Uik.Input label='Budget (In REEF)' placeholder='Eg : 10000' />
                        <Uik.Input type='date' label='Deadline' />
                    </Uik.Container>
                    <Uik.Input label='Project Description' textarea />
                    <Uik.Input type='file' label='Related Files (optional)' />
                    <Uik.Button text='Create' fill onClick={createProject} />
                </Uik.Form>
            </div>
        </div>
    )
}

export default CreateProject