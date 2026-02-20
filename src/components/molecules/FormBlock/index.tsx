import classNames from 'classnames';
import * as React from 'react';

import { Annotated } from '@/components/Annotated';
import { DynamicComponent } from '@/components/components-registry';
import { mapStylesToClassNames as mapStyles } from '@/utils/map-styles-to-class-names';

export default function FormBlock(props) {
    const formRef = React.createRef<HTMLFormElement>();
    const { elementId, className, fields = [], submitLabel, styles = {} } = props;

    if (fields.length === 0) {
        return null;
    }

    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(formRef.current);
        const value = Object.fromEntries(data.entries());
        const subject = encodeURIComponent('Form Submission from Lightcap Advisory');
        const body = value.messageInquiry;
        const from = value.email;
        window.location.href = `mailto:josh@lightcapadvisory.com?subject=${subject}&body=${body}${from ? `&from=${encodeURIComponent(`${from}`)}` : ''}`;
    }

    return (
        <Annotated content={props}>
            <form className={className} name={elementId} id={elementId} onSubmit={handleSubmit} ref={formRef}>
                <div className="grid gap-6 sm:grid-cols-2">
                    <input type="hidden" name="form-name" value={elementId} />
                    {fields.map((field, index) => {
                        return <DynamicComponent key={index} {...field} />;
                    })}
                </div>
                <div
                    className={classNames('mt-8', mapStyles({ textAlign: styles.self?.textAlign ?? 'left' }))}
                    style={{ color: '#00A8FF' }}
                >
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center px-5 py-4 text-lg transition border-2 hover:-translate-y-1.5"
                        style={{ color: '#00A8FF' }}
                    >
                        {submitLabel}
                    </button>
                </div>
            </form>
        </Annotated>
    );
}
