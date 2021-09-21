import { useState, useCallback, memo } from 'react';
import update from 'immutability-helper';
import { ItemTypes } from "../../ItemTypes";
import { Dustbin2 } from './Dustbin2';

export const Container2 = memo(function Container2() {
    const [container, setContainer] = useState({ id: 1, accepts: [ItemTypes.SECTION], childrens: [] });
    const handleDrop = useCallback((item) => {
        setContainer(update(container, {
            childrens: {
                $push: [item],
            },
        }));
    }, [container]);
    const renderDustbin = (container) => {
        return (<Dustbin2
            key={container.id}
            id={container.id}
            accept={container.accepts}
            childrens={container.childrens}
            onDrop={(item) => handleDrop(item)} />);
    };
    return (
        <div>{renderDustbin(container)}</div>
    )
})