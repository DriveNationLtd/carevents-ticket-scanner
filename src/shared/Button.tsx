import { clsx } from "clsx";
import { useFormStatus } from "react-dom";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = (props) => {
    const { pending } = useFormStatus();


    const renderIcon = () => {
        if (pending) {
            return <i className="ml-2 fas fa-spinner fa-spin"></i>
        }

        if (props.icon) {
            return <i className="ml-2 fas fa-chevron-right"></i>
        }
    }
    return (
        <button
            {...props}
            className={clsx(
                "uppercase bg-theme-primary w-full hover:bg-theme-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
                pending && "cursor-not-allowed bg-theme-primary-light",
                props.className
            )}
            disabled={pending}
        >
            {props.children} {renderIcon()}
        </button>
    );
}