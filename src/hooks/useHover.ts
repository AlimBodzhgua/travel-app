import {useState} from 'react';

interface hoverProps {
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}

export const useHover = ():[boolean, hoverProps] => {
	const [hovering, setHovering] = useState<boolean>(false);

	const hoverProps:hoverProps = {
		onMouseEnter: () => setHovering(true),
		onMouseLeave: () => setHovering(false)
	}

	return [hovering, hoverProps]
}