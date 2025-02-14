import Col from '@/app/components/layout/Col';
import { PropsWithChildren } from 'react';
import ProtectedServer from '../auth/ProtectedServer';

async function Layout({ children }: PropsWithChildren) {
    return (
        <Col className="p-7 gap-10 bg-gray-100 text-gray-600 h-screen">
            { children }
        </Col>
    )
}

export default async function ProtectedLayout(props: PropsWithChildren) {
    return (
        <ProtectedServer render={ () => <Layout {...props}/> } />
    )
}
