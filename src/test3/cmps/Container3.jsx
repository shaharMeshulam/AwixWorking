import { useState, useCallback, memo } from 'react';
import update from 'immutability-helper';
import { ItemTypes } from "../../ItemTypes";
import { Dustbin3 } from './Dustbin3';

export const Container3 = memo(function Container3() {
    const [container, setContainer] = useState({ id: 1, accepts: [ItemTypes.SECTION], childrens: [] });
    const moveChild = useCallback((dragIndex, hoverIndex) => {
        const dragChild = container.childrens[dragIndex];
        setContainer(update(container, {
            childrens: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragChild],
                ],
            }
        }));
    }, [container]);
    const handleDrop = useCallback((item) => {
        setContainer(update(container, {
            childrens: {
                $push: [item],
            },
        }));
    }, [container]);
    const renderDustbin = (container) => {
        return (<Dustbin3
            key={container.id}
            id={container.id}
            accept={container.accepts}
            childrens={container.childrens}
            onDrop={(item) => handleDrop(item)} 
            moveChild={moveChild}
            index={0}/>);
    };
    return (
        <div>{renderDustbin(container)}</div>
    )
})