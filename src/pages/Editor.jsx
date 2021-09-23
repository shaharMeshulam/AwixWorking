import React, { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from 'immutability-helper';
import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN, SECTION, SIDEBAR_ITEM_LAYOUT, INNERSECTION } from "../constants";
import { SideBarItem } from "../cmps/SideBarItem";
import { DropZone } from "../cmps/DropZone";
import shortid from "shortid";
import {
    handleMoveWithinParent,
    handleMoveToDifferentParent,
    handleMoveSidebarComponentIntoParent,
    handleMoveSidebarColumnIntoParent,
    handleMoveSidebarInnerSectionIntoParent
} from "../helpers";
import { Section } from "../cmps/Section";
import { SideBar } from "../cmps/SideBar";

export function Editor() {
    const [layout, setLayout] = useState({
        cmps: [],
        style: {}
    });
    // const [components, setComponents] = useState([]);
    const [selected, setSelected] = useState(null);
    const moveSection = useCallback((dragIndex, hoverIndex) => {
        const dragSection = layout.layout[dragIndex];
        setLayout(update(layout, {
            cmps: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragSection],
                ],
            }
        }));
    }, [layout]);
    const moveColumn = useCallback((currPath, dragPath) => {
        var currColumn;
        var dragColumn;

        switch (currPath.length) {
            case 2:
                currColumn = layout[currPath[0]].children[currPath[1]];
            default:
                currColumn = layout[currPath[0]].children[currPath[1]].children[currPath[2]];
        }

        switch (dragPath.length) {
            case 2:
                dragColumn = layout[dragPath[0]].children[dragPath[1]];
            default:
                dragColumn = layout[dragPath[0]].children[dragPath[1]].children[dragPath[2]];
        }

        if (currColumn.id === dragColumn.id) return

        if (currPath[0] === dragPath[0] && currPath[1] === dragPath[1]) {
            const newLayout = [...layout]
            newLayout.splice()
            // setLayout()
        }

        if (currPath[0] === dragPath[0]) {
            setLayout(update(layout, {
                cmps: {
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
                }
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
                cmps: {
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
        debugger
        const path = comp.path
        const newLayout = { ...layout }
        switch (comp.path.length) {
            case 1:
                newLayout.cmps[path[0]][field] = value
                break;
            case 2:
                newLayout.cmps[path[0]].cmps[path[1]][field] = value
                break;
            case 3:
                newLayout.cmps[path[0]].cmps[path[1]].cmps[path[2]][field] = value
                break;
            default:
                newLayout.cmps[path[0]].cmps[path[1]].cmps[path[2]].cmps[path[3]][field] = value
                break;
        }
        setLayout(newLayout)
    }
    const onSelect = (type, path) => {
        switch (type) {
            case COMPONENT:
                if (path.length === 3) {
                    setSelected({ ...layout.cmps[+path[0]].cmps[+path[1]].cmps[+path[2]], path: path });
                } else {
                    setSelected({ ...layout.cmps[+path[0]].cmps[+path[1]].cmps[+path[2]].cmps[+path[3]], path: path });
                }
                break;
            case COLUMN:
                if (path.length === 2) {
                    setSelected({ ...layout.cmps[+path[0]].cmps[+path[1]], path: path });
                } else {
                    setSelected({ ...layout.cmps[+path[0]].cmps[+path[1]].cmps[+path[2]], path: path });
                }
                break;
            case INNERSECTION:
                setSelected({ ...layout.cmps[+path[0]].cmps[+path[1]], path: path });
                break;
            default:
                setSelected({ ...layout.cmps[+path[0]], path: path })
        }
    }
    const handleDrop = useCallback(
        (dropZone, item) => {
            const splitDropZonePath = dropZone.path.split("-");
            const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

            const newItem = { id: item.id, type: item.type, component: item.component };
            if (item.type === COLUMN || item.type === SECTION) {
                newItem.cmps = item.cmps;
            }

            if (item.type === SIDEBAR_ITEM_LAYOUT) {
                if (item.component.type === COLUMN) {

                    setLayout({
                        ...layout,
                        cmps: handleMoveSidebarColumnIntoParent(
                            layout.cmps,
                            splitDropZonePath
                        )
                    }
                    );
                    return;
                } else {
                    setLayout(
                        handleMoveSidebarInnerSectionIntoParent(
                            layout,
                            splitDropZonePath
                        )
                    )
                }
                return
            }

            // sidebar into
            if (item.type === SIDEBAR_ITEM) {
                // 1. Move sidebar item into page
                const newComponent = {
                    id: shortid.generate(),
                    ...item.component
                };


                if (item.component.type === "innersection") {

                }

                const newItem = {
                    id: newComponent.id,
                    type: COMPONENT,
                    component: item.component
                };
                // setComponents({
                //     ...components,
                //     [newComponent.id]: newComponent
                // });
                setLayout(
                    {
                        ...layout,
                        cmps: handleMoveSidebarComponentIntoParent(
                            layout.cmps,
                            splitDropZonePath,
                            newItem
                        )
                    }
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
                    setLayout({
                        ...layout,
                        cmps: handleMoveWithinParent(layout.cmps, splitDropZonePath, splitItemPath)
                    }
                    );
                    return;
                }

                // 2.b. OR move different parent
                // TODO FIX columns. item includes children
                setLayout(
                    {
                        ...layout,
                        cmps: handleMoveToDifferentParent(
                            layout.cmps,
                            splitDropZonePath,
                            splitItemPath,
                            newItem
                        )

                    }
                );
                return;
            }

            // 3. Move + Create
            setLayout(

                {
                    ...layout,
                    cmps: handleMoveToDifferentParent(
                        layout.cmps,
                        splitDropZonePath,
                        splitItemPath,
                        newItem
                    )

                }

            );
        },
        [layout]
    );
    const renderSection = (section, currentPath) => {
        return (
            <Section
                key={section.id}
                data={section}
                handleDrop={handleDrop}
                cmps={layout.cmps[currentPath]}
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
        const path = s.path

        switch (path.length) {
            case 1:
                return { ...layout.cmps[path[0]], path }
            case 2:
                return { ...layout.cmps[path[0]].cmps[path[1]], path }
            case 3:
                return { ...layout.cmps[path[0]].cmps[path[1]].cmps[path[2]], path }
            default:
                return { ...layout.cmps[path[0]].cmps[path[1]].cmps[path[2]].cmps[path[3]], path }
        }

    }
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="editor">
                <SideBar sideBarItems={SIDEBAR_ITEMS} selected={getSelected(selected)} update={updateComponent} />
                {/* <SideBar sideBarItems={SIDEBAR_ITEMS} update={updateComponent} /> */}
                <div className="page-container">
                    <div className="page">
                        {/* {JSON.stringify(layout.cmps)} */}
                        {layout.cmps.map((section, index) => {
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
                                        accept={[SIDEBAR_ITEM, COMPONENT, SECTION, COLUMN, SIDEBAR_ITEM_LAYOUT]}
                                    />
                                    {renderSection(section, currentPath)}
                                </React.Fragment>
                            );
                        })}
                        <DropZone
                            data={{
                                path: `${layout.cmps.length}`,
                                childrenCount: layout.length

                            }}
                            accept={[SIDEBAR_ITEM, COMPONENT, SECTION, COLUMN, SIDEBAR_ITEM_LAYOUT]}
                            onDrop={handleDrop}
                            isLast
                        />
                    </div>
                </div>
            </div>
        </DndProvider>
    )
}