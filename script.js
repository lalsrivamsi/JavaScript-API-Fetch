// Validate search input
function validateSearch() {
    const input = document.getElementById("searchInput");
    const errorText = document.getElementById("errorText");

    if (input.value.trim() === "") {
        errorText.textContent = "Please enter a search term.";
    } else {
        errorText.textContent = ""; // Clear error message
        // Proceed with search or API call
        console.log("Searching for:", input.value);
        // Add code for search handling here
    }
}

// Function to update mempool info dynamically
function updateMempoolInfo(data) {
    const mempoolInfo = document.querySelector('.mempool-info');

    // Clear existing content
    mempoolInfo.innerHTML = '<h2>Mempool Insights</h2>';

    // Iterate over transactions to dynamically create DOM elements
    data.transactions.forEach(transaction => {
        const transactionDiv = document.createElement('div');
        transactionDiv.classList.add('transaction');

        transactionDiv.innerHTML = `
            <div class="transaction-info">
                <strong>Transaction Fee:</strong> ${transaction.fee} sat/vB
                <span class="transaction-time">Estimated in ${transaction.estimatedTime}</span>
            </div>
            <strong>Data Size:</strong> ${transaction.dataSize} MB
        `;
        
        mempoolInfo.appendChild(transactionDiv);
    });

    // Update statistics
    const stats = document.createElement('div');
    stats.innerHTML = `
        <h3>Transaction Statistics</h3>
        <p>Total Transactions: ${data.totalTransactions}</p>
        <p>Average Block Time: ${data.averageBlockTime} minutes</p>
        <p>Difficulty Adjustment: ${data.difficultyAdjustment}</p>
    `;
    
    mempoolInfo.appendChild(stats);
}

// Function to simulate fetching mempool data
async function fetchMempoolData() {
    console.log("Fetching mempool data...");
    // Example data structure, replace with actual API call
    const sampleData = {
        transactions: [
            { fee: "-82", estimatedTime: "41 minutes", dataSize: "1.81" },
            { fee: "-90", estimatedTime: "30 minutes", dataSize: "1.70" },
            { fee: "-97", estimatedTime: "10 minutes", dataSize: "1.79" },
            { fee: "-111", estimatedTime: "20 minutes", dataSize: "1.69" }
        ],
        totalTransactions: 4520,
        averageBlockTime: 10.2,
        difficultyAdjustment: "No Priority"
    };
    updateMempoolInfo(sampleData);
}

// Fetch data on page load and set interval for updates
window.onload = fetchMempoolData;
setInterval(fetchMempoolData,  1 * 1000); // Refresh every 15 minutes
