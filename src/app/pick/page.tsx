'use client'

import Chart from "@/components/chart";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mantine/core";
import { combinations } from "@/functions/math";
import { useRouter, useSearchParams } from 'next/navigation';


// import DownArrow from "../assets/DownArrow.svg";
import NumberSelector from "@/components/numberSelector";
import SelectionEditor from "@/components/selectionEditor";
import useOnScreen from "@/hooks/useOnScreen";
import { generateURL } from "@/functions/url";
import { SelectionTicket } from "@/components/ticket";

const dollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

// Returns a Promise that resolves after "ms" Milliseconds
const timer = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

async function increment(period: number) {
  await timer(period);
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const whiteNumbers = searchParams.get('whites')?.split(',').map(n => parseInt(n));
  const redNumbers = searchParams.get('reds')?.split(',').map(n => parseInt(n));

  const sectionRef1 = useRef<HTMLDivElement>(null);
  // const isSectionOnScreen1 = useOnScreen(sectionRef1);

  // const [isSectionHeaderOpen1, setIsSectionHeaderOpen1] = useState(false);

  const [numWhites, setNumWhites] = useState<string | number>(whiteNumbers ? whiteNumbers.length : 7);
  const [numReds, setNumReds] = useState<string | number>(redNumbers ? redNumbers.length : 2);

  const [whiteSelection, setWhiteSelection] = useState<(number | null)[]>(whiteNumbers ? whiteNumbers : []);
  const [redSelection, setRedSelection] = useState<(number | null)[]>(redNumbers ? redNumbers : []);

  // const [advancedOptionsOpen, setAdvancedOptionsOpen] = useState(false);

  const [currentCombination, setCurrentCombination] = useState<number[]>([-1, -1, -1, -1, -1, -1]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsSectionHeaderOpen1(true);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  /**
   * Calculate number of tickets and number of slips
   * tickets = C(numWhites 5) * numReds
   * slips = ceil(tickets / 5)
   * costToPlay = tickets * 2
   */
  const tickets = combinations(numWhites as number, 5)! * (numReds as number);
  const slips = Math.ceil(tickets / 5);
  const costToPlay = tickets * 2;

  const trueWhiteSelection = whiteSelection.filter(n => n).slice(0, numWhites as number);
  const trueRedSelection = redSelection.filter(n => n).slice(0, numReds as number);

  const readyToGenerate = trueWhiteSelection.length === numWhites && trueRedSelection.length === numReds;

  /**
   * generate all combinations
   * for each new combinations, set the active numbers to true
   * @returns combinations
   */
  const animateCombinations = async (): Promise<number[][]> => {
    const combinations: number[][] = [];

    const incTime = Math.floor((1 / (tickets * tickets * tickets)) * 4000);

    for (let f = 0; f < (numReds as number); f++) {
      let a = 0;

      while (a < (numWhites as number - 4)) {
        let b = a + 1;
        while (b < (numWhites as number - 3)) {
          let c = b + 1;
          while (c < (numWhites as number - 2)) {
            let d = c + 1;
            while (d < (numWhites as number - 1)) {
              let e = d + 1;
              while (e < (numWhites as number)) {
                combinations.push([a, b, c, d, e, f]);
                setCurrentCombination([a, b, c, d, e, f]);
                await increment(incTime * (f + 1) * (f + 1));
                e++;
              }
              d++;
            }
            c++;
          }
          b++;
        }
        a++;
      }
    }

    return combinations;
  }

  return (
    <div className="items-center justify-items-center min-h-screen p-20 pb-20 gap-16 md:py-48 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-24 md:gap-48 row-start-2 items-center place-self-stretch sm:items-start">

        {/* Section 1 */}
        <div className="flex flex-row gap-12 place-content-center place-self-stretch flex-wrap" ref={sectionRef1}>
          <div className="flex">
            <Chart />
          </div>
          <div className="flex flex-col gap-6 flex-1 min-w-80 max-w-[32rem] place-self-stretch">
            {/* Options */}
            <div className="flex flex-col gap-6 place-self-stretch">
              {/* White Numbers */}
              <div className="flex flex-col place-self-stretch gap-4">
                <p className="text-black font-bold">Select number of white numbers:</p>
                <NumberSelector
                  state={numWhites}
                  setState={setNumWhites}
                  min={5}
                  max={15}
                  step={1}
                  color="rgba(0, 0, 0, 1)" />
              </div>
              {/* Red Numbers */}
              <div className="flex flex-col place-self-stretch gap-4">
                <p className="text-primary font-bold">Select number of red numbers:</p>
                <NumberSelector
                  state={numReds}
                  setState={setNumReds}
                  min={1}
                  max={10}
                  step={1}
                  color="rgba(250, 77, 88, 1)" />
              </div>
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

        {/* Section 1 Header */}
        {/* <div className={"flex flex-row fixed z-10 top-[-100px] left-0 w-full bg-white border-b-[1px] border-black border-solid transition-all h-[100px] " + ((!isSectionOnScreen1 && isSectionHeaderOpen1) ? "md:translate-y-[100px]" : "")}>

        </div>
        <div className={"fixed z-[11] top-[-32px] right-4 bg-primary w-8 h-8 transition-all " + (!isSectionOnScreen1 ? "translate-y-[48px]" : "")} onClick={() => setIsSectionHeaderOpen1(!isSectionHeaderOpen1)}></div> */}

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
          <SelectionTicket
            numWhites={numWhites}
            whiteSelection={whiteSelection}
            setWhiteSelection={setWhiteSelection}
            numReds={numReds}
            redSelection={redSelection}
            setRedSelection={setRedSelection}/>
        </div>

        <div className="flex flex-col place-self-center gap-2">
          <p className="font-bold text-center">Current Selection</p>
          <div className="flex flex-row gap-[4px] flex-wrap place-self-center place-items-center">
            <p>White Numbers:</p>
            {trueWhiteSelection.sort((a, b) => a! - b!).map((num, i) => {
              const highlight = currentCombination.slice(0, 5).includes(i);
              return <div className={"rounded-full w-[40px] h-[40px] bg-white place-content-center " + (highlight ? "border-ticket border-4" : "border-black border-[1px]")} key={'white-num-' + num}>
                <p className="text-center">{num}</p>
              </div>
            })}
            <p className="pl-4">{trueWhiteSelection.length}/{numWhites}</p>
          </div>
          <div className="flex flex-row gap-[4px] flex-wrap place-self-center place-items-center">
            <p>Red numbers:</p>
            {trueRedSelection.sort((a, b) => a! - b!).map((num, i) => {
              const highlight = currentCombination[5] === i;
              return <div className={"rounded-full w-[40px] h-[40px] bg-primary place-content-center " + (highlight ? "border-ticket border-4" : "border-primary border-[1px]")} key={'red-num-' + num}>
                <p className="text-center text-white">{num}</p>
              </div>
            })}
            <p className="pl-4">{trueRedSelection.length}/{numReds}</p>
          </div>

          <div className="flex flex-col place-self-center place-items-center">
            <Button
              variant="outline"
              color="rgba(54, 54, 54, 1)"
              size="lg"
              disabled={!readyToGenerate}
              onClick={() => {
                if (tickets <= 500) {
                  animateCombinations().then(() => {
                    router.push('/slips' + generateURL(trueWhiteSelection, trueRedSelection));
                  })
                } else {
                  router.push('/slips' + generateURL(trueWhiteSelection, trueRedSelection));
                }
              }}>Generate Ticket Slips</Button>
            {!readyToGenerate && <p className="text-primary">Select more numbers or reduce your selection size!</p>}
          </div>
        </div>

      </main>
    </div>
  );
}
