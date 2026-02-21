import { Annotated } from '@/components/Annotated';
import * as React from 'react';

export default function FormBlock(props) {
    const { elementId, className, submitLabel = 'Send Message' } = props;
    const [status, setStatus] = React.useState('');

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(Object.fromEntries(formData.entries() as Iterable<[string, string]>)).toString()
        })
            .then((res) => {
                if (res.ok) {
                    setStatus('success');
                    form.reset();
                } else {
                    setStatus('error');
                }
            })
            .catch(() => setStatus('error'));
    }

    return (
        <Annotated content={props}>
            <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                id={elementId}
                className={className}
            >
                {/* Required hidden inputs for Netlify */}
                <input type="hidden" name="form-name" value="contact" />
                <p className="hidden">
                    <label>
                        Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
                    </label>
                </p>

                {/* Form fields */}
                <p>
                    <label>
                        Name
                        <input type="text" name="name" required className="w-full px-4 py-3 border rounded-md" />
                    </label>
                </p>
                <p>
                    <label>
                        Email
                        <input type="email" name="email" required className="w-full px-4 py-3 border rounded-md" />
                    </label>
                </p>
                <p>
                    <label>
                        Message
                        <textarea
                            name="messageInquiry"
                            required
                            className="w-full h-32 px-4 py-3 border rounded-md resize-none"
                        ></textarea>
                    </label>
                </p>

                <button
                    type="submit"
                    className="mt-4 px-6 py-3 border-2 rounded-md text-white"
                    style={{ backgroundColor: '#00A8FF' }}
                >
                    {submitLabel}
                </button>

                {/* Success/Error messages */}
                {status === 'success' && (
                    <p className="mt-2" style={{ color: '#00A8FF' }}>
                        Message sent successfully. I&apos;ll be in touch soon.
                    </p>
                )}
                {status === 'error' && <p className="mt-2 text-red-500">There was an error submitting the form.</p>}
            </form>
        </Annotated>
    );
}
