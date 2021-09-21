import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container3 } from '../cmps/Container3';
import { Menu } from '../../cmps/Menu';

export function Editor3() {
    return (
        <main className="editor flex">
            <DndProvider backend={HTML5Backend}>
                <div className="left">
                    <Menu />
                </div>
                <div className="right">
                    <Container3 />
                </div>
            </DndProvider>
        </main>
    )
}