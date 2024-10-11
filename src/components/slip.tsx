import React from "react";
import SlipGrid from "./slipGrid";
import { DisplayTicket } from "./ticket";

const Slip = React.forwardRef<HTMLDivElement, any>((props: any, ref) => {
    const { combinations } = props;

    return (
        <div className="flex flex-row scale-50" ref={ref}>
            {combinations.map((combination: string | any[]) => <DisplayTicket whiteNumbers={combination.slice(0, 5)} redNumbers={combination.slice(5)} />)}
            {Array.from({ length: 5 - combinations.length }, _ => <DisplayTicket whiteNumbers={[]} redNumbers={[]} />)}
        </div>
    )
});

export default Slip;

export const CalibrationSlip = React.forwardRef<HTMLDivElement>((props: any, ref) => {

    return (
        <div className="flex flex-row scale-50" ref={ref}>
            {Array.from({ length: 5 }, _ => <DisplayTicket whiteNumbers={Array.from({ length: 69 }, (_, i) => i + 1)} redNumbers={Array.from({ length: 26 }, (_, i) => i + 1)} />)}
        </div>
    )
});