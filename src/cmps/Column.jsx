import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {translateStyle} from '../helpers';
import { COLUMN } from "../constants";
import { DropZone } from "./DropZone";
import Component from "./Component";

const Column = ({ data, cmps, handleDrop, path, moveColumn, updateComponent, onSelect, selected }) => {
  console.log('column data', data)
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: COLUMN,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    // hover(item, monitor) {
    //   if (!ref.current) {
    //     return;
    //   }
    //   // console.log('currPath:', path, 'destPath', item.path)
    //   const dragPath = path.split('-');
    //   const currPath = item.path.split('-');
    //   const dragIndex = (dragPath[0] === currPath[0]) ? item.path.split('-')[1] : -1;
    //   const hoverIndex = dragPath[1];
    //   // console.log('currPath:', currPath, 'dragPath', dragPath)
    //   // Don't replace items with themselves
    //   if (dragPath === currPath) {
    //     return;
    //   }
    //   // Determine rectangle on screen
    //   const hoverBoundingRect = ref.current?.getBoundingClientRect();
    //   // console.log('hoverBoundingRect', hoverBoundingRect);
    //   // Get horizontal middle
    //   const hoverMiddleX = (hoverBoundingRect.left) + hoverBoundingRect.width / 2;
    //   // Determine mouse position
    //   const clientOffset = monitor.getClientOffset();
    //   // console.log('clientOffset', clientOffset);
    //   // Get pixels to the top
    //   const hoverClientX = clientOffset.x //- hoverBoundingRect.left;
    //   // console.log('hoverClientX:', hoverClientX, 'hoverMiddleX', hoverMiddleX)
    //   // Only perform the move when the mouse has crossed half of the items height
    //   // When dragging downwards, only move when the cursor is below 50%
    //   // When dragging upwards, only move when the cursor is above 50%
    //   // Dragging left
    //   if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
    //     return;
    //   }
    //   // Dragging right
    //   if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
    //     return;
    //   }
    //   // // Time to actually perform the action
    //   moveColumn(currPath, dragPath);
    //   // // Note: we're mutating the monitor item here!
    //   // // Generally it's better to avoid mutations,
    //   // // but it's good here for the sake of performance
    //   // // to avoid expensive index searches.
    //   item.path = path;
    // },
  });

  const [{ isDragging }, drag] = useDrag({
    type: COLUMN,
    item: {
      type: COLUMN,
      id: data.id,
      cmps: data.cmps,
      path
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  
  const renderComponent = (component, currentPath) => {
    console.log('column cmps', cmps)
    console.log('component', component)
    const compPath = currentPath.split('-');
    return (
      <Component
        key={component.id}
        data={component}
        path={currentPath}
        updateComponent={updateComponent}
        select={onSelect}
        selected={selected}
      />
    );
  };

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  
  const style = translateStyle({...data.style});
  console.log('style from column', style)
  return (
    <div
      ref={ref}
      style={{ ...style, opacity }}
      className={`base draggable column ${selected && selected.id === data.id ? 'selected' : ''}`}
      onClick={()=> onSelect('column', path.split('-'))}
    >
      {data.id}
      {data.cmps.map((component, index) => {
        const currentPath = `${path}-${index}`;

        return (
          <React.Fragment key={component.id}>
            <DropZone
              data={{
                path: currentPath,
                childrenCount: data.cmps.length
              }}
              onDrop={handleDrop}
            />
            {renderComponent(component, currentPath)}
          </React.Fragment>
        );
      })}
      <DropZone
        data={{
          path: `${path}-${data.cmps.length}`,
          childrenCount: data.cmps.length
        }}
        onDrop={handleDrop}
        isLast
      />
    </div>
  );
};
export default Column;
