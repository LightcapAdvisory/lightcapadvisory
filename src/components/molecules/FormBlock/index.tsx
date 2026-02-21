import classNames from 'classnames';
import * as React from 'react';

import { Annotated } from '@/components/Annotated';
import { DynamicComponent } from '@/components/components-registry';
import { mapStylesToClassNames as mapStyles } from '@/utils/map-styles-to-class-names';

export default function FormBlock(props) {
    const formRef = React.createRef<HTMLFormElement>();

    const { elementId, className, fields = [], submitLabel, styles = {} } = props;

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [error, setError] = React.useState(null);

    if (fields.length === 0) {
        return null;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsSubmitting(true);
        setError(null);

        const form = formRef.current;
        const formData = new FormData(form);

        try {
            const response = await fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(formData).toString()
            });

            if (response.ok) {
                setIsSubmitted(true);
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Annotated content={props}>
            <form
                name={elementId}
                id={elementId}
                ref={formRef}
                className={className}
                onSubmit={handleSubmit}
                data-netlify="true"
                netlify-honeypot="bot-field"
            >
                {/* Required hidden inputs for Netlify */}
                <input type="hidden" name="form-name" value={elementId} />
                <input type="hidden" name="bot-field" />

                {!isSubmitted && (
                    <>
                        <div className="grid gap-6 sm:grid-cols-2">
                            {fields.map((field, index) => (
                                <DynamicComponent key={index} {...field} />
                            ))}
                        </div>

                        <div className={classNames('mt-8', mapStyles({ textAlign: styles.self?.textAlign ?? 'left' }))}>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center px-5 py-4 text-lg transition border-2 hover:-translate-y-1.5 disabled:opacity-50"
                                style={{
                                    color: '#00A8FF',
                                    borderColor: '#00A8FF'
                                }}
                            >
                                {isSubmitting ? 'Sending...' : submitLabel}
                            </button>
                        </div>
                    </>
                )}

                {isSubmitted && (
                    <div className="mt-8 text-lg font-medium" style={{ color: '#00A8FF' }}>
                        Message sent successfully. I&apos;ll be in touch soon.
                    </div>
                )}

                {error && <div className="mt-8 text-red-500 font-medium">{error}</div>}
            </form>
        </Annotated>
    );
}
