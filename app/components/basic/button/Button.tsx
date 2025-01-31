import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props: Props) {
    // const { className } = props
    const className = clsx(
        props.className,
        'bg-emerald-600 p-2 text-white rounded whitespace-nowrap',
    )
    return (
        <button { ...props } className={ className } />
    )
}