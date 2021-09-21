import React, { memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../ItemTypes';
import { Section3 } from './Section3';
const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
};
export const Dustbin3 = memo(function Dustbin3({ id, index, accept, childrens, onDrop, moveChild }) {
    // const ref = useRef(null);
    // const [{ handlerId }, sortDrop] = useDrop({
    //     accept: ItemTypes.SECTION,
    //     collect(monitor) {
    //         return {
    //             handlerId: monitor.getHandlerId(),
    //         };
    //     },
    //     hover(item, monitor) {
    //         if (!ref.current) {
    //             return;
    //         }
    //         const dragIndex = item.index;
    //         const hoverIndex = index;
    //         // Don't replace items with themselves
    //         if (dragIndex === hoverIndex) {
    //             return;
    //         }
    //         // Determine rectangle on screen
    //         const hoverBoundingRect = ref.current?.getBoundingClientRect();
    //         // Get vertical middle
    //         const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    //         // Determine mouse position
    //         const clientOffset = monitor.getClientOffset();
    //         // Get pixels to the top
    //         const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    //         // Only perform the move when the mouse has crossed half of the items height
    //         // When dragging downwards, only move when the cursor is below 50%
    //         // When dragging upwards, only move when the cursor is above 50%
    //         // Dragging downwards
    //         if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    //             return;
    //         }
    //         // Dragging upwards
    //         if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //             return;
    //         }
    //         // Time to actually perform the action
    //         moveChild(dragIndex, hoverIndex);
    //         // Note: we're mutating the monitor item here!
    //         // Generally it's better to avoid mutations,
    //         // but it's good here for the sake of performance
    //         // to avoid expensive index searches.
    //         item.index = hoverIndex;
    //     },
    // });
    // const [{ isDragging }, drag] = useDrag({
    //     type: ItemTypes.SECTION,
    //     item: () => {
    //         return { id, index };
    //     },
    //     collect: (monitor) => ({
    //         isDragging: monitor.isDragging(),
    //     }),
    // });
    const [{ isOver, canDrop }, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    // drag(sortDrop(ref));
    const isActive = isOver && canDrop;
    let backgroundColor = '#222';
    if (isActive) {
        backgroundColor = 'darkgreen';
    }
    else if (canDrop) {
        backgroundColor = 'darkkhaki';
    }
    const KeysToComponentMap = {
        section: Section3
    };
    function renderer(config, index) {
        if (typeof KeysToComponentMap[config.component] !== "undefined") {
            console.log('config:', config)
            return React.createElement(
                KeysToComponentMap[config.component],
                {
                    index: index,
                    id: config.id,
                    key: index,
                    moveChild
                    // theRef: ref,
                    // handlerId: handlerId
                },
                config.children &&
                (typeof config.children === "string"
                    ? config.children
                    : config.children.map(c => renderer(c, index + 1)))
            );
        }
    }
    return (<div ref={drop} role="Dustbin" style={{ ...style, backgroundColor }}>
        {isActive
            ? 'Release to drop'
            : `This dustbin accepts: ${accept.join(', ')}`}

        {childrens && (<p>Childrens: {JSON.stringify(childrens)}</p>)}
        {childrens.map((child, index) => renderer(child, index))};
    </div>);
});
