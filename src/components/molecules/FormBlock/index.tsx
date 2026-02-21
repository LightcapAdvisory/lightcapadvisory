import classNames from 'classnames';
import * as React from 'react';

import { Annotated } from '@/components/Annotated';
import { DynamicComponent } from '@/components/components-registry';
import { mapStylesToClassNames as mapStyles } from '@/utils/map-styles-to-class-names';

export default function FormBlock(props) {
    const formRef = React.useRef<HTMLFormElement>(null);

    const { elementId, className, fields = [], submitLabel, styles = {} } = props;

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isError, setIsError] = React.useState(false);

    if (fields.length === 0) {
        return null;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsSubmitting(true);
        setIsError(false);

        try {
            const form = formRef.current;
            const formData = new FormData(form);

            const response = await fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(formData as any).toString()
            });

            if (response.ok) {
                setIsSuccess(true);
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Annotated content={props}>
            <form
                ref={formRef}
                name={elementId}
                id={elementId}
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className={className}
                onSubmit={handleSubmit}
            >
                {/* Required hidden input for Netlify */}
                <input type="hidden" name="form-name" value={elementId} />

                {/* Honeypot spam protection */}
                <input type="hidden" name="bot-field" />

                <div className="grid gap-6 sm:grid-cols-2">
                    {fields.map((field, index) => (
                        <DynamicComponent key={index} {...field} />
                    ))}
                </div>

                <div
                    className={classNames(
                        'mt-8',
                        mapStyles({
                            textAlign: styles.self?.textAlign ?? 'left'
                        })
                    )}
                >
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

                    {isSuccess && <p className="mt-4 text-green-500">Message sent successfully.</p>}

                    {isError && <p className="mt-4 text-red-500">Something went wrong. Please try again.</p>}
                </div>
            </form>
        </Annotated>
    );
}
