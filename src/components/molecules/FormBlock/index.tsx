import classNames from 'classnames';
import * as React from 'react';

import { Annotated } from '@/components/Annotated';
import { DynamicComponent } from '@/components/components-registry';
import { mapStylesToClassNames as mapStyles } from '@/utils/map-styles-to-class-names';

export default function FormBlock(props) {
    const formRef = React.useRef<HTMLFormElement>(null);
    const { elementId, className, fields = [], submitLabel, styles = {} } = props;

    const [status, setStatus] = React.useState('');
    const [statusColor, setStatusColor] = React.useState('#00A8FF');

    function handleSubmit(event) {
        event.preventDefault();
        const form = formRef.current;
        if (!form) return;

        // Serialize
        const formData = new FormData(form);
        const body = new URLSearchParams(formData as any).toString();

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body
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
            {/* NETLIFY WILL DETECT THIS FORM AT BUILD TIME */}
            <form
                ref={formRef}
                name={elementId || 'contact'}
                id={elementId || 'contact'}
                className={className}
                method="POST"
                action="/"
                data-netlify="true"
                netlify="true"
                onSubmit={handleSubmit}
            >
                {/* REQUIRED: Netlify form hidden field */}
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
                        style={{ color: '#00A8FF', borderColor: '#00A8FF' }}
                    >
                        {submitLabel}
                    </button>
                </div>

                {status && (
                    <p className="mt-4 text-lg font-semibold" style={{ color: statusColor }}>
                        {/* This will render unescaped apostrophes in HTML */}
                        <span dangerouslySetInnerHTML={{ __html: status }} />
                    </p>
                )}
            </form>
        </Annotated>
    );
}
