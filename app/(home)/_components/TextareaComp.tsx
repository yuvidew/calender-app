import { Textarea } from '@/components/ui/textarea';
import React, { useState, useEffect, useRef } from 'react';

interface AutoResizeTextareaProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export const TextareaComp: React.FC<AutoResizeTextareaProps> = ({
    value,
    onChange,
    placeholder,
    className
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement> ) => {
        onChange(e.target.value);
    };

    return (
        <Textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`resize-none overflow-hidden bg-transparent text-[1rem] p-0 border-none m-0 ${className}`}
            rows={1}
        />
    );
};
