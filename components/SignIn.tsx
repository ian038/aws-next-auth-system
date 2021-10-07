import React, { Dispatch, SetStateAction } from 'react'
import { Auth } from 'aws-amplify'
import SocialSignIn from "./SocialSignIn";

type props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setUiState: Dispatch<SetStateAction<String | null>>
}

const SignIn: React.FC<props> = ({ onChange, setUiState }) => {


    return (
        <div>
            <p className='text-3xl font-black'>Sign In</p>
            <SocialSignIn />
        </div>
    )
}

export default SignIn
