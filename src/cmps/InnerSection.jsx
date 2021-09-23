import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { SIDEBAR_ITEM, COMPONENT, INNERSECTION, COLUMN } from "../constants.js";
import { DropZone } from "./DropZone";
import Column from "./Column";

const style = { flex: '1' };
export function InnerSection({ data, components, handleDrop, path, moveSection, moveColumn, updateComponent, onSelect, selected }) {
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: INNERSECTION,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.path;
            const hoverIndex = path;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveSection(dragIndex, hoverIndex);
            item.path = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: INNERSECTION,
        item: {
            type: INNERSECTION,
            id: data.id,
            children: data.children,
            path
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });


    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    const renderColumn = (column, currentPath) => {
        return (
            <Column
                key={column.id}
                data={column}
                components={components}
                handleDrop={handleDrop}
                path={currentPath}
                moveColumn={moveColumn}
                updateComponent={updateComponent}
                onSelect={onSelect}
                selected={selected}
                onClick={() => onSelect('column', column)}
            />
        );
    };

    return (
        <div ref={ref} style={{ ...style, opacity }} className={`base draggable section`}>
            {data.id}
            <div className="columns">
                {data.children.map((column, index) => {
                    const currentPath = `${path}-${index}`;

                    return (
                        <React.Fragment key={column.id}>
                            <DropZone
                                data={{
                                    path: currentPath,
                                    childrenCount: data.children.length,
                                }}
                                accept={[SIDEBAR_ITEM, COMPONENT, COLUMN]}
                                onDrop={handleDrop}
                                className="horizontalDrag"
                            />
                            {renderColumn(column, currentPath)}
                        </React.Fragment>
                    );
                })}
                <DropZone
                    data={{
                        path: `${path}-${data.children.length}`,
                        childrenCount: data.children.length
                    }}
                    accept={[SIDEBAR_ITEM, COMPONENT, COLUMN]}
                    onDrop={handleDrop}
                    className="horizontalDrag"
                    isLast
                />
            </div>
        </div>
    );
};

