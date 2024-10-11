import React from "react";
import { DisplayTicket } from "./ticket";

interface SlipProps {
    combinations: number[][];
}

const Slip = React.forwardRef<HTMLDivElement, SlipProps>((props: SlipProps, ref) => {
    const { combinations } = props;

    return (
        <div className="flex flex-row scale-50" ref={ref}>
            {combinations.map((combination: number[], i: number) => <DisplayTicket key={i} whiteNumbers={combination.slice(0, 5)} redNumbers={combination.slice(5)} />)}
            {Array.from({ length: 5 - combinations.length }, (_, i) => <DisplayTicket key={5 - combinations.length + i} whiteNumbers={[]} redNumbers={[]} />)}
        </div>
    )
});

Slip.displayName = 'Slip';

export default Slip;

interface CalibrationSlipProps {
    hack?: boolean
}

const CalibrationSlip = React.forwardRef<HTMLDivElement>((props: CalibrationSlipProps, ref) => {
    return (
        <div className="flex flex-row scale-50" ref={ref}>
            {Array.from({ length: 5 }, (_, i) => <DisplayTicket key={i} whiteNumbers={Array.from({ length: 69 }, (_, i) => i + 1)} redNumbers={Array.from({ length: 26 }, (_, i) => i + 1)} />)}
        </div>
    )
});

CalibrationSlip.displayName = 'CalibrationSlip';

export { CalibrationSlip };