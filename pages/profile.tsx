import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { CognitoUser } from '@aws-amplify/auth';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import '../amplifyConfigure'

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
    const [uiState, setUiState] = useState<String | null>(null)
    const [formState, setFormState] = useState<formState>(initialState)

    useEffect(() => {
        checkUser()
        async function checkUser() {
            const user: CognitoUser = await Auth.currentAuthenticatedUser()
            console.log({ user })
        }
    }, [])

    const onChange = e => {
        setFormState({ ...formState, [e.target.name]: e.target.value })
    }

    return (
        <div>
            {
                uiState === 'signIn' && (
                    <div>
                        <button onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}>
                            Sign In with Google
                        </button>
                        <button onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })}>
                            Sign In with Facebook
                        </button>
                        <button onClick={() => Auth.signOut()}>
                            Sign Out
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default Profile