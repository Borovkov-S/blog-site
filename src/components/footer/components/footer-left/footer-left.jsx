import styled from "styled-components"

const FooterLeftContainer = ({className}) => {
	return (
		<div className={className}>
			<p>Блог веб-разработчика</p>
			<a href='web@developer.ru'>web@developer.ru</a>
		</div>
	)
}

export const FooterLeft= styled(FooterLeftContainer)`
	display: flex;
	flex-direction: column;
	gap: 5px;
`
