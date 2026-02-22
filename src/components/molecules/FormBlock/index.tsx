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
                // mt-20 ensures a clear section break.
                // font-primary (Inter) matches your body text
                className="w-full block relative z-10 mt-20 font-primary"
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
                            // border-[#d1d5db] is the hex for gray-300
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

                <div className="mt-10">
                    <button
                        type="submit"
                        // Using 'font-secondary' (DM Sans) and '#00A8FF' blue to match Hero actions perfectly
                        className="inline-flex items-center justify-center px-10 py-4 text-white bg-[#00A8FF] !rounded-none hover:bg-[#0086cc] transition-colors duration-200 font-secondary font-bold uppercase tracking-wider text-sm md:text-base"
                        style={{ borderRadius: '0px' }}
                    >
                        SEND MESSAGE
                    </button>
                </div>

                {submitted && (
                    <p className="mt-6 font-medium font-primary" style={{ color: '#00A8FF' }}>
                        Message sent successfully. I&apos;ll be in touch soon.
                    </p>
                )}
            </form>
        </Annotated>
    );
}
