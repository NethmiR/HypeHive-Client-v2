import React, { FC } from "react";
import classNames from "classnames";

interface ButtonProps {
    caption: string;
    onClick: () => void;
    width?: string;
    background?: string;
    icon?: React.ComponentType<{ className?: string }> | null;
    textColor?: string;
    iconColor?: string;
    buttonClassName?: string;
    iconClassName?: string;
    disabled?: boolean;
    borderColor?: string;
}

const Button: FC<ButtonProps> = ({
    caption = "Button",
    onClick = () => { },
    width = "w-auto",
    background = "bg-red",
    icon: Icon = null,
    textColor = "text-white",
    iconColor = "text-white",
    buttonClassName = "",
    iconClassName = "",
    disabled = false,
    borderColor = "border-transparent",
}) => {
    return (
        <button
            onClick={onClick}
            className={classNames(
                "rounded-md border-2",
                background,
                borderColor,
                width,
                "px-10 py-2 text-sm font-semibold shadow-sm my-2 flex justify-center items-center bg-opacity-100 hover:bg-opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all duration-300 ease-in-out",
                textColor,
                buttonClassName,
                { "opacity-50 cursor-not-allowed": disabled }
            )}
            disabled={disabled}
        >
            {Icon && (
                <Icon
                    className={classNames("text-md mr-3", iconColor, iconClassName)}
                />
            )}
            <span>{caption}</span>
        </button>
    );
}
export default Button;
