import React, { memo, useState, useCallback } from 'react';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import { Section } from './Section';
const style = {
    height: '50rem',
    width: '50rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
};
export const Dustbin = memo(function Dustbin({ accept, childrens, onDrop, }) {
    const [dustbins, setDustbins] = useState([...childrens]);
    const moveDustbins = useCallback((dragIndex, hoverIndex) => {
        const dragSection = dustbins[dragIndex];
        setDustbins(update(dustbins, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragSection],
            ],
        }));
    }, [dustbins]);
    const [{ isOver, canDrop }, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    const isActive = isOver && canDrop;
    const KeysToComponentMap = {
        section: Section
    };
    function renderer(config, index) {
        if (typeof KeysToComponentMap[config.component] !== "undefined") {
            console.log('config:', config)
            return React.createElement(
                KeysToComponentMap[config.component],
                {
                    index: index,
                    id: config.id,
                    moveDustbins
                },
                config.children &&
                (typeof config.children === "string"
                    ? config.children
                    : config.children.map(c => renderer(c, index + 1)))
            );
        }
    }
    let backgroundColor = '#222';
    if (isActive) {
        backgroundColor = 'darkgreen';
    }
    else if (canDrop) {
        backgroundColor = 'darkkhaki';
    }
    return (<div ref={drop} role="Dustbin" style={{ ...style, backgroundColor }}>
        {isActive
            ? 'Release to drop'
            : `This dustbin accepts: ${accept.join(', ')}`}
        {childrens.map(children => renderer(children, 0))}
        {childrens && (<p>Dropped: {JSON.stringify(childrens)}</p>)}
    </div>);
});
