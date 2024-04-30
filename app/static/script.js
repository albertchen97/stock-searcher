/**
 * Submits the form by fetching meta data for the given ticker.
 *
 * @return {void} No return value.
 */
function submitForm() {
	const ticker = document.getElementById("ticker").value;
	if (ticker.trim() !== "") {
		fetchMetaData(ticker);
	}
}

function displayCompanyOutlook() {
	const ticker = document.getElementById("ticker").value;
	if (ticker.trim() !== "") {
		fetchMetaData(ticker);
	}
}

function displayStockSummary() {
	const ticker = document.getElementById("ticker").value;
	if (ticker.trim() !== "") {
		fetchTopOfBook(ticker);
	}
}

/**
 * Fetches Tiingo meta data for the given ticker from the server
 *
 * @param {string} ticker - The stock ticker symbol
 */
function fetchMetaData(ticker) {
	const url = `/meta_data/${ticker}`;
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				const data = JSON.parse(xhr.responseText);
				console.log(data);
				if (data === null) {
					// Handle invalid ticker symbols
					document.getElementById("stock-table").innerHTML =
						"Error: No record has been found. Please enter a valid symbol.";
				} else {
					generateCompanyOutlookTable(data);
				}
			} else {
				console.error("error fetching data");
			}
		}
	};
	xhr.open("GET", url);
	xhr.send();
}

/**
 * Fetches Tiingo current top-of-book and last price data for the given ticker from the server
 *
 * @param {string} ticker - The stock ticker symbol
 */
function fetchTopOfBook(ticker) {
	const url = `/top_of_book/${ticker}`;
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				const data = JSON.parse(xhr.responseText);
				if (data === null || data[0] === null) {
					// Handle invalid ticker symbols
					document.getElementById("stock-table").innerHTML =
						"Error: No record has been found. Please enter a valid symbol.";
				} else {
					generateStockSummaryTable(data[0]);
				}
			} else {
				console.error("error fetching data");
			}
		}
	};
	xhr.open("GET", url);
	xhr.send();
}

/**
 * Generates a company outlook table.
 *
 * @param {JSON} data - The JSON object for all the stock data fetched from Tiingo
 */
function generateCompanyOutlookTable(data) {
	const table = document.getElementById("stock-table");

	// Clear existing table content
	table.innerHTML = "";

	// Generate a table
	const titles = {
		name: "Company Name",
		ticker: "Stock Ticker Symbol",
		exchangeCode: "Stock Exchange Code",
		startDate: "Company Start Date",
		description: "Description",
	};
	for (const key in titles) {
		const row = table.insertRow();
		const keyCell = row.insertCell();
		const valueCell = row.insertCell();
		keyCell.appendChild(document.createTextNode(titles[key]));
		if (key === "description") {
			// Truncate description to the first five lines with an ellipsis
			const descriptionDiv = document.createElement("div");
			descriptionDiv.classList.add("truncated-text");
			const lines = data[key].split("\n");
			const truncatedDescription = lines.slice(0, 5).join("\n");
			descriptionDiv.appendChild(
				document.createTextNode(
					truncatedDescription + (lines.length > 5 ? "..." : "")
				)
			);
			valueCell.appendChild(descriptionDiv);
		} else {
			valueCell.appendChild(document.createTextNode(data[key]));
		}
	}
}

/**
 * Generates a table with stock summary data based on the provided data object.
 *
 * @param {JSON} data - The JSON object for all the stock data fetched from Tiingo
 */
function generateStockSummaryTable(data) {
	const table = document.getElementById("stock-table");

	// Clear existing table
	table.innerHTML = "";

	// Generate a table
	const titles = {
		ticker: "Stock Ticker Symbol",
		timestamp: "Trading Day",
		prevClose: "Previous Closing Price",
		open: "Opening Price",
		high: "High Price",
		low: "Low Price",
		last: "Last Price",
		change: "Change",
		changePercent: "Change Percent",
		volume: "Number of Shares Traded",
	};

	const changeValue = (data["last"] - data["prevClose"]).toFixed(2);
	const changePercentValue = (
		(changeValue / data["prevClose"]) *
		100
	).toFixed(2);

	const arrowImage = document.createElement("img");
	arrowImage.classList.add("arrow-image");
	arrowImage.setAttribute("width", "15px");
	arrowImage.setAttribute("height", "15px");
	if (changeValue > 0) {
		arrowImage.setAttribute("src", "../static/images/GreenArrowUP.png");
	} else if (changeValue < 0) {
		arrowImage.setAttribute("src", "../static/images/RedArrowDown.png");
	}

	for (const key in titles) {
		const row = table.insertRow();
		const keyCell = row.insertCell();
		const valueCell = row.insertCell();
		switch (key) {
			case "change":
				keyCell.appendChild(document.createTextNode(titles[key]));
				valueCell.appendChild(
					document.createTextNode(changeValue.toString())
				);
				valueCell.appendChild(arrowImage);
				break;

			case "changePercent":
				keyCell.appendChild(document.createTextNode(titles[key]));
				valueCell.appendChild(
					document.createTextNode(changePercentValue.toString())
				);
				break;

			default:
				keyCell.appendChild(document.createTextNode(titles[key]));
				valueCell.appendChild(document.createTextNode(data[key]));
				break;
		}
	}
}

/**
 * Clear the table content
 */
function clearTable() {
	document.getElementById("stock-table").innerHTML = "";
}
