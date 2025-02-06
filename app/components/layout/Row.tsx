import { BoxProps } from '@/app/lib/types'
import clsx from 'clsx'

export default function Row(props: BoxProps) {
    const { className, ...otherProps } = props
    return (
        <div
            className={ clsx('flex flex-row', className) }
            { ...otherProps }
        />
    )
}