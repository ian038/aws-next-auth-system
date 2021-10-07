import React, { Dispatch, SetStateAction } from 'react'
import { Auth } from 'aws-amplify'
import Input from './Input'

type props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setUiState: Dispatch<SetStateAction<String | null>>
    confirmSignUp: () => void
}

const SignUp: React.FC<props> = ({ onChange, setUiState, confirmSignUp }) => {
    return (
        <div>
            <p className='text-3xl font-black'>Confirm your account</p>
            <div className='mt-10'>
                <label className='text-sm'>Confirmation Code</label>
                <Input onChange={onChange} name='authCode' type='' />
            </div>
            <button onClick={confirmSignUp} className='text-white w-full mt-6 bg-blue-600 p-3 rounded'>
                Continue
            </button>
            <button onClick={() => setUiState('signIn')} className="text-sm mt-6 text-red-500">
                Cancel
            </button>
        </div>
    )
}

export default SignUp
