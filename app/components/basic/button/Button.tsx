import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const classes = {
    common: 'p-2 text-white rounded whitespace-nowrap',
    enabled: 'bg-emerald-600',
    disabled: 'bg-gray-400',
}

export default function Button(props: Props) {
    const className = clsx(
        classes.common,
        props.disabled ? classes.disabled : classes.enabled,
        props.className,
    )
    return (
        <button { ...props } className={ className } />
    )
}