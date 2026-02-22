import { Annotated } from '@/components/Annotated';

export default function FormBlock() {
    return (
        <Annotated content={{}}>
            {/* We are removing the 'onSubmit' and 'fetch' to test a direct browser POST */}
            <form
                name="contact"
                method="POST"
                action="/form-check.html"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                // This 'style' line is the direct fix for the small/centered layout
                style={{ display: 'block', width: '100%', minWidth: '100%' }}
                className="max-w-2xl mx-auto p-4 block w-full relative z-50"
            >
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
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
                        placeholder="Message"
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
            </form>
        </Annotated>
    );
}
