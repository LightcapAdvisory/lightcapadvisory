import { Annotated } from '@/components/Annotated';
import { DynamicComponent } from '@/components/components-registry';
import { mapStylesToClassNames as mapStyles } from '@/utils/map-styles-to-class-names';
import classNames from 'classnames';
import * as React from 'react';

export default function FormBlock(props) {
    const formRef = React.createRef<HTMLFormElement>();
    const { elementId, className, fields = [], submitLabel, styles = {} } = props;
    const [submitted, setSubmitted] = React.useState(false);
    const [error, setError] = React.useState(false);

    if (fields.length === 0) {
        return null;
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = formRef.current;
        if (!form) return;

        const data = new FormData(form);

        // Post to Netlify form handler
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data as any).toString()
        })
            .then((response) => {
                if (response.ok) {
                    setSubmitted(true);
                    setError(false);
                    form.reset();
                } else {
                    setSubmitted(false);
                    setError(true);
                }
            })
            .catch(() => {
                setSubmitted(false);
                setError(true);
            });
    }

    return (
        <Annotated content={props}>
            <form
                name={elementId || 'contact'}
                id={elementId}
                ref={formRef}
                className={className}
                onSubmit={handleSubmit}
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
            >
                {/* Hidden inputs for Netlify */}
                <input type="hidden" name="form-name" value={elementId || 'contact'} />
                <input type="hidden" name="bot-field" />

                {/* Form fields */}
                <div className="grid gap-6 sm:grid-cols-2">
                    {fields.map((field, index) => (
                        <DynamicComponent key={index} {...field} />
                    ))}
                </div>

                {/* Submit button */}
                <div className={classNames('mt-8', mapStyles({ textAlign: styles.self?.textAlign ?? 'left' }))}>
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center px-5 py-4 text-lg transition border-2 hover:-translate-y-1.5"
                        style={{ color: '#00A8FF' }}
                    >
                        {submitLabel}
                    </button>
                </div>

                {/* Success and error messages */}
                {submitted && (
                    <p className="mt-4" style={{ color: '#00A8FF' }}>
                        Message sent successfully. I&apos;ll be in touch soon.
                    </p>
                )}
                {error && (
                    <p className="mt-4" style={{ color: 'red' }}>
                        Oops! Something went wrong. Please try again.
                    </p>
                )}
            </form>
        </Annotated>
    );
}
