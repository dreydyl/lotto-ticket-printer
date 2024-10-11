import SlipGrid from "./slipGrid";
import { DisplayTicket } from "./ticket";

export default function Slip(props: any) {
    const { combinations } = props;

    return (
        <div className="flex flex-row scale-50">
            {combinations.map((combination: string | any[]) => <DisplayTicket whiteNumbers={combination.slice(0,5)} redNumbers={combination.slice(5)}/>)}
            {Array.from({ length: 5-combinations.length }, _ => <DisplayTicket whiteNumbers={[]} redNumbers={[]}/> )}
        </div>
    )
}

export function CalibrationSlip() {
    return (
        <div className="flex flex-row scale-50">
            {Array.from({ length: 5 }, _ => <DisplayTicket whiteNumbers={Array.from({ length: 69 }, (_, i) => i+1 )} redNumbers={Array.from({ length: 26 }, (_, i) => i+1 )}/> )}
        </div>
    )
}