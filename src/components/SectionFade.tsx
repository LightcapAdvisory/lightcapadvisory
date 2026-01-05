import { motion } from 'framer-motion';
import * as React from 'react';

type SectionFadeProps = React.PropsWithChildren<{
    className?: string;
}>;

export default function SectionFade({ children, className }: SectionFadeProps) {
    return (
        <motion.div
      initial= {{ opacity: 0, y: 30 }
}            // start slightly down & invisible
whileInView = {{ opacity: 1, y: 0 }}        // fade in & slide up
viewport = {{ once: true, amount: 0.3 }}    // trigger once when 30% visible
transition = {{ duration: 0.6, ease: 'easeOut' }}
className = { className }
    >
    { children }
    </motion.div>
  );
}
