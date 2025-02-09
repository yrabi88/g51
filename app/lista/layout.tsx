import Col from '@/app/components/layout/Col';
import { PropsWithChildren } from 'react';

export default async function Layout({ children }: PropsWithChildren) {
    return (
        <Col className="p-7 gap-10 bg-gray-100 text-gray-600 h-screen">
            { children }
        </Col>
    )
}
