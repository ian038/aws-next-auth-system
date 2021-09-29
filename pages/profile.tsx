import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { CognitoUser } from '@aws-amplify/auth';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import '../amplifyConfigure'

const Profile: React.FC<{}> = () => {
    useEffect(() => {
        checkUser()
        async function checkUser() {
            const user: CognitoUser = await Auth.currentAuthenticatedUser()
            console.log({ user })
        }
    }, [])

    return (
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

export default Profile