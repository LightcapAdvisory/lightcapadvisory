import { Annotated } from '@/components/Annotated';
import * as React from 'react';

export default function FormBlock() {
    const [submitted, setSubmitted] = React.useState(false);

    React.useEffect(() => {
        const parentTag = document.querySelector('form[name="contact"]')?.parentElement;
        if (parentTag && parentTag.tagName === 'DATA') {
            parentTag.style.display = 'block';
            parentTag.style.width = '100%';
        }
    }, []);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        formData.set('form-name', 'contact');

        fetch('/__netlify_form_detection.html', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData as any).toString()
        })
            .then((res) => {
                // If on Netlify and successful, OR if testing locally, show success
                if (res.ok || window.location.hostname === 'localhost') {
                    setSubmitted(true);
                    form.reset();
                }
            })
            .catch(() => {
                // Fallback for local testing if the fetch fails
                if (window.location.hostname === 'localhost') {
                    setSubmitted(true);
                    form.reset();
                }
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
                className="w-full block relative z-10 mt-12"
                style={{ display: 'block', width: '100%' }}
            >
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
                    {[
                        { name: 'firstName', placeholder: 'First Name', required: true },
                        { name: 'lastName', placeholder: 'Last Name', required: false },
                        { name: 'email', placeholder: 'Email', required: true },
                        { name: 'companyName', placeholder: 'Company Name', required: false }
                    ].map((field) => (
                        <input
                            key={field.name}
                            type={field.name === 'email' ? 'email' : 'text'}
                            name={field.name}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="bg-transparent border border-[#d1d5db] placeholder-[#9ca3af] !rounded-none px-4 py-3 w-full focus:outline-none focus:border-[#00A8FF] appearance-none"
                            style={{ borderRadius: '0px', fontFamily: 'Inter, sans-serif' }}
                        />
                    ))}
                    <textarea
                        name="messageInquiry"
                        placeholder="Type your message / inquiry here"
                        rows={4}
                        className="bg-transparent border border-[#d1d5db] placeholder-[#9ca3af] !rounded-none px-4 py-3 w-full col-span-1 sm:col-span-2 focus:outline-none focus:border-[#00A8FF] appearance-none"
                        style={{ borderRadius: '0px', fontFamily: 'Inter, sans-serif' }}
                    />
                </div>

                <div className="mt-10 text-center">
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center transition hover:-translate-y-1.5 antialiased"
                        style={{
                            height: '63.2px',
                            minWidth: '226.6px',
                            padding: '16px 20px',
                            backgroundColor: 'transparent',
                            border: '1.6px solid rgb(0, 168, 255)',
                            color: 'rgb(0, 168, 255)',
                            borderRadius: '0px',
                            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                            fontSize: '18px',
                            fontWeight: 400,
                            lineHeight: '28px',
                            letterSpacing: 'normal',
                            textTransform: 'none',
                            WebkitFontSmoothing: 'antialiased'
                        }}
                    >
                        SEND MESSAGE
                    </button>
                </div>

                {submitted && (
                    <p
                        className="mt-6 text-center font-medium"
                        style={{ color: '#00A8FF', fontFamily: 'Inter, sans-serif' }}
                    >
                        Message sent successfully. I&apos;ll be in touch soon.
                    </p>
                )}
            </form>
        </Annotated>
    );
}
