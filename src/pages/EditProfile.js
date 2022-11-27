import { React, useState } from 'react'
import Uik from '@reef-defi/ui-kit'
import "../styles/createproject.css"

const EditProfile = () => {
    const [isOpen, setOpen] = useState(false)
    return (
        <div className='mainContainer'>
            <div className='FormContainer'>
                <Uik.Form>
                    <Uik.Text className='fontCustom' text="Edit Profile" type="headline" />
                    <Uik.Container>
                        <Uik.Input label='First Name' />
                        <Uik.Input label='Last Name' />
                    </Uik.Container>
                    <Uik.Input label='Short Description' textarea />
                    <Uik.Input label='Twitter URL' />
                    <Uik.Input label='Website URL' />
                    <Uik.Input label='Linkedin URL' />
                    <Uik.Button text='Edit' fill />
                </Uik.Form>
            </div>
        </div>
    )
}

export default EditProfile