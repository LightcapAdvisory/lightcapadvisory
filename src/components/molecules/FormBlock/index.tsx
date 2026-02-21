import { Annotated } from '@/components/Annotated';
import * as React from 'react';

export default function FormBlock() {
    const [submitted, setSubmitted] = React.useState(false);
    const [error, setError] = React.useState(false);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;

        const data = new FormData(form);

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
        <Annotated content={{}}>
            <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto p-4"
            >
                {/* Netlify hidden fields */}
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        required
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                    <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                    <textarea
                        name="messageInquiry"
                        placeholder="Type your message / inquiry here"
                        rows={4}
                        className="border border-gray-300 rounded px-3 py-2 w-full col-span-1 sm:col-span-2"
                    />
                </div>

                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center px-6 py-3 text-lg text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                    >
                        SEND MESSAGE
                    </button>
                </div>

                {submitted && (
                    <p className="mt-4 text-center" style={{ color: '#00A8FF' }}>
                        Message sent successfully. I&apos;ll be in touch soon.
                    </p>
                )}
                {error && (
                    <p className="mt-4 text-center text-red-600">Oops! Something went wrong. Please try again.</p>
                )}
            </form>
        </Annotated>
    );
}
