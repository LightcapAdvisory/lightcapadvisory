import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import { Annotated } from '@/components/Annotated';
import Action from '@/components/atoms/Action';
import ImageBlock from '@/components/molecules/ImageBlock';
import { mapStylesToClassNames as mapStyles } from '@/utils/map-styles-to-class-names';

export default function FeaturedItem(props) {
    const { elementId, title, subtitle, text, featuredImage, actions = [], styles = {}, headingLevel } = props;
    const { self = {} } = styles;
    const { borderWidth, ...otherSelfStyles } = self;
    const TitleTag = headingLevel;

    return (
        <Annotated content={props}>
            <article
                id={elementId || null}
                className={classNames('overflow-hidden', mapStyles(otherSelfStyles))}
                style={{
                    borderWidth: borderWidth ? `${borderWidth}px` : null
                }}
            >
                <div className="flex items-start mb-6">
                    {featuredImage && (
                        <div className="flex-shrink-0 mr-4">
                            <ImageBlock
                                {...featuredImage}
                                className="w-12 h-12 md:w-16 md:h-16"
                            />
                        </div>
                    )}
                    <div>
                        {title && <TitleTag className="text-2xl sm:text-3xl font-semibold">{title}</TitleTag>}
                        {subtitle && <p className={classNames('text-lg', { 'mt-1': title })}>{subtitle}</p>}
                        {text && (
                            <Markdown
                                options={{ forceBlock: true, forceWrapper: true }}
                                className={classNames('prose sm:prose-lg', {
                                    'mt-2': title || subtitle
                                })}
                            >
                                {text}
                            </Markdown>
                        )}
                        {actions?.length > 0 && (
                            <div
                                className={classNames('flex flex-wrap items-center gap-4', {
                                    'justify-center': otherSelfStyles.textAlign === 'center',
                                    'justify-end': otherSelfStyles.textAlign === 'right',
                                    'mt-4': title || subtitle || text
                                })}
                            >
                                {actions.map((action, index) => (
                                    <Action key={index} {...action} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </Annotated>
    );
}
