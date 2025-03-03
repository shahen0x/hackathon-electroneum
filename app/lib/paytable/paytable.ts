import { ConvexError } from "convex/values";
import { generateSharePaytable } from "./shareBasedPaytable";
import { calculateOptimalToppers } from "./utils/calculateOptimalToppers";
import { getDecimalPlaces } from "./utils/getDecimalPlaces";
// import { logEntireArray } from "./utils/logEntireArray";
import { RoundToDP } from "./utils/roundDP";
import { sumPayTable } from "./utils/sumPaytable";

export async function generatePaytable(poolPrice: number, totalParticipants: number, prizePoolShare: number) {
    const totalPaidPercentage = 0.3; // 30% of total participants will be paid // ❗

    // Always use 3 decimal places more than that of the ticket price
    const decimalPlacesUsed = getDecimalPlaces(poolPrice) + 3;

    // Minimum participants check
    if (totalParticipants < 2) throw new ConvexError({ message: "Total participants must be at least 2", code: "MIN_PARTICIPANTS" });
    // if (totalParticipants < 2) throw new Error("Total participants must be at least 2");

    // Check price
    if (poolPrice < 0) throw new ConvexError({ message: "Price cannot be negative" });

    // Variables 
    let totalPrizePool = 0;
    let totalInPaytable = 0;
    let totalPlacesPaid = 0;

    // Calculate prize pool, rounded
    totalPrizePool = prizePoolShare * totalParticipants * poolPrice;

    // Calculate paid places, rounded down 
    totalPlacesPaid = Math.floor(totalPaidPercentage * totalParticipants);

    // For low participation numbers, we go directly to using share based paytable
    const minPaidPlacesToUseSharePaytableOnly = 4;

    if (totalPlacesPaid <= minPaidPlacesToUseSharePaytableOnly) {
        // For low participants, we decrease the amount of shares for the top
        let sharesOnTopPercentage = 0.1;

        if (totalParticipants < 10) {
            totalPlacesPaid = Math.round(totalPaidPercentage * totalParticipants); // rounding instead of flooring so we get 1 more paid places in some cases
            sharesOnTopPercentage = 0; // Cancel the shares on top
        }

        // Generate paytable & sum up
        const payTable = generateSharePaytable(totalPlacesPaid, totalPrizePool, decimalPlacesUsed, sharesOnTopPercentage);
        totalInPaytable = sumPayTable(payTable, decimalPlacesUsed);

        // logEntireArray(payTable);
        console.log("Total in Paytable:", totalInPaytable);
        console.log("Prize Pool:", totalPrizePool);
        return payTable;
    }

    /** FOR HIGHER PARTICIPATION NUMBER, THOSE WITH MORE PAID PLACES THAN MENTIONED ABOVE**/

    // Initialize paytable
    const payTable: number[] = new Array(totalPlacesPaid).fill(0);

    // 2/3 of the bottom paytable get their money back
    const moneyBackTotalPlayers = Math.round((2 / 3) * payTable.length);
    const moneyBackTotal = moneyBackTotalPlayers * poolPrice;

    for (let i = totalPlacesPaid - moneyBackTotalPlayers; i < totalPlacesPaid; i++) {
        payTable[i] = poolPrice;
    }

    // The top 1/3 (also means top 10% of players overall) are split into 2 groups
    // Toppers: Those who get increasing amount of payouts
    // Inbetweeners: Those who get a multiplier on the ticket price. All inbetweeners receive the same amount
    const top10PercentPlaces = totalPlacesPaid - moneyBackTotalPlayers;
    const inbetweenersMultiplier = 2;

    // Calculate amount of toppers so that the last topper receives more than an inbetweeners 
    const { toppersAmount, toppersPrizePool } = calculateOptimalToppers(
        totalPrizePool,
        poolPrice,
        top10PercentPlaces,
        moneyBackTotal,
        inbetweenersMultiplier,
        decimalPlacesUsed
    );

    if (toppersAmount < 1) throw new ConvexError("Not enough money in prize pool for this payout structure");

    // Generate the share based paytable for toppers
    const toppersTable = generateSharePaytable(toppersAmount, toppersPrizePool, decimalPlacesUsed);

    // Fill in toppers' reward
    for (let i = 0; i < toppersTable.length; i++) {
        payTable[i] = toppersTable[i];
    }

    // Fill in inbetweeners' reward
    const inbetweenerReward = poolPrice * inbetweenersMultiplier;
    for (let i = toppersAmount; i < top10PercentPlaces; i++) {
        payTable[i] = RoundToDP(inbetweenerReward, decimalPlacesUsed);
    }

    // logEntireArray(payTable);
    // Find total
    totalInPaytable = sumPayTable(payTable, decimalPlacesUsed);
    console.log("Total in Paytable:", totalInPaytable);
    console.log("Prize Pool:", totalPrizePool);
    return payTable;
}

