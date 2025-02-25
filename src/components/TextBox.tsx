import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import classNames from "classnames";

/**
 * Props for the TextBox component.
 */
interface TextBoxProps {
    /** The value of the input field */
    value: string;
    /** The type of the input field (e.g., text, password) */
    type?: string;
    /** The placeholder text for the input field */
    placeholder: string;
    /** Optional caption text displayed above the input field */
    caption?: string;
    /** The autoComplete attribute for the input field */
    autoComplete?: string;
    /** Callback function to handle changes in the input field */
    onChange: (value: string) => void;
    /** Whether the input field is disabled */
    disabled?: boolean;
    /** The width of the input field container */
    width?: string;
    /** Custom class name for the input field container */
    componentClassName?: string;
    /** Custom class name for the caption */
    captionClassName?: string;
    /** Custom class name for the input field */
    inputClassName?: string;
    /** Optional error text displayed below the input field */
    errorText?: string;
    /** Optional error text color */
    errorTextColor?: string;
    /** Optional maximum character count */
    maxCharCount?: number;
    /** Callback function to handle key press events in the input field */
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    /** Whether the input text should be in uppercase */
    uppercase?: boolean;
    /** Optional background color for the input field */
    backgroundColor?: string;
    /** Optional border color for the input field */
    borderColor?: string;
}

/**
 * TextBox component renders an input field with optional caption and error text.
 *
 * @param {TextBoxProps} props - The props for the TextBox component.
 * @returns {JSX.Element} The rendered TextBox component.
 */
const TextBox: React.FC<TextBoxProps> = ({
    value = "",
    type = "text",
    placeholder = "Placeholder",
    autoComplete = "off",
    onChange = () => { },
    disabled = false,
    width = "w-full",
    componentClassName = "",
    captionClassName = "",
    inputClassName = "",
    caption,
    errorText,
    errorTextColor = "text-red",
    maxCharCount,
    onKeyDown,
    uppercase = false,
    backgroundColor = "bg-white",
    borderColor = "border-gray-300",
}) => {
    const [internalErrorText, setInternalErrorText] = useState<string | undefined>(errorText);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;
        if (uppercase) {
            inputValue = inputValue.toUpperCase();
        }
        if (!maxCharCount || inputValue.length <= maxCharCount) {
            setInternalErrorText(undefined);
            onChange(inputValue);
        } else {
            setInternalErrorText(`Exceeded max count of ${maxCharCount}`);
        }
    };
    return (
        <div className={classNames(width, componentClassName)}>
            {caption && (
                <label
                    className={classNames(
                        "block mb-1 text-sm font-medium text-white",
                        captionClassName
                    )}
                >
                    {caption}
                </label>
            )}
            <input
                type={type}
                value={value}
                autoComplete={autoComplete}
                placeholder={placeholder}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                disabled={disabled}
                className={classNames(
                    "block w-full rounded-md border px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-opacity-20 focus:ring-inset hover:ring-blue focus:ring-blue sm:text-sm sm:leading-6 duration-300 ease-in-out transition-all",
                    backgroundColor,
                    borderColor,
                    inputClassName
                )}
            />
            {(internalErrorText || errorText) && (
                <p className={classNames("mt-1 text-xs", errorTextColor)}>
                    {internalErrorText || errorText}
                </p>
            )}
        </div>
    );
};

export default TextBox;
