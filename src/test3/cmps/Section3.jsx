import { useCallback, useState, useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { ItemTypes } from "../../ItemTypes";
import { Dustbin3 } from "./Dustbin3";

export function Section3({ index, moveChild }) {
    const [section, setSection] = useState({ id: 1, accepts: [ItemTypes.COLUMN], childrens: [] });
    const ref = useRef(null);
    const [{ handlerId }, sortDrop] = useDrop({
        accept: ItemTypes.SECTION,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveChild(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.SECTION,
        item: () => {
            return { id: section.id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drag(sortDrop(ref));
    const handleDrop = useCallback((item) => {
        setSection(update(section, {
            childrens: {
                $push: [item],
            }
        }));
    }, [section]);
    const renderDustbin = (section) => {
        return (<Dustbin3
            accept={section.accepts}
            childrens={section.childrens}
            onDrop={(item) => handleDrop(item)} />);
    };
    return (
        <section ref={ref} index={section.index} data-handler-id={handlerId}>
            {renderDustbin(section)}
        </section>
    )
}