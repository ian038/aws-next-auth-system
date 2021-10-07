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
    username: string
    email: string
    password: string
    authCode: string
}

const initialState: formState = {
    username: '',
    email: '',
    password: '',
    authCode: ''
}

const Profile: React.FC<{}> = () => {
    const [uiState, setUiState] = useState<String | null>('')
    const [formState, setFormState] = useState<formState>(initialState)
    const [user, setUser] = useState<CognitoUserInterface | null>(null)
    const { username, email, password, authCode } = formState

    useEffect(() => {
        checkUser()
    }, [])

    async function checkUser(): Promise<void> {
        try {
            const user: CognitoUserInterface = await Auth.currentAuthenticatedUser()
            setUser(user)
            setUiState('signedIn')
        } catch(error) {
            setUiState('signIn')
            setUser(null)
        }
    }

    const signUp: () => Promise<void> = async () => {
        try {
            await Auth.signUp({ username, password, attributes: { email } })
            setUiState('confirmSignUp')
        } catch(error) {
            console.log('Sign up', error)
        }
    }

    const confirmSignUp: () => Promise<void> = async () => {
        try {
            await Auth.confirmSignUp(username, authCode)
            signIn()
            setUiState('signedIn')
        } catch(error) {
            console.log('Confirm sign up', error)
        }
    }

    const signIn: () => Promise<void> = async () => {
        try {
            await Auth.signIn(username, password)
            setUiState('signedIn')
            checkUser()
        } catch(error) {
            console.log('Sign in', error)
        }
    }

    const forgotPassword = async () => {
        try {

        } catch(error) {
            console.log('Forgot password', error)
        }
    }

    const resetPassword = async () => {
        try {

        } catch(error) {
            console.log('Reset password', error)
        }
    }

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
                                <SignUp onChange={onChange} setUiState={setUiState} signUp={signUp} />
                            )
                        }
                        {
                            uiState === 'confirmSignUp' && (
                                <ConfirmSignUp onChange={onChange} setUiState={setUiState} confirmSignUp={confirmSignUp} />
                            )
                        }
                        {
                            uiState === 'signIn' && (
                                <SignIn onChange={onChange} setUiState={setUiState} signIn={signIn} />
                            )
                        }
                        {
                            uiState === 'signedIn' && (
                                <div>
                                    <p className='text-xl'>Welcome, {user?.attributes?.email}</p>
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
                                <ForgotPassword onChange={onChange} setUiState={setUiState} forgotPassword={forgotPassword} />
                            )
                        }
                        {
                            uiState === 'resetPassword' && (
                                <ResetPassword onChange={onChange} setUiState={setUiState} resetPassword={resetPassword} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile