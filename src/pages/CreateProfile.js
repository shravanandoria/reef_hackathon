import { React, useState } from 'react'
import Uik from '@reef-defi/ui-kit'
import "../styles/createproject.css"

const CreateProfile = () => {
    const [isOpen, setOpen] = useState(false)
    return (
        <div className='mainContainer'>
            <div className='FormContainer'>
                <Uik.Form>
                    <Uik.Text className='fontCustom' text="Create Profile" type="headline" />
                    <Uik.Container>
                        <Uik.Input label='First Name' />
                        <Uik.Input label='Last Name' />
                    </Uik.Container>
                    <Uik.Input label='Username' />
                    <Uik.Input type='file' label='Profile Image' />
                    <Uik.Input label='Email' />
                    {/* <Uik.Input label='Short Description' textarea /> */}
                    <Uik.Button text='Create' fill />
                </Uik.Form>
            </div>
        </div>
    )
}

export default CreateProfile