import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container } from '../cmps/Container';
import { Menu } from '../cmps/Menu';

export function Editor() {
    return (
        <main className="editor flex">
            <DndProvider backend={HTML5Backend}>
                <div className="left">
                    <Menu />
                </div>
                <div className="right">
                    <Container />
                </div>
            </DndProvider>
        </main>
    )
}