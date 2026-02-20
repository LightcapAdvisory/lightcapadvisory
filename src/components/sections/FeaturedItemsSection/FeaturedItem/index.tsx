import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import { Annotated } from '@/components/Annotated';
import { mapStylesToClassNames as mapStyles } from '@/utils/map-styles-to-class-names';

export default function FeaturedItem(props) {
    const {
        elementId,
        eyebrow,
        title,
        subtitle,
        text,
        number, // <-- use this for 01, 02, etc.
        featuredImage,
        actions = [],
        styles = {},
        headingLevel
    } = props;

    const { self = {} } = styles;
    const { borderWidth, ...otherSelfStyles } = self;
    const TitleTag = headingLevel;

    return (
        <Annotated content={props}>
            <article
                id={elementId || null}
                className={classNames('relative', mapStyles(otherSelfStyles))} // remove overflow-hidden
                style={{
                    borderWidth: borderWidth ? `${borderWidth}px` : null,
                    paddingLeft: '1rem'
                }}
            >
                <div className="relative z-10">
                    {/* Number behind the content */}
                    {number && (
                        <span
                            className="absolute select-none pointer-events-none number-behind"
                            style={{
                                color: '#00A8FF',
                                /* fontSize: 'clamp(3rem, 8vw, 10rem)', // keeps responsive scaling */
                                fontWeight: 'bold',
                                /* top: '-6rem', // desktop offset */
                                /* left: '-6.5rem', // desktop offset */
                                zIndex: 0
                                /*  opacity: 0.5 */
                            }}
                        >
                            {number}
                        </span>
                    )}

                    {/* Now your eyebrow, title, subtitle, text */}
                    {eyebrow && (
                        <div
                            className="text-sm font-semibold tracking-wider uppercase mb-1"
                            style={{ color: '#00A8FF', zIndex: 10 }}
                        >
                            {eyebrow}
                        </div>
                    )}

                    {title && (
                        <TitleTag className="text-2xl sm:text-3xl font-semibold relative z-10">
                            {title.split(':')[0]} <span style={{ color: '#00A8FF' }}>{title.split(':')[1]} </span>
                        </TitleTag>
                    )}

                    {subtitle && <p className="text-lg relative z-10 mt-1">{subtitle}</p>}

                    {text && (
                        <Markdown
                            options={{ forceBlock: true, forceWrapper: true }}
                            style={{ opacity: '80%', position: 'relative', zIndex: 10 }}
                            className="sm:prose-lg mt-2"
                        >
                            {text}
                        </Markdown>
                    )}
                </div>
            </article>
        </Annotated>
    );
}
