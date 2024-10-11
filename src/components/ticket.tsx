import SlipGrid from "./slipGrid";

interface SelectionTicketProps {
    numWhites: string | number;
    whiteSelection: (number | null)[];
    setWhiteSelection: any;
    numReds: string | number;
    redSelection: (number | null)[];
    setRedSelection: any;
}

export function SelectionTicket(props: SelectionTicketProps) {
    const { numWhites, whiteSelection, setWhiteSelection, numReds, redSelection, setRedSelection } = props;
    return (
        <div className="flex px-4">
            <div className="flex flex-col w-[356px] h-[734px] p-[4px] bg-primary">
                <div className="flex flex-col h-[490px] place-items-end">
                    <div className="flex flex-row h-[50px]">
                        <div className="flex bg-white rounded-tl-[24px] w-[194px] h-full place-items-center">
                            <p className="text-primary font-bold text-center w-full">SELECT *{numWhites}*</p>
                        </div>
                    </div>
                    <SlipGrid name='white' max={69} maxOptions={numWhites} selection={whiteSelection} setSelection={setWhiteSelection} />
                </div>
                <div className="flex flex-col flex-1 place-items-end bg-pink">
                    <div className="flex flex-row h-[50px]">
                        <div className="flex rounded-tl-[24px] w-[194px] h-full place-items-center">
                            <p className="text-primary font-bold text-center w-full">SELECT *{numReds}*</p>
                        </div>
                    </div>
                    <SlipGrid name='red' max={26} maxOptions={numReds} selection={redSelection} setSelection={setRedSelection} />
                </div>
            </div>
        </div>
    )
}

interface DisplayTicketProps {
    whiteNumbers: string | number[];
    redNumbers: string | number[];
}

export function DisplayTicket(props: DisplayTicketProps) {
    const { whiteNumbers, redNumbers } = props;
    console.log(whiteNumbers, redNumbers);
    return (
        <div className="flex">
            <div className="flex flex-col w-[356px] h-[734px] p-[4px] bg-primary">
                <div className="flex flex-col h-[490px] place-items-end">
                    <div className="flex flex-row h-[50px]">
                        <div className="flex bg-white rounded-tl-[24px] w-[194px] h-full place-items-center">
                            <p className="text-primary font-bold text-center w-full">SELECT 5</p>
                        </div>
                    </div>
                    <SlipGrid name='white' max={69} selection={whiteNumbers} disabled />
                </div>
                <div className="flex flex-col flex-1 place-items-end bg-pink">
                    <div className="flex flex-row h-[50px]">
                        <div className="flex rounded-tl-[24px] w-[194px] h-full place-items-center">
                            <p className="text-primary font-bold text-center w-full">SELECT 1</p>
                        </div>
                    </div>
                    <SlipGrid name='red' max={26} selection={redNumbers} disabled />
                </div>
            </div>
        </div>
    )
}