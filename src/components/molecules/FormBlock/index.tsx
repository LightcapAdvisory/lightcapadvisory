import { Annotated } from '@/components/Annotated';
import { mapStylesToClassNames as mapStyles } from '@/utils/map-styles-to-class-names';
import classNames from 'classnames';
import * as React from 'react';

export default function FormBlock(props) {
    const formRef = React.useRef<HTMLFormElement>(null);
    const { elementId, className, fields = [], submitLabel, styles = {} } = props;

    const [status, setStatus] = React.useState('');
    const [statusColor, setStatusColor] = React.useState('#00A8FF');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = formRef.current;
        if (!form) return;

        const formData = new FormData(form);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData as any).toString()
        })
            .then((response) => {
                if (response.ok) {
                    setStatus('Message sent successfully. I&apos;ll be in touch soon.');
                    setStatusColor('#00A8FF');
                    form.reset();
                } else {
                    throw new Error('Failed to submit');
                }
            })
            .catch(() => {
                setStatus('Oops — something went wrong. Please try again.');
                setStatusColor('red');
            });
    }

    return (
        <Annotated content={props}>
            <form
                ref={formRef}
                name={elementId || 'contact'}
                id={elementId || 'contact'}
                method="POST"
                action="/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className={className}
            >
                {/* Hidden input required by Netlify */}
                <input type="hidden" name="form-name" value={elementId || 'contact'} />
                {/* Honeypot for spam protection */}
                <p className="hidden">
                    <label>
                        Don’t fill this out if you’re human: <input name="bot-field" />
                    </label>
                </p>

                <div className="grid gap-6 sm:grid-cols-2">
                    {fields.map((field, index) => {
                        const { name, type, placeholder, required } = field;
                        return (
                            <div key={index}>
                                <label className="block text-sm font-medium mb-1" htmlFor={name}>
                                    {placeholder}
                                </label>
                                <input
                                    type={type || 'text'}
                                    name={name}
                                    id={name}
                                    placeholder={placeholder}
                                    required={!!required}
                                    className="w-full border px-3 py-2 rounded"
                                />
                            </div>
                        );
                    })}
                </div>

                <div className={classNames('mt-8', mapStyles({ textAlign: styles.self?.textAlign ?? 'left' }))}>
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center px-5 py-4 text-lg transition border-2 hover:-translate-y-1.5"
                        style={{ color: '#00A8FF', borderColor: '#00A8FF' }}
                    >
                        {submitLabel}
                    </button>
                </div>

                {status && (
                    <p className="mt-4 text-lg font-semibold" style={{ color: statusColor }}>
                        <span dangerouslySetInnerHTML={{ __html: status }} />
                    </p>
                )}
            </form>
        </Annotated>
    );
}
