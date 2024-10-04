'use client'

import Chart from "@/components/chart";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { Button, NumberInput, Slider } from "@mantine/core";
import { combinations } from "@/functions/math";


import DownArrow from "../assets/DownArrow.svg";
import NumberSelector from "@/components/numberSelector";

const dollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

export default function Home() {
  const [numWhites, setNumWhites] = useState<string | number>(7);
  const [numReds, setNumReds] = useState<string | number>(2);

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-24 row-start-2 items-center place-self-stretch sm:items-start">
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
      </main>
    </div>
  );
}
