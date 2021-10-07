import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { CognitoUserInterface } from '@aws-amplify/ui-components'
import '../amplifyConfigure'
import SignIn from '../components/SignIn'

type formState = {
    email: String,
    password: String,
    authCode: String
}

const initialState: formState = {
    email: '',
    password: '',
    authCode: ''
}

const Profile: React.FC<{}> = () => {
    const [uiState, setUiState] = useState<String | null>('signIn')
    const [formState, setFormState] = useState<formState>(initialState)
    const [user, setUser] = useState<CognitoUserInterface | null>(null)

    useEffect(() => {
        checkUser()
        async function checkUser() {
            try {
                const user: CognitoUserInterface = await Auth.currentAuthenticatedUser()
                setUser(user)
                setUiState('signedIn')
            } catch(error) {
                setUiState('signIn')
                setUser(null)
            }
        }
    }, [])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    return (
        <div>
            {
                uiState === 'signIn' && (
                    <SignIn onChange={onChange} setUiState={setUiState} />
                )
            }
            {
                uiState === 'signedIn' && (
                    <div>
                        <p className='text-xl'>Welcome {user.username}</p>
                        <button 
                        className='text-white w-full mt-10 bg-red-600 p-3 rounded' 
                        onClick={() => { Auth.signOut(); setUiState('signIn'); setUser(null) }}>
                            Sign Out
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default Profile