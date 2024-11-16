export type PropsWithClassName<P = unknown> = P & { className?: string | undefined }

export type CommonProps<P = unknown> = P & React.PropsWithChildren & {
    className?: string | undefined;
}

export interface ParamsWrapper<T> {
    params: Promise<T>;
}

// & JSX.IntrinsicAttributes

// export type PropsWithClassName<P = unknown> = P & { className?: string | undefined }
