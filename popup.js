document.getElementById("save").addEventListener("click", () => {
	const companies = document
		.getElementById("excludedCompanies")
		.value.split("\n");
	chrome.storage.sync.set({ excludedCompanies: companies }, () => {
		console.log("Excluded companies saved");
	});
});

// load saved on popup
chrome.storage.sync.get("excludedCompanies", (data) => {
	if (data.excludedCompanies) {
		document.getElementById("excludedCompanies").value =
			data.excludedCompanies.join("\n");
	}
});
