import React, { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { CognitoUserInterface } from '@aws-amplify/ui-components'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '../amplifyConfigure'

const Profile: React.FC<{}> = () => {
    const [user, setUser] = useState<CognitoUserInterface | null>(null)
    useEffect(() => {
        checkUser()
    }, [])

    async function checkUser(): Promise<void> {
        try {
            const user: CognitoUserInterface = await Auth.currentAuthenticatedUser()
            setUser(user)
        } catch(error) {
            setUser(null)
        }
    }

    if(!user) return null

    return (
        <div>
            <p>Welcome, {user.attributes.email}</p>
        </div>
    )
}

export default withAuthenticator(Profile)