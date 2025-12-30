import type { ImgHTMLAttributes } from 'react';

type PictureProps = {
    src: string;
    alt?: string;
    className?: string;
    stretch?: boolean;
} & ImgHTMLAttributes<HTMLImageElement>;

export default function Picture({ src, alt = '', className = 'about-pic', stretch = false, ...rest }: PictureProps) {
    return (
        <div
            style={{
                display: 'inline-flex',
                margin: '10px',
                minWidth: stretch ? 0 : '21rem',
                minHeight: '25rem',
                width: stretch ? 'auto' : '21rem',
                maxWidth: stretch ? '90vw' : undefined,
                height: '25rem',
                flex: '0 0 auto',
            }}
        >
            <img
                src={src}
                alt={alt}
                className={className}
                {...rest}
                style={{ objectFit: 'cover', width: '100%', maxWidth: '100%', height: '25rem' }}
            />
        </div>
    );
}