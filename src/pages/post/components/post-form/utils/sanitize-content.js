export const sanitizeContent = (content) =>
	content
	.replaceAll('&nbsp;', ' ')
	.replaceAll('<br><div><br></div>', '\n')
	.replaceAll('<div>', '\n')
	.replaceAll('</div>', '')
	.replaceAll('<br>', '')
