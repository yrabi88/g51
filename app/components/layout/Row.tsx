import { CommonProps } from '@/app/lib/types'
import clsx from 'clsx'

export default function Row(props: CommonProps) {
    const { className, ...otherProps } = props
    // console.log('Row rendered')
    return (
        <div
            className={ clsx('flex flex-row', className) }
            { ...otherProps }
        />
    )
}