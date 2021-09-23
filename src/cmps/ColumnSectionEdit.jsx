import { MarginEdit } from "./MarginEdit";
import { PaddingEdit } from "./PaddingEdit";
import { uploadImg } from '../services/cloudinary-service';
export function ColumnSectionEdit({ style, onUpdate }) {
    const onChange = ({ target }) => {
        const { name, value } = target;
        const newStyle = { ...style };
        newStyle[name] = value;
        onUpdate(newStyle);
    }
    const onUploadImage=(url)=> {
        console.log('url:',url)
        const newStyle = {...style};
        newStyle['backgroundImage'] = `url(${url})`;
        onUpdate(newStyle);
    }
    const { flexGrow, paddingTop, paddingRight, paddingBottom, paddingLeft, marginTop, marginRight, marginBottom, marginLeft } = style;
    return (
        <div className="column-section-edit">
            <div>
                <label> Upload your image to cloudinary!
                    <input onChange={(ev)=> uploadImg(ev).then(url => onUploadImage(url))} type="file" />
                </label>
            </div>
            <div>
                <label htmlFor="flex-grow">Width:</label>
                <input type="range" name="flexGrow" id="flex-grow" value={flexGrow} min="1" max="12" onChange={onChange} />
            </div>
            <PaddingEdit
                paddingTop={paddingTop}
                paddingRight={paddingRight}
                paddingBottom={paddingBottom}
                paddingLeft={paddingLeft}
                onChange={onChange} />
            <MarginEdit
                marginTop={marginTop}
                marginRight={marginRight}
                marginBottom={marginBottom}
                marginLeft={marginLeft}
                onChange={onChange} />

        </div>
    )
}