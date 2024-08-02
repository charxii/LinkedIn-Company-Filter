function hideJobPostings() {
	chrome.storage.sync.get("excludedCompanies", (data) => {
		const excludedCompanies = data.excludedCompanies || [];
		console.log("Excluded companies:", excludedCompanies);

		const jobPostings = document.querySelectorAll(
			".jobs-search-results__list-item"
		);
		console.log("Found job postings:", jobPostings.length);

		jobPostings.forEach((posting) => {
			const companyNameElement = posting.querySelector(
				".job-card-container__primary-description"
			);
			if (companyNameElement) {
				const companyName = companyNameElement.textContent.trim();
				const shouldHide = excludedCompanies.includes(companyName);

				if (shouldHide) {
					posting.style.display = "none";
				} else {
					posting.style.display = ""; // unhide
				}
			}
		});
	});
}

hideJobPostings();

const observer = new MutationObserver((mutations) => {
	for (let mutation of mutations) {
		if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
			hideJobPostings();
			break;
		}
	}
});

observer.observe(document.body, {
	childList: true,
	subtree: true,
});

setInterval(() => {
	hideJobPostings();
}, 2000);
