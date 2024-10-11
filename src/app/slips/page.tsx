'use client'

import Slip, { CalibrationSlip } from "@/components/slip";
import { combinations } from "@/functions/math";
import { generateURL } from "@/functions/url";
import { Alert, Button } from "@mantine/core";
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, Suspense } from "react";
// import { useReactToPrint } from "react-to-print";

const dollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

/**
 * get url
 * if empty, show message and button to /pick
 * else should look like
 * ?whites=1,2,3,4,5&reds=1
 * start at calibration
 * ?page=x
 * @returns 
 */
function SlipPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const contentRef = useRef<HTMLDivElement>(null);
    // const reactToPrintFn = useReactToPrint({ contentRef });

    const [newAlert, setNewAlert] = useState('');

    useEffect(() => {
        if (newAlert === '') return;
        const timer = setTimeout(() => {
            setNewAlert('');
        }, 10000);
        return () => clearTimeout(timer);
    }, [newAlert])

    const whiteNumbers = searchParams.get('whites')?.split(',').map(n => parseInt(n));
    const redNumbers = searchParams.get('reds')?.split(',').map(n => parseInt(n));
    const page = searchParams.get('page');

    const tickets = combinations(whiteNumbers!.length, 5)! * (redNumbers!.length as number);
    const slips = Math.ceil(tickets / 5);
    const costToPlay = tickets * 2;

    const currentTicket = (page !== null) ? (parseInt(page) - 1) * 5 + 1 : 0;

    const combos: number[][] = [];

    for (let f = 0; f < redNumbers!.length; f++) {
        let a = 0;

        while (a < whiteNumbers!.length - 4) {
            let b = a + 1;
            while (b < whiteNumbers!.length - 3) {
                let c = b + 1;
                while (c < whiteNumbers!.length - 2) {
                    let d = c + 1;
                    while (d < whiteNumbers!.length - 1) {
                        let e = d + 1;
                        while (e < whiteNumbers!.length) {
                            combos.push([whiteNumbers![a], whiteNumbers![b], whiteNumbers![c], whiteNumbers![d], whiteNumbers![e], redNumbers![f]]);
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

    if (whiteNumbers === undefined || redNumbers === undefined) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-8">
                <p>Something went wrong. Pick your numbers again.</p>
                <Link href={"pick" + generateURL(whiteNumbers, redNumbers)}>
                    <Button
                        variant="outline"
                        size="lg"
                        color="rgba(0, 0, 0, 1)"
                        className="bg-gray-800 text-white px-8 py-4 text-lg hover:bg-gray-700 transition-colors"
                    >
                        Pick Numbers
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-start min-h-screen">

            {/* Alerts */}
            {newAlert === '' ? <></> :
                <div className="fixed z-20 top-0 left-0 w-full h-full flex items-center justify-center" onClick={() => {
                    setNewAlert('');
                }}>
                    <Alert variant="white" color="rgba(245, 179, 73, 1)" title="Invalid Action" withCloseButton>
                        {newAlert}
                    </Alert>
                </div>
            }

            {/* Header */}
            {page ?
                <div className="sticky top-0 z-10 grid grid-cols-3 w-full h-[120px] bg-white border-b-2 border-black">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Link href={"pick" + generateURL(whiteNumbers, redNumbers)}>
                            <Button
                                variant="outline"
                                size="md"
                                color="rgba(0, 0, 0, 1)"
                                className="bg-gray-800 text-white px-8 py-4 text-lg hover:bg-gray-700 transition-colors"
                            >
                                Re-pick Numbers
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            size="md"
                            color="rgba(250, 77, 88, 1)"
                            className="bg-gray-800 text-white px-8 py-4 text-lg hover:bg-gray-700 transition-colors"
                            onClick={() => {
                                // @ts-expect-error 'shallow' does not exist in type 'NavigateOptions'
                                router.push('slips' + generateURL(whiteNumbers, redNumbers), { shallow: true });
                            }}
                        >
                            Calibrate Printer
                        </Button>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <p>Showing tickets:</p>
                            <p className="text-2xl font-bold">{currentTicket}-{Math.min(currentTicket + 4, tickets)} / {tickets}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-primary">Cost to play:</p>
                            <p className="text-2xl font-bold text-primary">{dollar.format(costToPlay)}</p>
                        </div>
                    </div>
                </div> :
                <div className="sticky top-0 z-10 flex flex-row items-center justify-center w-full h-[80px] bg-white border-b-2 border-black p-8">
                    <p className="text-4xl font-bold">Calibrate Printer</p>
                </div>
            }
            {/* Slip */}
            {page ?
                <div className="flex items-center justify-center h-[431px] p-8">
                    <Slip combinations={combos.slice(currentTicket - 1, currentTicket + 4)} ref={contentRef} />
                </div> :
                <div className="flex items-center justify-center h-[431px] p-8">
                    <CalibrationSlip ref={contentRef} />
                </div>
            }
            {/* Print */}
            {page ?
                <div className="flex items-center justify-center"
                    onClick={() => {
                        setNewAlert('This functionality is not available yet. Please check back in December 2024.');
                    }}
                >
                    <Button
                        variant="outline"
                        size="lg"
                        color="rgba(250, 77, 88, 1)"
                        className="bg-gray-800 text-white px-8 py-4 text-lg hover:bg-gray-700 transition-colors"
                        onClick={() => {
                            // reactToPrintFn();
                        }}
                    // disabled
                    >
                        Print Ticket Slip
                    </Button>
                </div> :
                <div className="flex flex-col items-center justify-center"
                    onClick={() => {
                        setNewAlert('This functionality is not available yet. Please check back in December 2024.');
                    }}
                >
                    <Button
                        variant="outline"
                        size="lg"
                        color="rgba(250, 77, 88, 1)"
                        className="bg-gray-800 text-white px-8 py-4 text-lg hover:bg-gray-700 transition-colors"
                        onClick={() => {
                            // reactToPrintFn();
                        }}
                    // disabled
                    >
                        Print Test Slip
                    </Button>
                    <p className="text-primary font-bold">This is just for calibration. The program will print a slip with each block filled in as shown above.</p>
                </div>
            }
            {/* Navigation */}
            {page ?
                <div className="grid grid-cols-3 w-full p-8">
                    <div className="flex items-center justify-center">
                        {parseInt(page) > 1 &&
                            <Button
                                variant="outline"
                                size="lg"
                                color="rgba(0, 0, 0, 1)"
                                className="bg-gray-800 text-white px-8 py-4 text-lg hover:bg-gray-700 transition-colors"
                                onClick={() => {
                                    // @ts-expect-error 'shallow' does not exist in type 'NavigateOptions'
                                    router.push('slips' + generateURL(whiteNumbers, redNumbers) + '&page=' + (parseInt(page) - 1), { shallow: true });
                                }}
                            >
                                Previous Slip
                            </Button>}
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <p>Slips remaining:</p>
                            <p className="text-2xl font-bold">{slips - parseInt(page)}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        {parseInt(page) < slips &&
                            <Button
                                variant="outline"
                                size="lg"
                                color="rgba(0, 0, 0, 1)"
                                className="bg-gray-800 text-white px-8 py-4 text-lg hover:bg-gray-700 transition-colors"
                                onClick={() => {
                                    // @ts-expect-error 'shallow' does not exist in type 'NavigateOptions'
                                    router.push('slips' + generateURL(whiteNumbers, redNumbers) + '&page=' + (parseInt(page) + 1), { shallow: true });
                                }}
                            >
                                Next Slip
                            </Button>}
                    </div>
                </div> :
                <div className="grid grid-cols-3 w-full p-8">
                    <div className="flex items-center justify-center">
                        <Link href={"pick" + generateURL(whiteNumbers, redNumbers)}>
                            <Button
                                variant="outline"
                                size="lg"
                                color="rgba(0, 0, 0, 1)"
                                className="bg-gray-800 text-white px-8 py-4 text-lg hover:bg-gray-700 transition-colors"
                            >
                                Re-pick Numbers
                            </Button>
                        </Link>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <p>Powerball slips required:</p>
                            <p className="text-2xl font-bold">{slips}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Button
                            variant="filled"
                            size="lg"
                            color="rgba(250, 77, 88, 1)"
                            className="bg-gray-800 text-white px-8 py-4 text-lg hover:bg-gray-700 transition-colors"
                            onClick={() => {
                                // @ts-expect-error 'shallow' does not exist in type 'NavigateOptions'
                                router.push('slips' + generateURL(whiteNumbers, redNumbers) + '&page=1', { shallow: true });
                            }}
                        >
                            Start Drawing {" >"}
                        </Button>
                    </div>
                </div>
            }
        </div>
    );
}

export default function SlipPageWrapper() {
    return (
        <Suspense>
            <SlipPage />
        </Suspense>
    )
}