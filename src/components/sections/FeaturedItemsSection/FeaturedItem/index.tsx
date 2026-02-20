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
                className={classNames('relative', mapStyles(otherSelfStyles))}
                style={{
                    borderWidth: borderWidth ? `${borderWidth}px` : null,
                    paddingLeft: '1rem'
                }}
            >
                {/* Content container */}
                <div className="relative z-10">
                    <div className="number-anchor">
                        {number && <span className="number-behind">{number}</span>}

                        {/* eyebrow, title, subtitle, text */}
                        {eyebrow && (
                            <div className="text-sm font-semibold tracking-wider uppercase mb-1 featured-eyebrow">
                                {eyebrow}
                            </div>
                        )}

                        {title && (
                            <TitleTag className="text-2xl sm:text-3xl font-semibold relative z-10">
                                {title.split(':')[0]} <span style={{ color: '#00A8FF' }}>{title.split(':')[1]}</span>
                            </TitleTag>
                        )}

                        {subtitle && <p className="text-lg relative z-10 mt-1">{subtitle}</p>}

                        {text && (
                            <Markdown
                                options={{ forceBlock: true, forceWrapper: true }}
                                className="sm:prose-lg mt-2 relative z-10"
                                style={{ opacity: '80%' }}
                            >
                                {text}
                            </Markdown>
                        )}
                    </div>
                </div>
            </article>
        </Annotated>
    );
}
