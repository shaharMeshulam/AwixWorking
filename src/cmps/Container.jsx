import { useState, useCallback } from 'react';
import update from 'immutability-helper';
import { Dustbin } from './Dustbin';
import { ItemTypes } from '../ItemTypes';
const style = {
    width: 400,
};
export function Container() {
    {
        const [dustbins, setDustbins] = useState([
            { id: 1, accepts: [ItemTypes.SECTION], childrens: [], text: 'Main dustbin' }
        ]);
        const [droppedDustBinNames, setDroppedDustBinNames] = useState([]);
        const moveDustbins = useCallback((dragIndex, hoverIndex) => {
            const dragSection = dustbins.childrens[dragIndex];
            setDustbins(update(dustbins.childrens, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragSection],
                ],
            }));
        }, [dustbins.childrens]);
        const handleDrop = useCallback((index, item) => {
            console.log("item", item);
            const { component } = item;
            setDroppedDustBinNames(update(droppedDustBinNames, component ? { $push: [component] } : { $push: [] }));
            setDustbins(update(dustbins, {
                [index]: {
                    childrens: {
                        $push: [item],
                    },
                },
            }));
        }, [droppedDustBinNames, dustbins]);
        const renderDustbin = (dustbin, index) => {
            return (<Dustbin 
                key={dustbin.id} 
                index={index} 
                id={dustbin.id} 
                text={dustbin.text} 
                moveDustbins={moveDustbins} 
                accept={dustbin.accepts} 
                childrens={dustbin.childrens} 
                onDrop={(item) => handleDrop(index, item)}/>);
        };
        return (<>
            <div style={style}>{dustbins.map((dustbin, i) => renderDustbin(dustbin, i))}</div>
        </>);
    }
};
