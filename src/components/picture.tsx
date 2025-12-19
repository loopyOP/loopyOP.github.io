import type { ImgHTMLAttributes } from 'react';

type PictureProps = {
    src: string;
    alt?: string;
    className?: string;
} & ImgHTMLAttributes<HTMLImageElement>;

export default function Picture({ src, alt = '', className = 'about-pic', ...rest }: PictureProps) {
    return (
        <div style={{ borderColor: 'rgb(49, 255, 152)', borderWidth: '2px', borderStyle: 'solid', display: 'inline-flex', margin: '10px', minWidth: '21rem',  minHeight: '25rem', width: '21rem',  height: '25rem'}}>
            <img src={src} alt={alt} className={className} {...rest} style={{objectFit: 'cover', width: '100%', height: '25rem'}}/>
        </div>
    );
}