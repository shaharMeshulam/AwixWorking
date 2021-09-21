export function TextEdit({ style, onUpdate }) {
    const { fontSize, color } = style
    function onChange({ target }) {
        const { name, value } = target;
        const newStyle = { ...style, [name]:value };
        console.log('newStyle:', newStyle);
        onUpdate(newStyle);
    }
    return (
        <div className="text-edit">
            <label htmlFor="font-size">Font Size:</label>
            <input type="range" name="fontSize" id="font-size" defaultValue={fontSize} min="16" max="100" onChange={onChange}/>
            <label htmlFor="color">Color:</label>
            <input type="color" name="color" id="color" defaultValue={color} onChange={onChange}/>
            <label htmlFor="font-family">Font:</label>
            <select name="fontFamily" id="font-family" defaultValue='Arial' onChange={onChange}>
                <option value="Arial">Arial</option>
                <option value="caveat">Caveat</option>
                <option value="montserrat">montserrat</option>
            </select>
        </div>
    )
}