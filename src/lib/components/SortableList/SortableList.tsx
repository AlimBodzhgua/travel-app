import { FC, ReactNode } from 'react';
import {
	DndContext,
	DragCancelEvent,
	DragEndEvent,
	DragMoveEvent,
	DragOverEvent,
	DragStartEvent,
	PointerSensor,
	UniqueIdentifier,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { SortableContext } from '@dnd-kit/sortable';

interface SortableListProps {
	children: ReactNode;
	items: (UniqueIdentifier | { id: UniqueIdentifier })[];
	onDragEnd?: (e: DragEndEvent) => void;
	onDragCancel?: (e: DragCancelEvent) => void;
	onDragStart?: (e: DragStartEvent) => void;
	onDragOver?: (e: DragOverEvent) => void;
	onDragMove?: (e: DragMoveEvent) => void;
}

export const SortableList: FC<SortableListProps> = (props) => {
	const {
		children,
		items,
		...handlerProps
	} = props;

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	return (
		<DndContext
			sensors={sensors}
			modifiers={[restrictToParentElement]}
			{...handlerProps}
		>
			<SortableContext items={items}>{children}</SortableContext>
		</DndContext>
	);
};
