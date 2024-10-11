'use client'

import { Button } from "@mantine/core";
import Image from 'next/image';
// import PowerballLogo from '../assets/PowerballLogo.svg';
import Link from 'next/link';

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
            {/* Header Section */}
            <header className="text-center mb-12">
                {/* <Image src={PowerballLogo} alt="Powerball Logo" width={150} height={150} /> */}
                <h1 className="text-5xl font-bold text-gray-800 mt-4">Generate Your Powerball Tickets</h1>
                <p className="text-lg text-gray-600 mt-2">Enter your numbers and create all possible Powerball ticket combinations!</p>
            </header>

            {/* Main Section */}
            <main className="flex flex-col items-center gap-8">
                <div className="text-center max-w-xl">
                    <h2 className="text-2xl font-bold text-gray-700">How It Works</h2>
                    <p className="text-lg text-gray-600 mt-4">
                        Choose up to 15 white numbers and up to 10 red numbers, and we'll generate every possible valid ticket combination.
                        You'll be able to preview the total cost, number of tickets, and even print your tickets!
                    </p>
                </div>

                {/* CTA Button */}
                <Link href={"pick"}>
                    <Button
                        variant="outline"
                        size="lg"
                        color="rgba(0, 0, 0, 1)"
                        className="bg-gray-800 text-white px-8 py-4 text-lg hover:bg-gray-700 transition-colors"
                    >
                        Start Now
                    </Button>
                </Link>
            </main>

            {/* Footer Section */}
            <footer className="mt-16 text-gray-600 text-center">
                <p>&copy; 2024 Powerball Ticket Printer. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
