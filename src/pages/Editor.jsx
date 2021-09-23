import React, { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from 'immutability-helper';
import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN, SECTION } from "../constants";
import { SideBarItem } from "../cmps/SideBarItem";
import { DropZone } from "../cmps/DropZone";
import shortid from "shortid";
import {
    handleMoveWithinParent,
    handleMoveToDifferentParent,
    handleMoveSidebarComponentIntoParent,
    handleMoveSidebarColumnIntoParent,
    handleRemoveItemFromLayout
} from "../helpers";
import { Section } from "../cmps/Section";
import { SideBar } from "../cmps/SideBar";

export function Editor() {
    const [layout, setLayout] = useState([]);
    const [components, setComponents] = useState([]);
    const [selected, setSelected] = useState(null);
    const moveSection = useCallback((dragIndex, hoverIndex) => {
        const dragSection = layout[dragIndex];
        setLayout(update(layout, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragSection],
            ],
        }));
    }, [layout]);
    const moveColumn = useCallback((currPath, dragPath) => {
        // console.log('currPath:', currPath, 'dragPath:', dragPath)
        const currColumn = layout[currPath[0]].children[currPath[1]];
        if (currColumn.id === layout[dragPath[0]].children[dragPath[1]].id) return
        if (currPath[0] === dragPath[0]) {
            setLayout(update(layout, {
                [currPath[0]]: {
                    children: {
                        $splice: [
                            [currPath[1], 1],
                            [dragPath[1], 0, currColumn],
                        ],
                    }
                    // [dragPath[0]]: {
                    //     $splice: [
                    //         [dragPath[1], 0, currColumn],
                    //     ],
                    // }
                },
                // [dragPath[0]]: {
                //     children: {
                //         $splice: [
                //             [dragPath[1], 0, currColumn],
                //         ],
                //     }
                //     // [currPath[0]]: {
                //     //     $splice: [
                //     //         [dragPath[1], 0, dragColumn],
                //     //     ],
                //     // }
                // }
            }));
        } else {
            setLayout(update(layout, {
                [currPath[0]]: {
                    children: {
                        $splice: [
                            [currPath[1], 1],
                        ],
                    }
                },
                [dragPath[0]]: {
                    children: {
                        $splice: [[dragPath[1], 0, currColumn]],
                    }
                }
            }))
        }
        // setLayout(update(layout, {
        //     [dragPath[0]]: {
        //         children: {
        //             $splice: [
        //                 [dragPath[1], 0, currColumn],
        //             ],
        //         }
        //         // [currPath[0]]: {
        //         //     $splice: [
        //         //         [dragPath[1], 0, dragColumn],
        //         //     ],
        //         // }
        //     }
        // }));
        // setLayout(update(layout, {
        //     [currPath[0]]: {
        //         children: {
        //             $splice: [
        //                 [currPath[1], 1],
        //                 [dragPath[1], 0, currColumn],
        //             ],
        //         }
        //         // [dragPath[0]]: {
        //         //     $splice: [
        //         //         [dragPath[1], 0, currColumn],
        //         //     ],
        //         // }
        //     },
        //     [dragPath[0]]: {
        //         children: {
        //             $splice: [
        //                 [dragPath[1], 0, currColumn],
        //             ],
        //         }
        //     }
        // }));
    }, [layout]);
    const updateComponent = (comp, field, value) => {
        switch (comp.type) {
            case 'text':
                setComponents(update(components, {
                    [comp.id]: {
                        [field]: { $set: value }
                    }
                }))
                break;
            case 'column':
                setLayout(update(layout, {
                    [selected.path[0]]: {
                        children: {
                            [selected.path[1]]: {
                                [field]: { $set: value }
                            }
                        }
                    }
                }))
        }
    }
    const onSelect = (type, idOrPath) => {
        switch (type) {
            case 'component':
                setSelected(components[idOrPath]);
                break;
            case 'column':
                setSelected({ ...layout[idOrPath[0]].children[idOrPath[1]], path: idOrPath });
                break;
        }

    }
    const handleDrop = useCallback(
        (dropZone, item) => {
            console.log('dropZone', dropZone)
            console.log('item', item)

            const splitDropZonePath = dropZone.path.split("-");
            const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

            const newItem = { id: item.id, type: item.type };
            if (item.type === COLUMN || item.type === SECTION) {
                newItem.children = item.children;
            }

            // sidebar into
            if (item.type === SIDEBAR_ITEM) {
                // 1. Move sidebar item into page
                if (item.component.type === COLUMN) {
                    console.log('drop column, path: ' + splitDropZonePath);

                    setLayout(
                        handleMoveSidebarColumnIntoParent(
                            layout,
                            splitDropZonePath
                        )
                    );


                    return;
                }
                const newComponent = {
                    id: shortid.generate(),
                    ...item.component
                };


                if (item.component.type === "innersection") {

                }

                const newItem = {
                    id: newComponent.id,
                    type: COMPONENT
                };
                setComponents({
                    ...components,
                    [newComponent.id]: newComponent
                });
                setLayout(
                    handleMoveSidebarComponentIntoParent(
                        layout,
                        splitDropZonePath,
                        newItem
                    )
                );
                return;
            }

            // move down here since sidebar items dont have path
            const splitItemPath = item.path.split("-");
            const pathToItem = splitItemPath.slice(0, -1).join("-");

            // 2. Pure move (no create)
            if (splitItemPath.length === splitDropZonePath.length) {
                // 2.a. move within parent
                if (pathToItem === pathToDropZone) {
                    setLayout(
                        handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
                    );
                    return;
                }

                // 2.b. OR move different parent
                // TODO FIX columns. item includes children
                setLayout(
                    handleMoveToDifferentParent(
                        layout,
                        splitDropZonePath,
                        splitItemPath,
                        newItem
                    )
                );
                return;
            }

            // 3. Move + Create
            setLayout(
                handleMoveToDifferentParent(
                    layout,
                    splitDropZonePath,
                    splitItemPath,
                    newItem
                )
            );
        },
        [layout, components]
    );
    const renderSection = (section, currentPath) => {
        return (
            <Section
                key={section.id}
                data={section}
                handleDrop={handleDrop}
                components={components}
                path={currentPath}
                moveSection={moveSection}
                moveColumn={moveColumn}
                updateComponent={updateComponent}
                onSelect={onSelect}
                selected={selected}
            />
        );
    };
    const getSelected = (s) => {
        if (!s) return;
        const path = s.path;
        if (path) {
            switch (s.type) {
                case 1://Section
                    break;
                case 'column'://Column
                    return layout[path[0]].children[path[1]];

            }
        } else {
            //component
            return components[s.id];
        }
    }
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="body">
                <SideBar sideBarItems={SIDEBAR_ITEMS} selected={getSelected(selected)} update={updateComponent} />
                <div className="pageContainer">
                    <div className="page">
                        {layout.map((section, index) => {
                            const currentPath = `${index}`;

                            return (
                                <React.Fragment key={section.id}>
                                    <DropZone
                                        data={{
                                            path: currentPath,
                                            childrenCount: layout.length
                                        }}
                                        onDrop={handleDrop}
                                        path={currentPath}
                                        accept={[SIDEBAR_ITEM, COMPONENT, SECTION, COLUMN, "innersection"]}
                                    />
                                    {renderSection(section, currentPath)}
                                </React.Fragment>
                            );
                        })}
                        <DropZone
                            data={{
                                path: `${layout.length}`,
                                childrenCount: layout.length
                            }}
                            accept={[SIDEBAR_ITEM, COMPONENT, SECTION, COLUMN, "innersection"]}
                            onDrop={handleDrop}
                            isLast
                        />
                    </div>
                </div>
            </div>
        </DndProvider>
    )
}