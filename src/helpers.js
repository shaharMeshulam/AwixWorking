import shortid from "shortid";
import { SECTION, COLUMN, COMPONENT, INNERSECTION } from "./constants";

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed); // inserting task in new index

  return result;
};

export const remove = (arr, index) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // part of the array after the specified index
  ...arr.slice(index + 1)
];

export const insert = (arr, index, newItem) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index)
];

export const reorderChildren = (children, splitDropZonePath, splitItemPath) => {
  if (splitDropZonePath.length === 1) {
    const dropZoneIndex = Number(splitDropZonePath[0]);
    const itemIndex = Number(splitItemPath[0]);
    return reorder(children, itemIndex, dropZoneIndex);
  }

  const updatedChildren = [...children];

  const curIndex = Number(splitDropZonePath.slice(0, 1));

  // Update the specific node's children
  const splitDropZoneChildrenPath = splitDropZonePath.slice(1);
  const splitItemChildrenPath = splitItemPath.slice(1);
  const nodeChildren = updatedChildren[curIndex];
  updatedChildren[curIndex] = {
    ...nodeChildren,
    cmps: reorderChildren(
      nodeChildren.cmps,
      splitDropZoneChildrenPath,
      splitItemChildrenPath
    )
  };

  return updatedChildren;
};

export const removeChildFromChildren = (layout, splitItemPath) => {
  switch (splitItemPath.length) {
    case 1:
      layout.splice(splitItemPath[0], 1)
      return layout

    case 2:
      layout[splitItemPath[0]].cmps.splice(splitItemPath[1], 1)
      return layout

    case 3:
      layout[splitItemPath[0]].cmps[splitItemPath[1]].cmps.splice(splitItemPath[2], 1)
      return layout

    default:
      layout[splitItemPath[0]].cmps[splitItemPath[1]].cmps[splitItemPath[2]].cmps.splice(splitItemPath[3], 1)
      return layout
  }
};

export const addChildToChildren = (children, splitDropZonePath, item) => {
  if (splitDropZonePath.length === 1) {
    const dropZoneIndex = Number(splitDropZonePath[0]);
    return insert(children, dropZoneIndex, item);
  }

  const updatedChildren = [...children];

  let curIndex = Number(splitDropZonePath[0]);
  curIndex = (curIndex >= children.length) ? --curIndex : curIndex

  // Update the specific node's children
  const splitItemChildrenPath = splitDropZonePath.slice(1);
  const nodeChildren = updatedChildren[curIndex];
  updatedChildren[curIndex] = {
    ...nodeChildren,
    cmps: addChildToChildren(
      nodeChildren.cmps,
      splitItemChildrenPath,
      item
    )
  };

  return updatedChildren;
};

export const handleMoveWithinParent = (
  layout,
  splitDropZonePath,
  splitItemPath
) => {
  return reorderChildren(layout, splitDropZonePath, splitItemPath);
};

export const handleMoveSidebarColumnIntoParent = (
  layout,
  splitDropZonePath,
) => {
  switch (splitDropZonePath.length) {
    case 1:
      const newLayoutStructure = {
        type: SECTION,
        id: shortid.generate(),
        cmps: [_generateColumn()]
      };
      return addChildToChildren(layout, splitDropZonePath, newLayoutStructure);
    case 2:
      return addChildToChildren(layout, splitDropZonePath, _generateColumn());
  }
}

export const handleAddColumDataToRow = (layout, srcPath) => {
  let parentPath = srcPath;
  if (srcPath.length >= 2) parentPath = srcPath.slice(0, srcPath.length - 1)
  const layoutCopy = [...layout];
  const COLUMN_STRUCTURE = {
    type: COLUMN,
    id: shortid.generate(),
    cmps: []
  };
  return layoutCopy.filter(section => {
    return section.cmps.length
  })

};

