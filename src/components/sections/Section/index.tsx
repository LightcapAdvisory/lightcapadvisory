import classNames from 'classnames';
import type { StaticImageData } from 'next/image';
import * as React from 'react';

import { mapStylesToClassNames as mapStyles } from '@/utils/map-styles-to-class-names';

type SectionProps = React.PropsWithChildren<{
    type?: string;
    elementId?: string;
    colors?: 'colors-a' | 'colors-b' | 'colors-c' | 'colors-d' | 'colors-e' | 'colors-f';
    backgroundSize?: 'full' | 'inset';
    styles?: any;
    backgroundImage?: string | StaticImageData;
}>;

export default function Section(props: SectionProps) {
    const { backgroundSize = 'full', ...rest } = props;
    return backgroundSize === 'inset' ? <SectionInset {...rest} /> : <SectionFullWidth {...rest} />;
}

function resolveBackgroundImage(bg?: string | StaticImageData) {
    if (!bg) return undefined;
    return typeof bg === 'string' ? bg : bg.src;
}

function SectionInset(props: SectionProps) {
    const { elementId, colors = 'colors-f', styles = {}, children, backgroundImage } = props;
    const bgUrl = resolveBackgroundImage(backgroundImage);

    return (
        <div
            id={elementId || undefined}
            className={classNames('flex justify-center', styles.margin)}
            style={{
                borderWidth: styles.borderWidth ? `${styles.borderWidth}px` : undefined,
                backgroundImage: bgUrl ? `url('${bgUrl}')` : undefined,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
            data-theme={colors}
        >
            <div
                className={classNames(
                    'flex flex-col items-center justify-center relative w-full bg-transparent',
                    mapStyles({ width: styles.width ?? 'wide' }),
                    mapStyles({ height: styles.height ?? 'screen' }), // default to full viewport
                    styles.padding ?? 'py-24 px-6', // larger padding for hero
                    styles.borderColor,
                    styles.borderStyle ? mapStyles({ borderStyle: styles.borderStyle }) : null,
                    styles.borderRadius ? mapStyles({ borderRadius: styles.borderRadius }) : null
                )}
                style={{
                    borderWidth: styles.borderWidth ? `${styles.borderWidth}px` : undefined
                }}
            >
                {children}
            </div>
        </div>
    );
}

function SectionFullWidth(props: SectionProps) {
    const { elementId, colors = 'colors-f', styles = {}, children, backgroundImage } = props;
    const bgUrl = resolveBackgroundImage(backgroundImage);

    return (
        <div
            id={elementId || undefined}
            data-theme={colors}
            className={classNames(
                'flex flex-col justify-center items-center relative bg-cover bg-center',
                mapStyles({ height: styles.height ?? 'screen' }), // default full viewport
                styles.margin,
                styles.padding ?? 'py-24 px-6', // larger padding for hero
                styles.borderColor,
                styles.borderStyle ? mapStyles({ borderStyle: styles.borderStyle }) : null,
                styles.borderRadius ? mapStyles({ borderRadius: styles.borderRadius }) : null
            )}
            style={{
                borderWidth: styles.borderWidth ? `${styles.borderWidth}px` : undefined,
                backgroundImage: bgUrl ? `url('${bgUrl}')` : undefined
            }}
        >
            {/* Optional overlay */}
            {bgUrl && <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none"></div>}

            <div className={classNames('w-full relative z-10', mapStyles({ width: styles.width ?? 'wide' }))}>
                {children}
            </div>
        </div>
    );
}
