import { combinations } from "@/functions/math";

export default function Chart() {
    let cs = [];
    for (let i = 2; i < 7; i++) {
      for (let j = 7; j < 12; j++) {
        cs.push(combinations(j, 5)! * i);
      }
    }
    /* Table */
    return (
        <div className="grid grid-rows-[30px_30px_48px_48px_48px_48px_48px] grid-cols-[30px_30px_48px_48px_48px_48px_48px]">
            {/* Blank */}
            <div className="row-span-2 col-span-2"></div>
            {/* Red Label */}
            <div className="col-span-5 border-l-[1px] border-r-[1px] border-t-[1px] border-black bg-primary place-content-center">
                <p className="text-white text-center font-bold">RED</p>
            </div>
            {/* Red Numbers */}
            <div className="border-b-[1px] border-l-[1px] border-black bg-white place-content-center">
                <p className="text-primary text-center font-bold">2</p>
            </div>
            <div className="border-b-[1px] border-black bg-primary_highlight place-content-center">
                <p className="text-primary text-center font-bold">3</p>
            </div>
            <div className="border-b-[1px] border-black bg-white place-content-center">
                <p className="text-primary text-center font-bold">4</p>
            </div>
            <div className="border-b-[1px] border-black bg-primary_highlight place-content-center">
                <p className="text-primary text-center font-bold">5</p>
            </div>
            <div className="border-b-[1px] border-r-[1px] border-black bg-white place-content-center">
                <p className="text-primary text-center font-bold">6</p>
            </div>
            {/* White Label */}
            <div className="row-span-5 border-l-[1px] border-t-[1px] border-b-[1px] border-black bg-black place-content-center">
                <p className="text-white text-center font-bold [writing-mode:vertical-rl] rotate-180">WHITE</p>
            </div>
            {/* Rows */}
            {/* Row 1 */}
            <div className="border-r-[1px] border-t-[1px] border-black bg-white place-content-center">
                <p className="text-black text-center font-bold">7</p>
            </div>
            <div className="border-t-[1px] border-l-[1px] border-black bg-white place-content-center">
                <p className="text-black text-center font-bold">{cs[0]}</p>
            </div>
            <div className="border-t-[1px] border-black bg-primary_highlight place-content-center">
                <p className="text-black text-center font-bold">{cs[1]}</p>
            </div>
            <div className="border-t-[1px] border-black bg-white place-content-center">
                <p className="text-black text-center font-bold">{cs[2]}</p>
            </div>
            <div className="border-t-[1px] border-black bg-primary_highlight place-content-center">
                <p className="text-black text-center font-bold">{cs[3]}</p>
            </div>
            <div className="border-t-[1px] border-r-[1px] border-black bg-white place-content-center">
                <p className="text-black text-center font-bold">{cs[4]}</p>
            </div>
            {/* Row 2 */}
            <div className="border-r-[1px] border-black bg-black_highlight place-content-center">
                <p className="text-black text-center font-bold">8</p>
            </div>
            <div className="border-l-[1px] border-black bg-black_highlight place-content-center">
                <p className="text-black text-center font-bold">{cs[5]}</p>
            </div>
            <div className="border-black bg-primary_black_highlight place-content-center">
                <p className="text-black text-center font-bold">{cs[6]}</p>
            </div>
            <div className="border-black bg-black_highlight place-content-center">
                <p className="text-black text-center font-bold">{cs[7]}</p>
            </div>
            <div className="border-black bg-primary_black_highlight place-content-center">
                <p className="text-black text-center font-bold">{cs[8]}</p>
            </div>
            <div className="border-r-[1px] border-black bg-black_highlight place-content-center">
                <p className="text-black text-center font-bold">{cs[9]}</p>
            </div>
            {/* Row 3 */}
            <div className="border-r-[1px] border-black bg-white place-content-center">
                <p className="text-black text-center font-bold">9</p>
            </div>
            <div className="border-l-[1px] border-black bg-white place-content-center">
                <p className="text-black text-center font-bold">{cs[10]}</p>
            </div>
            <div className="border-black bg-primary_highlight place-content-center">
                <p className="text-black text-center font-bold">{cs[11]}</p>
            </div>
            <div className="border-black bg-white place-content-center">
                <p className="text-black text-center font-bold">{cs[12]}</p>
            </div>
            <div className="border-black bg-primary_highlight place-content-center">
                <p className="text-black text-center font-bold">{cs[13]}</p>
            </div>
            <div className="border-r-[1px] border-black bg-white place-content-center">
                <p className="text-black text-center font-bold">{cs[14]}</p>
            </div>
            {/* Row 4 */}
            <div className="border-r-[1px] border-black bg-black_highlight place-content-center">
                <p className="text-black text-center font-bold">10</p>
            </div>
            <div className="border-l-[1px] border-black bg-black_highlight place-content-center">
                <p className="text-black text-center font-bold">{cs[15]}</p>
            </div>
            <div className="border-black bg-primary_black_highlight place-content-center">
                <p className="text-black text-center font-bold">{cs[16]}</p>
            </div>
            <div className="border-black bg-black_highlight place-content-center">
                <p className="text-black text-center font-bold">{cs[17]}</p>
            </div>
            <div className="border-black bg-primary_black_highlight place-content-center">
                <p className="text-black text-center font-bold">{cs[18]}</p>
            </div>
            <div className="border-r-[1px] border-black bg-black_highlight place-content-center">
                <p className="text-black text-center font-bold">{cs[19]}</p>
            </div>
            {/* Row 5 */}
            <div className="border-r-[1px] border-b-[1px] border-black bg-white place-content-center">
                <p className="text-black text-center font-bold">11</p>
            </div>
            <div className="border-b-[1px] border-l-[1px] border-black bg-white place-content-center">
                <p className="text-black text-center font-bold">{cs[20]}</p>
            </div>
            <div className="border-b-[1px] border-black bg-primary_highlight place-content-center">
                <p className="text-black text-center font-bold">{cs[21]}</p>
            </div>
            <div className="border-b-[1px] border-black bg-white place-content-center">
                <p className="text-black text-center font-bold">{cs[22]}</p>
            </div>
            <div className="border-b-[1px] border-black bg-primary_highlight place-content-center">
                <p className="text-black text-center font-bold">{cs[23]}</p>
            </div>
            <div className="border-b-[1px] border-r-[1px] border-black bg-white place-content-center">
                <p className="text-black text-center font-bold">{cs[24]}</p>
            </div>
        </div>
    )
}