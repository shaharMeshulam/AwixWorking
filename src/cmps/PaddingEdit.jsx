import { PrettoSlider } from "./PrettoSlider";

export function PaddingEdit({ paddingTop, paddingRight, paddingBottom, paddingLeft, onChange }) {
    return (
        <>

            <div>
                <label htmlFor="padding-top">Padding-top:</label>
                {/* <input type="range" name="paddingTop" id="padding-top" value={paddingTop || 0} min="0" max="100" onChange={onChange} /> */}
                <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    value={paddingTop || 0}
                    name="paddingTop"
                    onChange={onChange}
                    id="padding-top"
                />
            </div>
            <div>
                <label htmlFor="padding-right">Padding-right:</label>
                {/* <input type="range" name="paddingRight" id="padding-right" value={paddingRight || 0} min="0" max="100" onChange={onChange} /> */}
                <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    value={paddingRight || 0}
                    name="paddingRight"
                    onChange={onChange}
                    id="padding-right"
                />
            </div>
            <div>
                <label htmlFor="padding-bottom">Padding-bottom:</label>
                {/* <input type="range" name="paddingBottom" id="padding-bottom" value={paddingBottom || 0} min="0" max="100" onChange={onChange} /> */}
                <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    defaultValue={paddingBottom || 0}
                    name="paddingBottom"
                    onChange={onChange}
                    id="padding-bottom"
                />
            </div>
            <div>
                <label htmlFor="padding-left">Padding-left:</label>
                {/* <input type="range" name="paddingLeft" id="padding-left" value={paddingLeft || 0} min="0" max="100" onChange={onChange} /> */}
                <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    defaultValue={paddingLeft || 0}
                    name="paddingBottom"
                    onChange={onChange}
                    id="padding-bottom"
                />
            </div>
        </>
    )
}