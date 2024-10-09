export default function SlipNumber(props: any) {
    const {i, num, selectOption, isSelected} = props;
    const classes = isSelected ?
        'bg-black border-black hover:border-blue hover:bg-transparent' :
        'border-primary hover:border-blue hover:bg-blue';
    const textClasses = isSelected ?
        'text-white group-hover:text-blue' :
        'text-primary group-hover:text-white';
    return (
        <div className="flex place-items-center">
            <div className={"group flex place-items-center w-[24px] h-[43px] rounded-[6px] border-y-[2.5px] hover:cursor-pointer "+classes}
                onClick={() => selectOption(i + 1)}>
                <p className={"font-bold text-center w-full "+textClasses}>{num}</p>
            </div>
        </div>
    );
}