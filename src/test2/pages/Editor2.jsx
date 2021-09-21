import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container2 } from '../cmps/Container2';
import { Menu } from '../../cmps/Menu';

export function Editor2() {
    return (
        <main className="editor flex">
            <DndProvider backend={HTML5Backend}>
                <div className="left">
                    <Menu />
                </div>
                <div className="right">
                    <Container2 />
                </div>
            </DndProvider>
        </main>
    )
}