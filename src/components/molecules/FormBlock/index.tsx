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

    // This specific color matches the standard placeholder gray
    const placeholderColor = '#9ca3af';

    return (
        <Annotated content={{}}>
            <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="w-full block relative z-10"
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
                            // border-[#9ca3af] matches the placeholder text color
                            className="border border-[#9ca3af] placeholder-[#9ca3af] !rounded-none px-3 py-2 w-full bg-white text-black focus:outline-none focus:border-blue-600 appearance-none"
                            style={{ borderRadius: '0px' }}
                        />
                    ))}
                    <textarea
                        name="messageInquiry"
                        placeholder="Type your message / inquiry here"
                        rows={4}
                        className="border border-[#9ca3af] placeholder-[#9ca3af] !rounded-none px-3 py-2 w-full col-span-1 sm:col-span-2 bg-white text-black focus:outline-none focus:border-blue-600 appearance-none"
                        style={{ borderRadius: '0px' }}
                    />
                </div>

                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center px-10 py-3 text-lg text-white bg-blue-600 !rounded-none hover:bg-blue-700 transition font-semibold"
                        style={{ borderRadius: '0px' }}
                    >
                        SEND MESSAGE
                    </button>
                </div>

                {submitted && (
                    <p className="mt-4 text-center font-medium" style={{ color: '#00A8FF' }}>
                        Message sent successfully. I&apos;ll be in touch soon.
                    </p>
                )}
            </form>
        </Annotated>
    );
}
