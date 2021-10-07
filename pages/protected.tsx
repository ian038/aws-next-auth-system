import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Auth } from 'aws-amplify'
import { CognitoUserInterface } from '@aws-amplify/ui-components'

const Protected: React.FC<{}> = () => {
    const [user, setUser] = useState<CognitoUserInterface | null>(null)
    const router = useRouter()

    useEffect(() => {
        checkUser()
    }, [])

    async function checkUser(): Promise<void> {
        try {
            const user: CognitoUserInterface = await Auth.currentAuthenticatedUser()
            setUser(user)
        } catch(error) {
            setUser(null)
            router.push('/profile')
        }
    }

    if(!user) return null

    return (
        <div>
            <p>Protected</p>
        </div>
    )
}

export default Protected