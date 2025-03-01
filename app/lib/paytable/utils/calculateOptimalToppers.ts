import { getShareAmount } from "../shareBasedPaytable";

export function calculateOptimalToppers(
    totalPrizePool: number,
    ticketPrice: number,
    top10PercentPlaces: number,
    moneyBackTotal: number,
    inbetweenersMultiplier: number,
    decimalPlacesUsed : number
) : {toppersAmount : number, toppersPrizePool : number} {
    // Binary search approach - much faster than decrementing one by one
    let left = 1;
    let right = top10PercentPlaces;
    let resultToppersPrizePool = 0;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        // Calculate values for this number of toppers
        const inbetweenersAmount = top10PercentPlaces - mid;
        const moneyInbetweenersTotal = inbetweenersAmount * ticketPrice * inbetweenersMultiplier;
        const toppersPrizePool = totalPrizePool - (moneyBackTotal + moneyInbetweenersTotal);
        
        // Get share amount for last topper
        const { share } = getShareAmount(mid);
        const lastTopperReward = share * toppersPrizePool;
        const inbetweenerReward = ticketPrice * inbetweenersMultiplier;
        
        // if (Math.abs(lastTopperReward - inbetweenerReward) < 0.000001) {
        if (Math.abs(lastTopperReward - inbetweenerReward) < (1/Math.pow(10, decimalPlacesUsed))) {
            // Found exact match (within floating point precision)
            return {
                toppersAmount: mid,
                toppersPrizePool
            };
        } else if (lastTopperReward < inbetweenerReward) {
            // Need fewer toppers
            right = mid - 1;
            resultToppersPrizePool = toppersPrizePool;
        } else {
            // Need more toppers
            left = mid + 1;
        }
    }

    
    // Calculate final toppers prize pool for the right value
    const finalInbetweenersAmount = top10PercentPlaces - right;
    const finalMoneyInbetweenersTotal = finalInbetweenersAmount * ticketPrice * inbetweenersMultiplier;
    const finalToppersPrizePool = totalPrizePool - (moneyBackTotal + finalMoneyInbetweenersTotal);

    return {
        toppersAmount: right,
        toppersPrizePool: finalToppersPrizePool
    };
}