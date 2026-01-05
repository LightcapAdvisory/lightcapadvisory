import { Annotated } from '@/components/Annotated';
import { iconMap } from '@/components/svgs';
import classNames from 'classnames';
import Link from '../Link';

export default function Social(props) {
    const { elementId, className, label, altText, url, icon = 'linkedin' } = props;
    const IconComponent = iconMap[icon.toLowerCase()]; // ensure lowercase matches iconMap

    return (
        <Annotated content={props}>
            <Link
                href={url}
                aria-label={altText}
                id={elementId || null}
                className={classNames('inline-flex items-center justify-center no-underline', className)}
            >
                {label && <span className="sr-only">{label}</span>}
                {IconComponent && (
                    <IconComponent
                        className={classNames('fill-current', className)}
                        width={40} // explicit width
                        height={40} // explicit height
                    />
                )}
            </Link>
        </Annotated>
    );
}
