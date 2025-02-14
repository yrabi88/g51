import { SessionData } from '@auth0/nextjs-auth0/types'
import { auth0 } from './auth0'
import LoginSection from './LoginSection'
import { ReactNode } from 'react'
import Col from '@/app/components/layout/Col'
import Row from '@/app/components/layout/Row'
import Button from '@/app/components/basic/button/Button'
import { authRoutes } from './common'

interface Props {
    render: (session: SessionData) => ReactNode
}

export default async function ProtectedServer({ render }: Props) {
    const session = await auth0.getSession()
    if (!session) return <LoginSection />
    return (
        <Col>
            <Row className="p-3 justify-between items-center gap-3">
                <div>Buonvenite, <b>{session.user.nickname}</b>!</div>
                <a href={ authRoutes.logout }>
                    <Button>Log out</Button>
                </a>
            </Row>
            { render(session) }
        </Col>
    )
}
