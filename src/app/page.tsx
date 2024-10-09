'use client'

import Chart from "@/components/chart";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { Button, NumberInput, Slider } from "@mantine/core";
import { combinations } from "@/functions/math";


import DownArrow from "../assets/DownArrow.svg";
import NumberSelector from "@/components/numberSelector";
import SlipNumber from "@/components/slipNumber";
import SlipGrid from "@/components/slipGrid";
import SelectionEditor from "@/components/selectionEditor";

const dollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export default function Home() {
  const [numWhites, setNumWhites] = useState<string | number>(7);
  const [numReds, setNumReds] = useState<string | number>(2);

  const [whiteSelection, setWhiteSelection] = useState<(number | null)[]>([]);
  const [redSelection, setRedSelection] = useState<(number | null)[]>([]);

  const [advancedOptionsOpen, setAdvancedOptionsOpen] = useState(false);

  /**
   * Calculate number of tickets and number of slips
   * tickets = C(numWhites 5) * numReds
   * slips = ceil(tickets / 5)
   * costToPlay = tickets * 2
   */
  const tickets = combinations(numWhites as number, 5)! * (numReds as number);
  const slips = Math.ceil(tickets / 5);
  const costToPlay = tickets * 2;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-24 row-start-2 items-center place-self-stretch sm:items-start">

        {/* Section 1 */}
        <div className="flex flex-row gap-12 place-content-center place-self-stretch flex-wrap">
          <div className="flex">
            <Chart />
          </div>
          <div className="flex flex-col gap-6 flex-1 min-w-80 max-w-[32rem] place-self-stretch">
            {/* Options */}
            <div className="flex flex-col gap-6 place-self-stretch">
              {/* White Numbers */}
              <NumberSelector
                state={numWhites}
                setState={setNumWhites}
                min={5}
                max={15}
                step={1}
                color="rgba(0, 0, 0, 1)" />
              {/* Red Numbers */}
              <NumberSelector
                state={numReds}
                setState={setNumReds}
                min={1}
                max={10}
                step={1}
                color="rgba(250, 77, 88, 1)" />
              {/* Advanced Options */}
              {/* <Button
                variant="outline"
                color="rgba(54, 54, 54, 1)"
                rightSection={<Image
                  alt=''
                  src={DownArrow}
                  width={20}
                  height={20}
                  className={advancedOptionsOpen ? "rotate-180" : ""} />}
                onClick={() => { setAdvancedOptionsOpen(!advancedOptionsOpen) }}>Advanced Options</Button> */}
            </div>
            {/* Cost Preview */}
            <div className="flex flex-col place-self-stretch gap-4">
              <div className="flex flex-row place-self-stretch gap-4">
                <div className="flex flex-col place-self-stretch gap-4">
                  <p>Number of Tickets:</p>
                  <p>{tickets}</p>
                </div>
                <div className="flex flex-col place-self-stretch gap-4">
                  <p>Number of Slips:</p>
                  <p>{slips}</p>
                </div>
              </div>
              <div className="flex flex-col place-self-stretch gap-4">
                <p>Cost to Play:</p>
                <p>{dollar.format(costToPlay)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-row-reverse place-self-stretch place-content-evenly flex-wrap gap-y-8">

          {/* Selection */}
          <div className="flex flex-col px-4">
            <p className="font-bold text-primary">Select red numbers:</p>
            <SelectionEditor name='red' max={26} maxOptions={numReds} selection={redSelection} setSelection={setRedSelection} />
            {/* <p>Current selection:</p>
                <p className="font-bold">{Array.from({ length: numReds as number }, (_, i) => redSelection[i]!).filter(n => n).sort((a,b) => a - b).join(', ')}</p> */}
          </div>
          <div className="flex flex-col place-items-start px-4">
            <p className="font-bold">Select white numbers:</p>
            <SelectionEditor name='white' max={69} maxOptions={numWhites} selection={whiteSelection} setSelection={setWhiteSelection} />
            {/* <p>Current selection:</p>
                <p className="font-bold">{Array.from({ length: numWhites as number }, (_, i) => whiteSelection[i]!).filter(n => n).sort((a,b) => a - b).join(', ')}</p> */}
          </div>

          {/* Ticket */}
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
        </div>
      </main>
    </div>
  );
}
