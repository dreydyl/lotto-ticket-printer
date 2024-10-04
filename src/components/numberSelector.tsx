import { Button, NumberInput, Slider } from "@mantine/core";

export default function NumberSelector(props: any) {
    const {
        state,
        setState,
        min,
        max,
        step,
        color
    } = props;

    return (

        <div className="flex flex-col place-self-stretch gap-4">
            <p className="text-black font-bold">Select number of white numbers:</p>
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
                <div className="w-20">
                    <NumberInput value={state} onChange={setState}
                        min={min}
                        max={max}></NumberInput>
                </div>
            </div>
        </div>
    )
}