import React, { Dispatch, SetStateAction } from 'react'
import SocialSignIn from "./SocialSignIn";
import Input from './Input'

type props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setUiState: Dispatch<SetStateAction<String | null>>
    signIn: () => Promise<void>
}

const SignIn: React.FC<props> = ({ onChange, setUiState, signIn }) => {


    return (
        <div>
            <p className='text-3xl font-black'>Sign In</p>
            <div className='mt-10'>
                <label className='text-sm'>Username</label>
                <Input onChange={onChange} name='username' type='text' />
            </div>
            <div className='mt-4'>
                <label>Password</label>
                <span
                onClick={() => setUiState('forgotPassword')}
                className="cursor-pointer text-sm ml-8 sm:ml-44 text-blue-500"
                >Forgot your password?</span>
                <Input onChange={onChange} name='email' type='password' />
            </div>
            <button onClick={signIn} className='text-white w-full mt-6 bg-blue-600 p-3 rounded'>
                Sign In
            </button>
            <SocialSignIn />
            <p className="mt-12 text-sm font-light">
                Don&apos;t have an account?
                <span
                onClick={() => setUiState('signUp')}
                role="button"
                className="cursor-pointer text-blue-600"> Sign Up</span>
            </p>
        </div>
    )
}

export default SignIn
