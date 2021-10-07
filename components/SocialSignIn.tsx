import React from 'react'
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Auth } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';

const SocialSignIn: React.FC<{}> = () => {
    return (
        <div className='flex flex-col'>
            <button 
            className='mt-10 focus:outlined-none'
            onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}
            >
                <div className='flex border border-gray-300 p-2 rounded-full items-center justify-center'>
                    <FaGoogle size='38' className='text-red-500' />
                    <p>Sign In with Google</p>
                </div>
            </button>
            <button 
            className='mt-4 focus:outlined-none'
            onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook })}
            >
                <div className='flex border border-gray-300 p-2 rounded-full items-center justify-center'>
                    <FaFacebook size='38' className='text-blue-500' />
                    <p>Sign In with Facebook</p>
                </div>
            </button>
        </div>
    )
}

export default SocialSignIn
