import { useCallback, useState } from "react";
import update from 'immutability-helper';
import { ItemTypes } from "../../ItemTypes";
import { Dustbin2 } from "./Dustbin2";

export function Section2() {
    const [section, setSection] = useState({ id: 1, accepts: [ItemTypes.COLUMN], childrens: [] });
    const handleDrop = useCallback((item) => {
        setSection(update(section, {
            childrens: {
                $push: [item],
            }
        }));
    }, [section]);
    const renderDustbin = (section) => {
        return (<Dustbin2
            key={section.id}
            id={section.id}
            accept={section.accepts}
            childrens={section.childrens}
            onDrop={(item) => handleDrop(item)} />);
    };
    return (
        <section>
            {renderDustbin(section)}
        </section>
    )
}