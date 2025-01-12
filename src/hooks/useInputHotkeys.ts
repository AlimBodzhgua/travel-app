import { useEffect, useRef } from 'react';

interface InputHotkeysProps {
	onSave: () => void;
	onCancel: () => void;
}

export const useInputHotkeys = ({ onSave, onCancel }: InputHotkeysProps) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const onHotkeyPress = (e: KeyboardEvent) => {
        const isFocused = inputRef.current === document.activeElement;

        if (e.key === 'Enter' && isFocused) {
            onSave();
        } else if (e.key === 'Escape' && isFocused) {
            onCancel();
        }
    };

	useEffect(() => {
		window.addEventListener('keydown', onHotkeyPress);

        return () => window.removeEventListener('keydown', onHotkeyPress);
	}, [onHotkeyPress]);

	return inputRef;
};