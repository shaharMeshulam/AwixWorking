export function Text({ data, style, update }) {
    const newStyle = { ...style };
    newStyle.fontSize = `${newStyle.fontSize}px`;
    function onBodyChange({ target }) {
        update('data', { txt: target.innerText });
    }
    return (
        <div className="text" contentEditable="true" onKeyUp={onBodyChange} suppressContentEditableWarning={true} style={newStyle}>
            {data.txt}
        </div>
    )
}