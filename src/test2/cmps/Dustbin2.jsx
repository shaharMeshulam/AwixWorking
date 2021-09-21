import React, { memo } from 'react';
import { useDrop } from 'react-dnd';
import { Section2 } from './Section2';
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
export const Dustbin2 = memo(function Dustbin2({ id, accept, childrens, onDrop, }) {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    const isActive = isOver && canDrop;
    let backgroundColor = '#222';
    if (isActive) {
        backgroundColor = 'darkgreen';
    }
    else if (canDrop) {
        backgroundColor = 'darkkhaki';
    }
    const KeysToComponentMap = {
        section: Section2
    };
    function renderer(config, index) {
        if (typeof KeysToComponentMap[config.component] !== "undefined") {
            console.log('config:', config)
            return React.createElement(
                KeysToComponentMap[config.component],
                {
                    index: index,
                    id: config.id,
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
