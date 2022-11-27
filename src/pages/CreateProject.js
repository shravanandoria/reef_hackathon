import { React, useState } from 'react'
import Uik from '@reef-defi/ui-kit'
import "../styles/createproject.css"

const CreateProject = () => {
    const [isOpen, setOpen] = useState(false)
    return (
        <div className='mainContainer'>
            <div className='FormContainer'>
                <Uik.Form>
                    <Uik.Text className='fontCustom' text="Create Your Project Request" type="headline" />
                    <Uik.Input label='Project Name' />
                    <Uik.Container>
                        <Uik.Input label='Budget (In REEF)' placeholder='Eg : 10000' />
                        <Uik.Input label='Deadline' />
                    </Uik.Container>
                    <Uik.Input label='Project Description' textarea />
                    <Uik.Button text='Create' fill />
                    <Uik.Modal
                        title='Title'
                        isOpen={isOpen}
                        onClose={() => setOpen(false)}
                        onOpened={() => { }}
                        onClosed={() => { }}
                        footer={
                            <>
                                <Uik.Button text='Close' onClick={() => setOpen(false)} />
                                <Uik.Button text='Confirm' fill onClick={() => setOpen(false)} />
                            </>
                        }
                    >
                        <Uik.Text>Place modal content here ...</Uik.Text>
                    </Uik.Modal>
                </Uik.Form>
            </div>
        </div>
    )
}

export default CreateProject