import { buildResponse } from '@/app/lib/api'
import { expenses } from './mocks'


export async function GET() {
    return buildResponse(expenses)
}

// exports.GET = GET

// module.exports = {
//     GET,
// }