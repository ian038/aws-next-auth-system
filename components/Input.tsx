import React from 'react'

type props = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    name: string
    type: string
}

const Input: React.FC<props> = (props) => {
    return (
        <input 
        {...props}
        className='outline-none border-gray-300 border rounded p-2 mt-3 w-full focus:shadow-inputfocus focus:border-white'
        />
    )
}

export default Input
