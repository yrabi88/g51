import Home from './components/Home'
import { Metadata } from 'next'
import { getAllLists } from './serverActions'
import { auth0 } from '../auth/auth0'

export const metadata: Metadata = {
    title: "Lista",
    description: "Lists App",
};

export const dynamic = 'force-dynamic'

export default async function Page() {
    
    // todo: better design
    const session = await auth0.getSession();
    console.log('all lists page', {session})
    const email = session?.user.email
    if (!email) {
        throw Error('Missing user email')
    }

    const lists = await getAllLists(email)
    return (
        <Home initialLists={lists} />
    )
}
