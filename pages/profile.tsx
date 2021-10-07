import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { CognitoUserInterface } from '@aws-amplify/ui-components'
import '../amplifyConfigure'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import ForgotPassword from '../components/ForgotPassword'
import ResetPassword from '../components/ResetPassword'
import ConfirmSignUp from '../components/ConfirmSignUp'

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
        <div className='bg-gray-50 min-h-screen'>
            <div className='flex flex-col items-center'>
                <div className='max-w-full sm:w-540 mt-14'>
                    <div className='bg-white py-14 px-16 shadow-form rounded'>
                        {
                            uiState === 'signUp' && (
                                <SignUp onChange={onChange} setUiState={setUiState} />
                            )
                        }
                        {
                            uiState === 'confirmSignUp' && (
                                <ConfirmSignUp onChange={onChange} setUiState={setUiState} />
                            )
                        }
                        {
                            uiState === 'signIn' && (
                                <SignIn onChange={onChange} setUiState={setUiState} />
                            )
                        }
                        {
                            uiState === 'signedIn' && (
                                <div>
                                    <p className='text-xl'>Welcome, {user.attributes.email}</p>
                                    <button 
                                    className='text-white w-full mt-10 bg-red-600 p-3 rounded' 
                                    onClick={() => { Auth.signOut(); setUiState('signIn'); setUser(null) }}>
                                        Sign Out
                                    </button>
                                </div>
                            )
                        }
                        {
                            uiState === 'forgotPassword' && (
                                <ForgotPassword onChange={onChange} setUiState={setUiState} />
                            )
                        }
                        {
                            uiState === 'resetPassword' && (
                                <ResetPassword onChange={onChange} setUiState={setUiState} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile