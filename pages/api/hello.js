import { withSSRContext } from 'aws-amplify'
import '../../amplifyConfigure'

export default async function handler(req, res) {
  const { Auth } = withSSRContext({ req })
  try {
    const user = await Auth.currentAuthenticatedUser()
    res.status(200).json({ name: user })
  } catch(error) {
    res.status(400).json({ error })
  }
}
