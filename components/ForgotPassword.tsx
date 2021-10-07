import React, { Dispatch, SetStateAction } from 'react'
import Input from './Input'

type props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setUiState: Dispatch<SetStateAction<String | null>>
    forgotPassword: () => Promise<void>
}

const ForgotPassword: React.FC<props> = ({ onChange, setUiState, forgotPassword }) => {
    return (
        <div>
            <p className='text-3xl font-black'>Forgot Password?</p>
            <div className='mt-10'>
                <label className='text-sm'>Email</label>
                <Input onChange={onChange} name='email' type='email' />
            </div>
            <button onClick={forgotPassword} className='text-white w-full mt-6 bg-blue-600 p-3 rounded'>
                Reset Password
            </button>
            <button onClick={() => setUiState('signIn')} className="text-sm mt-6 text-red-500">
                Cancel
            </button>
        </div>
    )
}

export default ForgotPassword
