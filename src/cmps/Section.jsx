import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { SECTION, SIDEBAR_ITEM, COMPONENT, SIDEBAR_ITEM_LAYOUT, INNERSECTION, COLUMN } from "../constants.js";
import { DropZone } from "./DropZone";
import Column from "./Column";
import { InnerSection } from "./InnerSection.jsx";

const style = {};
export function Section({ data, cmps, handleDrop, path, moveSection, moveColumn, updateComponent, onSelect, selected }) {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: SECTION,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    // hover(item, monitor) {
    //   if (!ref.current) {
    //     return;
    //   }
    //   const dragIndex = item.path;
    //   const hoverIndex = path;
    //   // Don't replace items with themselves
    //   if (dragIndex === hoverIndex) {
    //     return;
    //   }
    //   // Determine rectangle on screen
    //   const hoverBoundingRect = ref.current?.getBoundingClientRect();
    //   // Get vertical middle
    //   const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    //   // Determine mouse position
    //   const clientOffset = monitor.getClientOffset();
    //   // Get pixels to the top
    //   const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    //   // Only perform the move when the mouse has crossed half of the items height
    //   // When dragging downwards, only move when the cursor is below 50%
    //   // When dragging upwards, only move when the cursor is above 50%
    //   // Dragging downwards
    //   if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    //     return;
    //   }
    //   // Dragging upwards
    //   if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //     return;
    //   }
    //   // Time to actually perform the action
    //   moveSection(dragIndex, hoverIndex);
    //   // Note: we're mutating the monitor item here!
    //   // Generally it's better to avoid mutations,
    //   // but it's good here for the sake of performance
    //   // to avoid expensive index searches.
    //   item.path = hoverIndex;
    // },
  });
  const [{ isDragging }, drag] = useDrag({
    type: SECTION,
    item: {
      type: SECTION,
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
        cmps={column.cmps}
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
  const renderInnerSection = (innerSection, currentPath) => {

    return (
      <InnerSection
        key={innerSection.id}
        data={innerSection}
        components={cmps}
        handleDrop={handleDrop}
        path={currentPath}
        moveColumn={moveColumn}
        // moveinnerSection={moveinnerSection}
        updateComponent={updateComponent}
        onSelect={onSelect}
        selected={selected}
        onClick={() => onSelect('innersection', innerSection)}
      />
    );
  };



  return (
    <div ref={ref} style={{ ...style, opacity }} className={`base draggable section`}>
      {data.id}
      <div className="columns">
        {data.cmps.map((child, index) => {
          const currentPath = `${path}-${index}`;
          return (
            <React.Fragment key={child.id}>
              <DropZone
                data={{
                  path: currentPath,
                  childrenCount: data.cmps.length,
                }}
                accept={[SIDEBAR_ITEM, COMPONENT, SECTION, COLUMN, SIDEBAR_ITEM_LAYOUT]}
                onDrop={handleDrop}
                className="horizontalDrag"
              />
              {(child.type === COLUMN) && renderColumn(child, currentPath) || renderInnerSection(child, currentPath)}
            </React.Fragment>
          );


        })}
        <DropZone
          data={{
            path: `${path}-${data.cmps.length}`,
            childrenCount: data.cmps.length
          }}
          accept={[SIDEBAR_ITEM, COMPONENT, SECTION, COLUMN, SIDEBAR_ITEM_LAYOUT]}
          onDrop={handleDrop}
          className="horizontalDrag"
          isLast
        />
      </div>
    </div>
  );
};

