import Home from './components/Home'
import { Metadata } from 'next'
import { getAllLists } from './serverActions'

export const metadata: Metadata = {
    title: "Lista",
    description: "Lists App",
};

export const dynamic = 'force-dynamic'

export default async function Page() {
    const lists = await getAllLists()
    return (
        <Home initialLists={lists} />
    )
}
