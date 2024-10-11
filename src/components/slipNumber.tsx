interface SlipNumberProps {
    i: number;
    num: number;
    selectOption: (newNumber: number) => void;
    isSelected: boolean;
    disabled?: boolean;
}

export default function SlipNumber(props: SlipNumberProps) {
    const { i, num, selectOption, isSelected, disabled = false } = props;

    const classes = isSelected ?
        'bg-black border-black ' + (disabled ? '' : 'hover:border-blue hover:bg-transparent') :
        'border-primary ' + (disabled ? '' : 'hover:border-blue hover:bg-blue');
    const textClasses = isSelected ?
        'text-white ' + (disabled ? '' : 'group-hover:text-blue') :
        'text-primary ' + (disabled ? '' : 'group-hover:text-white');

    return (
        <div className="flex place-items-center">
            <div className={"group flex place-items-center w-[24px] h-[43px] rounded-[6px] border-y-[2.5px] "+(disabled ? "" : "hover:cursor-pointer ") + classes}
                onClick={() => {
                    if(disabled) return;
                    selectOption(i + 1)
                }}>
                <p className={"font-bold text-center w-full " + textClasses}>{num}</p>
            </div>
        </div>
    );
}