export const handleMoveToDifferentParent = (
  layout,
  splitDropZonePath,
  splitItemPath,
  item
) => {
  let newLayoutStructure;
  const COLUMN_STRUCTURE = {
    type: COLUMN,
    id: shortid.generate(),
    cmps: [item]
  };

  const SECTION_STRUCTURE = {
    type: SECTION,
    id: shortid.generate()
  };

  switch (splitDropZonePath.length) {
    case 1: {
      // moving column outside into new row made on the fly
      if (item.type === COLUMN) {
        newLayoutStructure = {
          ...SECTION_STRUCTURE,
          cmps: [item]
        };
      } else {
        // moving component outside into new row made on the fly
        newLayoutStructure = {
          ...SECTION_STRUCTURE,
          cmps: [COLUMN_STRUCTURE]
        };
      }
      break;
    }
    case 2: {
      // moving component outside into a row which creates column
      if (item.type === COMPONENT) {
        newLayoutStructure = COLUMN_STRUCTURE;
      } else {
        // moving column into existing row
        newLayoutStructure = item;
      }

      break;
    }
    default: {
      newLayoutStructure = item;
    }
  }

  let updatedLayout = layout;
  updatedLayout = removeChildFromChildren(updatedLayout, splitItemPath);
  updatedLayout = handleAddColumDataToRow(updatedLayout, splitItemPath);
  updatedLayout = addChildToChildren(
    updatedLayout,
    splitDropZonePath,
    newLayoutStructure
  );

  return updatedLayout;
};

export const handleMoveSidebarInnerSectionIntoParent = (
  layout,
  splitDropZonePath,
) => {

  switch (splitDropZonePath.length) {

    case 1:
      const newLayoutStructure = {
        type: SECTION,
        id: shortid.generate(),
        cmps: [_generateInnerSection()]
      };
      return addChildToChildren(layout, splitDropZonePath, newLayoutStructure);
    case 2:
      return addChildToChildren(layout, splitDropZonePath, _generateInnerSection());
  }
}

export const handleMoveSidebarComponentIntoParent = (
  layout,
  splitDropZonePath,
  item
) => {
  let newLayoutStructure;
  switch (splitDropZonePath.length) {
    case 1: {
      newLayoutStructure = {
        type: SECTION,
        id: shortid.generate(),
        cmps: [_generateColumn(item)]
      };
      break;
    }
    case 2: {
      newLayoutStructure = _generateColumn(item);
      break;
    }
    default: {
      newLayoutStructure = item;
    }
  }

  return addChildToChildren(layout, splitDropZonePath, newLayoutStructure);
};

export const handleRemoveItemFromLayout = (layout, splitItemPath) => {
  return removeChildFromChildren(layout, splitItemPath);
};

export const translateStyle = (style) => {
  if (style.paddingTop) style.paddingTop = `${style.paddingTop}px`;
  if (style.paddingRight) style.paddingRight = `${style.paddingRight}px`;
  if (style.paddingBottom) style.paddingBottom = `${style.paddingBottom}px`;
  if (style.paddingLeft) style.paddingLeft = `${style.paddingLeft}px`;
  if (style.marginTop) style.marginTop = `${style.marginTop}px`;
  if (style.marginRight) style.paddingRight = `${style.marginRight}px`;
  if (style.marginBottom) style.marginBottom = `${style.marginBottom}px`;
  if (style.marginLeft) style.marginLeft = `${style.marginLeft}px`;
  return style;
}

const _generateColumn = (item = null) => {
  return {
    type: COLUMN,
    id: shortid.generate(),
    cmps: item ? [item] : [],
    style: {
      padding: 10,
      flexGrow: 1
    }
  }
}

const _generateInnerSection = (item = null) => {
  return {
    type: INNERSECTION,
    id: shortid.generate(),
    cmps: [_generateColumn(), _generateColumn(), _generateColumn()],
    style: {
      padding: 10,
      flexGrow: 1
    }
  }
}
