import SlipNumber from "./slipNumber";

interface SlipGridProps {
    name: string;
    max: number;
    maxOptions?: string | number;
    selection: any;
    setSelection?: any;
    disabled?: boolean;
}

export default function SlipGrid(props: SlipGridProps) {
    const { name, max, maxOptions, selection, setSelection, disabled = false } = props;

    const numRows = Math.ceil(max / 10);

    const classes = name === 'white' ?
        'bg-white' :
        'bg-transparent';

    /**
     * add new number
     * if already in array, toggle
     * if array full, replace min
     * else replace first empty number
     * @param newNumber 
     */
    const selectOption = (newNumber: number) => {
        const newArray = [...selection].slice(0, maxOptions as number);
        console.log(newArray);
        const index = newArray.findIndex(n => n === null || n === undefined);
        if (newArray.includes(newNumber)) {
            // console.log('already in array');
            newArray[newArray.findIndex(n => n === newNumber)] = null;
        } else if (newArray.filter((n: number) => n).length === maxOptions) {
            // console.log('array full');
            let minIndex = 0;
            for (let k in newArray) {
                const i = parseInt(k);
                if (newArray[i] && newArray[i]! < newArray[minIndex]!) {
                    minIndex = i;
                }
            }
            newArray[minIndex] = newNumber;
        } else if (index < 0) {
            // console.log('fill array at end');
            newArray.push(newNumber);
        } else {
            // console.log('fill array in middle')
            newArray[index] = newNumber;
        }
        setSelection(newArray);
    }

    return (
        <div className={"grid grid-rows-" + numRows + " grid-cols-10 flex-1 place-self-stretch place-items-center " + classes}>
            {Array.from({ length: max }, (_, i) => {
                const num = i + 1;
                return <SlipNumber key={name + '-num-' + i} i={i} num={num} selectOption={selectOption} isSelected={selection.slice(0, maxOptions).includes(num)} disabled={disabled} />
            })}
        </div>
    )
}