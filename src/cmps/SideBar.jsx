import { StyledEngineProvider } from "@mui/styled-engine";
import { useState } from "react";
import { ColumnSectionEdit } from "./ColumnSectionEdit";
import { SideBarItem } from "./SideBarItem";
import { TextEdit } from "./TextEdit";

export function SideBar({ sideBarItems, selected, update }) {
    const [isEdit, setIsEdit] = useState(false);
    const onAddClick = () => {
        setIsEdit(false);
    }
    const onEditClick = () => {
        setIsEdit(true);
    }
    const onUpdate = (style) => {
        update(selected, 'style', style);
        // console.log('style:', style);
    }
    return (
        <div className="side-bar">
            <button onClick={onAddClick}>Add</button>
            <button onClick={onEditClick}>Edit</button>
            {!isEdit &&
                Object.values(sideBarItems).map((sideBarItem, index) => (
                    <SideBarItem key={sideBarItem.id} data={sideBarItem} type={sideBarItem.type} />
                ))
            }
            {isEdit && selected && (
                <>
                <StyledEngineProvider injectFirst>
                    <div>{JSON.stringify(selected)}</div>
                    {selected.type === 'text' && <TextEdit style={selected.style} onUpdate={onUpdate}/>}
                    {selected.type === 'column' && <ColumnSectionEdit style={selected.style} onUpdate={onUpdate}/>}
                </StyledEngineProvider>
                </>
            )}
            {isEdit && !selected && <div>Nothing is selected</div>}
        </div>
    )
}