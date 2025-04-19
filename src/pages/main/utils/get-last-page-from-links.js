export const getLastPageFromLinks = (links) => {
	const result = links.match(/page=(\d{1,4})&_limit=\d{1,4}>; rel="last"$/)

	return result ? Number(result[1]) : 1
}

