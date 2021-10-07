import React, { Dispatch, SetStateAction } from 'react'
import { Auth } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';

type props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setUiState: Dispatch<SetStateAction<String | null>>
}

const SignIn: React.FC<props> = ({ onChange, setUiState }) => {
    return (
        <div>
            <button onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}>
                Sign In with Google
            </button>
            <button onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })}>
                Sign In with Facebook
            </button>
        </div>
    )
}

export default SignIn
