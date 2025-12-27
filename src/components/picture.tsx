import type { ImgHTMLAttributes } from 'react';

type PictureProps = {
    src: string;
    alt?: string;
    className?: string;
    stretch?: boolean;
} & ImgHTMLAttributes<HTMLImageElement>;

export default function Picture({ src, alt = '', className = 'about-pic', stretch = false, ...rest }: PictureProps) {
    return (
        <div style={{ borderColor: 'rgb(49, 255, 152)', borderWidth: '2px', borderStyle: 'solid', display: 'inline-flex', margin: '10px', minWidth: stretch ? undefined : '21rem',  minHeight: '25rem', width: stretch ? undefined : '21rem',  height: '25rem'}}>
            <img src={src} alt={alt} className={className} {...rest} style={{objectFit: 'cover', width: '100%', height: '25rem'}}/>
        </div>
    );
}