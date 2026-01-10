import type { ImgHTMLAttributes } from 'react';

type PictureProps = {
    src: string;
    sources?: {
        avif?: string;
        webp?: string;
    };
    alt?: string;
    className?: string;
    stretch?: boolean;
} & ImgHTMLAttributes<HTMLImageElement>;

export default function Picture({ src, sources, alt = '', className = 'about-pic', stretch = false, ...rest }: PictureProps) {
    return (
        <div className={stretch ? 'picture-frame picture-frame--stretch' : 'picture-frame'}>
            <picture>
                {sources?.avif && <source srcSet={sources.avif} type="image/avif" />}
                {sources?.webp && <source srcSet={sources.webp} type="image/webp" />}
                <img src={src} alt={alt} className={className} {...rest} />
            </picture>
        </div>
    );
}