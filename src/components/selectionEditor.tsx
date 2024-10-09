import { NumberInput } from "@mantine/core";

export default function SelectionEditor(props: any) {
    const { name, max, maxOptions, selection, setSelection } = props;

    /**
     * if number is already in selection, go to next
     * detect if going up or going down
     * check min or max
     * if greater than max, select next greatest number
     * if smaller than 1, select next smallest number
     * if number is already in selection
     *  if going up, select next smallest number
     *  if going down, select next largest number
     * @param index 
     * @param newNumber 
     */
    const setNumber = (index: number, newNumber: number) => {
        const newArray = [...selection].slice(0, maxOptions);
        if (newNumber > max) {
            for (var n:number = max; n >= 1; n--) {
                if (!newArray.includes(n)) {
                    newArray[index] = n;
                    break;
                }
            }
        } else if (newNumber < 1) {
            for (var n = 1; n < max; n++) {
                if (!newArray.includes(n)) {
                    newArray[index] = n;
                    break;
                }
            }
        } else if (newArray.includes(newNumber)) {
            if(newArray[index]) {
                console.log('HERE');
                if(newNumber > newArray[index]) {
                    var n = newNumber+1;
                    for (; n < max; n++) {
                        console.log(n);
                        if (!newArray.includes(n)) {
                            newArray[index] = n;
                            break;
                        }
                    }
                    // if(n > max) {
                    //     newArray[index] = '';
                    // }
                } else if(newNumber < newArray[index]) {
                    var n = newNumber-1;
                    for (; n >= 1; n--) {
                        if (!newArray.includes(n)) {
                            newArray[index] = n;
                            break;
                        }
                    }
                    // if(n < 1) {
                    //     newArray[index] = '';
                    // }
                }
            }
        } else {
            newArray[index] = newNumber;
        }
        console.log('newArray:',newArray)
        setSelection(newArray);
    }

    return (
        <>
            {Array.from({ length: maxOptions as number }, (_, i) => {
                return <div className="w-[68px]" key={name + '-selection-' + i}>
                    <NumberInput value={selection[i] ? selection[i] : ''} onChange={n => setNumber(i, n as number)}
                        min={1}
                        max={max}></NumberInput>
                </div>
            })}
        </>
    );
}