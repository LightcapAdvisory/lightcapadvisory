import classNames from 'classnames';
import * as React from 'react';

import { Annotated } from '@/components/Annotated';
import { DynamicComponent } from '@/components/components-registry';
import { mapStylesToClassNames as mapStyles } from '@/utils/map-styles-to-class-names';

export default function FormBlock(props) {
    const formRef = React.useRef<HTMLFormElement>(null);
    const [statusMessage, setStatusMessage] = React.useState('');
    const [statusColor, setStatusColor] = React.useState('#00A8FF'); // default accent color
    const { elementId, className, fields = [], submitLabel, styles = {} } = props;

    if (fields.length === 0) {
        return null;
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!formRef.current) return;

        const data = new FormData(formRef.current);

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    'form-name': elementId || 'contact',
                    ...Object.fromEntries(data.entries())
                }).toString()
            });

            if (response.ok) {
                setStatusMessage('Message sent successfully. I’ll be in touch soon.');
                setStatusColor('#00A8FF'); // accent blue
                formRef.current.reset();
            } else {
                setStatusMessage('Oops, something went wrong. Please try again.');
                setStatusColor('red');
            }
        } catch (error) {
            setStatusMessage('Oops, something went wrong. Please try again.');
            setStatusColor('red');
        }
    };

    return (
        <Annotated content={props}>
            <form
                className={className}
                name={elementId || 'contact'}
                id={elementId}
                onSubmit={handleSubmit}
                ref={formRef}
                data-netlify="true"
            >
                {/* Hidden input for Netlify */}
                <input type="hidden" name="form-name" value={elementId || 'contact'} />

                <div className="grid gap-6 sm:grid-cols-2">
                    {fields.map((field, index) => (
                        <DynamicComponent key={index} {...field} />
                    ))}
                </div>

                <div className={classNames('mt-8', mapStyles({ textAlign: styles.self?.textAlign ?? 'left' }))}>
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center px-5 py-4 text-lg transition border-2 hover:-translate-y-1.5"
                        style={{ color: '#00A8FF' }}
                    >
                        {submitLabel}
                    </button>
                </div>

                {statusMessage && (
                    <p className="mt-4 text-lg font-semibold" style={{ color: statusColor }}>
                        {statusMessage}
                    </p>
                )}
            </form>
        </Annotated>
    );
}
