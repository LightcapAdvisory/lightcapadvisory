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
    surface?: 'none' | 'glass' | 'solid';
}>;

export default function Section(props: SectionProps) {
    const { backgroundSize = 'full', ...rest } = props;
    return backgroundSize === 'inset' ? <SectionInset {...rest} /> : <SectionFullWidth {...rest} />;
}

/* -------------------------------------------------------------------------- */
/*                               INSET SECTION                                */
/* -------------------------------------------------------------------------- */

function SectionInset(props: SectionProps) {
    const { elementId, colors = 'colors-f', styles = {}, children, surface = 'none' } = props;

    return (
        <div
            id={elementId || undefined}
            className={classNames('flex justify-center', styles.margin)}
            data-theme={colors}
        >
            <div
                className={classNames(
                    'flex flex-col items-center justify-center relative w-full',
                    mapStyles({ width: styles.width ?? 'wide' }),
                    mapStyles({ height: styles.height ?? 'auto' }),
                    styles.padding ?? 'py-24 px-6',
                    styles.borderColor,
                    styles.borderStyle ? mapStyles({ borderStyle: styles.borderStyle }) : null,
                    styles.borderRadius ? mapStyles({ borderRadius: styles.borderRadius }) : null,
                    surfaceClasses(surface)
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

/* -------------------------------------------------------------------------- */
/*                             FULL WIDTH SECTION                              */
/* -------------------------------------------------------------------------- */

function SectionFullWidth(props: SectionProps) {
    const { elementId, colors = 'colors-f', styles = {}, children, surface = 'none' } = props;

    return (
        <section
            id={elementId || undefined}
            data-theme={colors}
            className={classNames(
                'relative w-full flex justify-center',
                // remove height styling here to avoid shrinking
                styles.margin,
                styles.padding ?? 'py-24 px-0' // vertical padding only
            )}
        >
            {/* Glass band spans full width */}
            <div
                className={classNames(
                    'w-full',
                    surface === 'glass' ? 'backdrop-blur-xl border-t border-b border-white/20 shadow-none' : '',
                    surface === 'solid' ? 'bg-black/80' : ''
                )}
            >
                {/* Inner content container: centered text only */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16">{children}</div>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/*                               SURFACE STYLES                                */
/* -------------------------------------------------------------------------- */

function surfaceClasses(surface: 'none' | 'glass' | 'solid') {
    switch (surface) {
        case 'glass':
            return classNames(
                'bg-white/5', // frosted glass
                'backdrop-blur-xl', // blur
                'shadow-[0_20px_50px_rgba(0,0,0,0.35)]', // soft depth
                'border-t border-b border-white/30' // top & bottom separators
            );
        case 'solid':
            return 'bg-black/80';
        default:
            return null;
    }
}
