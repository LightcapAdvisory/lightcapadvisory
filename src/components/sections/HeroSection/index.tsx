import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import { AnnotatedField } from '@/components/Annotated';
import { Action } from '@/components/atoms';
import { HeroSection } from '@/types';
import { mapStylesToClassNames as mapStyles } from '@/utils/map-styles-to-class-names';
import Section from '../Section';

export default function Component(props: HeroSection) {
    const {
        elementId,
        colors,
        backgroundSize,
        backgroundImage,
        title,
        subtitle,
        text,
        actions = [],
        styles = {}
    } = props;

    const sectionAlign = styles.self?.textAlign ?? 'left';

    return (
        <Section
            elementId={elementId}
            colors={colors}
            backgroundSize={backgroundSize}
            styles={styles.self}
            backgroundImage={backgroundImage}
        >
            <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* LEFT — TEXT */}
                <div className={classNames('w-full lg:w-1/2', mapStyles({ textAlign: sectionAlign }))}>
                    {title && (
                        <AnnotatedField path=".title">
                            <h1 className="text-5xl sm:text-6xl font-semibold">
                                {title.split(':')[0]} <span style={{ color: '#00A8FF' }}>{title.split(':')[1]}</span>
                            </h1>
                        </AnnotatedField>
                    )}

                    {subtitle && (
                        <AnnotatedField path=".subtitle">
                            <p className={classNames('text-xl sm:text-2xl opacity-80', { 'mt-4': title })}>
                                {subtitle}
                            </p>
                        </AnnotatedField>
                    )}

                    {text && (
                        <AnnotatedField path=".text">
                            <Markdown
                                options={{ forceBlock: true }}
                                className={classNames('prose sm:prose-lg', { 'mt-6': title || subtitle })}
                            >
                                {text}
                            </Markdown>
                        </AnnotatedField>
                    )}

                    {actions.length > 0 && (
                        <div className="flex flex-wrap gap-4 mt-8" style={{ color: '#00A8FF' }}>
                            {actions.map((action, index) => (
                                <Action key={index} {...action} />
                            ))}
                        </div>
                    )}
                </div>

                {/* RIGHT — VIDEO */}
                <div className="w-full lg:w-1/2">
                    <div className="relative w-full aspect-[4/3] overflow-hidden shadow-xl bg-black">
                        <video
                            className="w-full h-full object-contain"
                            controls
                            playsInline
                            poster="/images/video-placeholder.jpg"
                        >
                            <source src="/videos/Lightcap_Advisory_Hero_Video.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </Section>
    );
}
