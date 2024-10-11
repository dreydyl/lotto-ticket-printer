import { NumberInput, Slider } from "@mantine/core";

interface NumberSelectorProps {
    state: any;
    setState: any;
    min: number;
    max: number;
    step: number;
    color: string;
}

export default function NumberSelector(props: NumberSelectorProps) {
    const {
        state,
        setState,
        min,
        max,
        step,
        color
    } = props;

    return (
        <div className="flex flex-row gap-6">
            <div className="flex-1">
                <Slider color={color}
                    min={min}
                    max={max}
                    step={step}
                    value={state as number}
                    onChange={setState}
                    marks={Array.from({ length: max - min + 1 }, (_, i) => {
                        return { value: i + min, label: i + min }
                    })}
                />
            </div>
            <div className="w-[68px]">
                <NumberInput value={state} onChange={setState}
                    min={min}
                    max={max}></NumberInput>
            </div>
        </div>
    )
}