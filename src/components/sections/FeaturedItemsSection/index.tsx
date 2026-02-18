import classNames from 'classnames';
import type { Easing, Variants } from 'framer-motion';
import { motion } from 'framer-motion';

import Action from '@/components/atoms/Action';
import { mapStylesToClassNames as mapStyles } from '@/utils/map-styles-to-class-names';
import Section from '../Section';
import FeaturedItem from './FeaturedItem';

export default function FeaturedItemsSection(props) {
    const {
        elementId,
        colors,
        title,
        subtitle,
        actions = [],
        items = [],
        columns = 3,
        spacingX = 16,
        spacingY = 16,
        styles = {}
    } = props;

    const sectionAlign = styles.self?.textAlign ?? 'left';

    // Framer Motion variants for fade-in + slide-up
    const fadeUpVariant: Variants = {
        hidden: { opacity: 0, y: 40 }, // larger movement for visibility
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' satisfies Easing } }
    };

    return (
        <Section
            elementId={elementId}
            colors={colors}
            styles={styles.self}
            surface="glass" // Apple-style glass
        >
            {title && (
                <motion.h2
                    className={classNames('text-4xl sm:text-5xl font-semibold', mapStyles({ textAlign: sectionAlign }))}
                    variants={fadeUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    style={{ textShadow: '0 2px 6px rgba(255,255,255,0.3)' }} // light drop shadow
                >
                    {title}
                </motion.h2>
            )}

            {subtitle && (
                <motion.p
                    className={classNames('text-lg sm:text-xl text-black/80', mapStyles({ textAlign: sectionAlign }), {
                        'mt-6': title
                    })}
                    variants={fadeUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    style={{ textShadow: '0 1px 4px rgba(255,255,255,0.25)' }}
                >
                    {subtitle}
                </motion.p>
            )}

            {items.length > 0 && (
                <div
                    className={classNames('grid', mapColStyles(columns), { 'mt-12': title || subtitle })}
                    style={{
                        columnGap: spacingX ? `${spacingX}px` : null,
                        rowGap: spacingY ? `${spacingY}px` : null
                    }}
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={fadeUpVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.2 }}
                        >
                            <FeaturedItem {...item} headingLevel={title ? 'h3' : 'h2'} />
                        </motion.div>
                    ))}
                </div>
            )}

            {actions?.length > 0 && (
                <div
                    className={classNames('flex flex-wrap items-center gap-4 mt-10', {
                        'justify-center': sectionAlign === 'center',
                        'justify-end': sectionAlign === 'right'
                    })}
                >
                    {actions.map((action, index) => (
                        <Action key={index} {...action} />
                    ))}
                </div>
            )}
        </Section>
    );
}

function mapColStyles(columns) {
    switch (columns) {
        case 4:
            return 'md:grid-cols-4';
        case 3:
            return 'md:grid-cols-3';
        case 2:
            return 'md:grid-cols-2';
        default:
            return null;
    }
}
