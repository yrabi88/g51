import { BoxProps } from '@/app/lib/types'
import clsx from 'clsx'

export default function Col(props: BoxProps) {
    const { className, ...otherProps } = props
    return (
        <div
            className={ clsx('flex flex-col', className) }
            { ...otherProps }
        />
    )
}