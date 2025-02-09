import { PropsWithChildren } from "react";

export default function Title({ children }: PropsWithChildren) {
    return (
        <div className='text-4xl'>{ children }</div>
    )
}
