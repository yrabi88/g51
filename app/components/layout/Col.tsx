import { CommonProps } from '@/app/lib/types'
import clsx from 'clsx'

export default function Col(props: CommonProps) {
    const { className, ...otherProps } = props
    return (
        <div
            className={ clsx('flex flex-col', className) }
            { ...otherProps }
        />
    )
}