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

        fetch('/form-check.html', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData as any).toString()
        }).then((res) => {
            if (res.ok) {
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
                // Changed mt-20 to mt-12 to shrink the gap
                className="w-full block relative z-10 mt-8 font-primary"
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
                            className="bg-transparent border border-[#d1d5db] placeholder-[#9ca3af] text-inherit !rounded-none px-4 py-3 w-full focus:outline-none focus:border-[#00A8FF] appearance-none"
                            style={{ borderRadius: '0px' }}
                        />
                    ))}
                    <textarea
                        name="messageInquiry"
                        placeholder="Type your message / inquiry here"
                        rows={4}
                        className="bg-transparent border border-[#d1d5db] placeholder-[#9ca3af] text-inherit !rounded-none px-4 py-3 w-full col-span-1 sm:col-span-2 focus:outline-none focus:border-[#00A8FF] appearance-none"
                        style={{ borderRadius: '0px' }}
                    />
                </div>

                <div className="mt-10 text-center">
                    <button
                        type="submit"
                        className="relative inline-flex items-center justify-center px-8 py-4 text-lg transition border-2 hover:-translate-y-1.5 !rounded-none"
                        style={{
                            borderRadius: '0px',
                            color: '#00A8FF',
                            borderColor: '#00A8FF',
                            fontFamily: "'DM Sans', sans-serif",
                            // Dropped to 400 for a lighter, cleaner look
                            fontWeight: 400,
                            letterSpacing: '0.02em',
                            textTransform: 'uppercase'
                        }}
                    >
                        SEND MESSAGE
                    </button>
                </div>

                {submitted && (
                    <p
                        className="mt-6 text-center font-medium"
                        style={{ color: '#00A8FF', fontFamily: "'Inter', sans-serif" }}
                    >
                        Message sent successfully. I&apos;ll be in touch soon.
                    </p>
                )}
            </form>
        </Annotated>
    );
}
