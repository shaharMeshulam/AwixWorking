import { useState } from 'react';
import { ItemTypes } from '../ItemTypes';
import { Content } from './Content';

export function Menu() {
    const [contents] = useState([
        { id: 1,component: 'section', type: ItemTypes.SECTION },
        { component: 'column', type: ItemTypes.COLUMN },
    ]);
    return (
        <ul>
            {contents.map(({ component, type }, index) => (<Content id="1" component={component} type={type} key={index} />))}
        </ul>
    )
}