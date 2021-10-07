import React, { Dispatch, SetStateAction } from 'react'
import Input from './Input'

type props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    setUiState: Dispatch<SetStateAction<String | null>>
    resetPassword: () => Promise<void>
}

const ResetPassword: React.FC<props> = ({ onChange, setUiState, resetPassword }) => {
    return (
        <div>
            <p className='text-3xl font-black'>Reset Password</p>
            <div className='mt-10'>
                <label className='text-sm'>Confirmation Code</label>
                <Input onChange={onChange} name='authCode' type='' />
            </div>
            <div className='mt-6'>
                <label className='text-sm'>New Password</label>
                <Input onChange={onChange} name='password' type='password' />
            </div>
            <button onClick={resetPassword} className='text-white w-full mt-6 bg-blue-600 p-3 rounded'>
                Continue
            </button>
            <button onClick={() => setUiState('signIn')} className="text-sm mt-6 text-red-500">
                Cancel
            </button>
        </div>
    )
}

export default ResetPassword
