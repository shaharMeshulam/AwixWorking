export function Text({ content, style, update }) {
    const newStyle = {...style};
    newStyle.fontSize = `${newStyle.fontSize}px`; 
    function onBodyChange({ target }) {
        update('content', target.innerText);
    }
    return (
        <div className="text" contentEditable="true" onKeyUp={onBodyChange} suppressContentEditableWarning={true} style={newStyle}>
            {content}
        </div>
    )
}