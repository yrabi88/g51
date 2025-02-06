import { DetailedHTMLProps, HTMLAttributes } from 'react'

export type PropsWithClassName<P = unknown> = P & { className?: string | undefined }

export type BoxProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
export interface ParamsWrapper<T> {
    params: Promise<T>;
}

// & JSX.IntrinsicAttributes

// export type PropsWithClassName<P = unknown> = P & { className?: string | undefined }
