import { PrettoSlider } from "./PrettoSlider";

export function MarginEdit({ marginTop, marginRight, marginBottom, marginLeft, onChange }) {
    return (
        <>
            <div>
                <label htmlFor="margin-top">Margin-top:</label>
                {/* <input type="range" name="marginTop" id="margin-top" value={marginTop || 0} min="0" max="100" onChange={onChange} /> */}
                <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    defaultValue={marginTop || 0}
                    name="marginTop"
                    onChange={onChange}
                    id="margin-top"
                />
            </div>
            <div>
                <label htmlFor="margin-right">Margin-right:</label>
                {/* <input type="range" name="marginRight" id="margin-right" value={marginRight || 0} min="0" max="100" onChange={onChange} /> */}
                <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    defaultValue={marginRight || 0}
                    name="marginRight"
                    onChange={onChange}
                    id="margin-right"
                />
            </div>
            <div>
                <label htmlFor="margin-bottom">Margin-bottom:</label>
                {/* <input type="range" name="marginBottom" id="margin-bottom" value={marginBottom || 0} min="0" max="100" onChange={onChange} /> */}
                <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    defaultValue={marginBottom || 0}
                    name="marginBottom"
                    onChange={onChange}
                    id="margin-bottom"
                />
            </div>
            <div>
                <label htmlFor="margin-left">Margin-left:</label>
                {/* <input type="range" name="marginLeft" id="margin-left" value={marginLeft || 0} min="0" max="100" onChange={onChange} /> */}
                <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    defaultValue={marginLeft || 0}
                    name="marginLeft"
                    onChange={onChange}
                    id="margin-left"
                />
            </div>
        </>
    )
}