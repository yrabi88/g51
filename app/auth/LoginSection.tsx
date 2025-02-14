import Col from '@/app/components/layout/Col'
import Button from '@/app/components/basic/button/Button'
import { authRoutes } from "./common"

// todo: add returnTo (according to prop OR current app base route [and each app route will be in auth0 whitelist])

// const returnTo = '/lista/authcb/login'
// &returnTo=${returnTo}

export default async function LoginSection() {
    return (
        <Col className="gap-2 items-start">
            <a href={ authRoutes.signup }>
                <Button>Sign up</Button>
            </a>
            <a href={ authRoutes.login }>
                <Button>Log in</Button>
            </a>
        </Col>
    )
}
