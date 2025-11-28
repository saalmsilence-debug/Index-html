// -------------------------------------------
//  GLOBAL APP LOGIC – NEXUS LEDGER MVP
// -------------------------------------------

// Temporary exchange rate (replace later with API)
const EXCHANGE_RATE_KSH_TO_USD = 0.0076;

/**
 * Update Ksh + USD dual-currency display
 */
function updateNetBalanceDisplay(currentKshBalance) {
    const usdEquivalent = currentKshBalance * EXCHANGE_RATE_KSH_TO_USD;

    // Format
    const kshFormatted = currentKshBalance.toLocaleString('en-KE', {
        style: 'currency',
        currency: 'KES'
    });

    const usdFormatted = usdEquivalent.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    document.getElementById('net-balance-ksh').textContent = kshFormatted;
    document.getElementById('net-balance-usd-ref').textContent = `~${usdFormatted}`;
    
    // Simple Financial Health Score
    const fhsScore = Math.min(100, Math.max(0, 50 + (currentKshBalance / 10000) * 10));
    document.getElementById('fhs-score').textContent = Math.round(fhsScore);
}

// -------------------------------------------
//  INITIALIZE SYSTEM
// -------------------------------------------
let initialBalance = 50000; // Example starting balance
updateNetBalanceDisplay(initialBalance);