import Row from "@/app/components/layout/Row";
import Link from "next/link";

export default function MainBreadcrumbs() {
    return (
        <Row className='text-sm md:text-md text-gray-500 gap-1'>
            <Link href="/lista">Lists</Link>
            <span>&gt;</span>
        </Row>
    )
}
