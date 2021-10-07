import React, { Dispatch, SetStateAction } from 'react'
import { Auth } from 'aws-amplify'
import SocialSignIn from "./SocialSignIn";
import Input from './Input'

type props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setUiState: Dispatch<SetStateAction<String | null>>
    signUp: () => void
}

const SignUp: React.FC<props> = ({ onChange, setUiState, signUp }) => {
    return (
        <div>
            <p className='text-3xl font-black'>Sign Up</p>
            <div className='mt-10'>
                <label className='text-sm'>Email</label>
                <Input onChange={onChange} name='email' type='email' />
            </div>
            <div className='mt-4'>
                <label>Password</label>
                <Input onChange={onChange} name='email' type='password' />
            </div>
            <button onClick={signUp} className='text-white w-full mt-6 bg-blue-600 p-3 rounded'>
                Sign Up
            </button>
            <SocialSignIn />
            <p className="mt-12 text-sm font-light">
                Already have an account?
                <span
                onClick={() => setUiState('signIn')}
                role="button"
                className="cursor-pointer text-blue-600"> Sign In</span>
            </p>
        </div>
    )
}

export default SignUp
