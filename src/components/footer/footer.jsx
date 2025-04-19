import { useEffect, useState} from 'react';
import { FooterLeft, FooterRight } from './components';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('')
	const [temperature, setTemperature] = useState('')
	const [weather, setWeather] = useState('')

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Tolyatti&units=metric&lang=ru&appid=acd4f346c669d7400f4dbbeb7f1350e0',
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				setCity(name)
				setTemperature(Math.round(main.temp))
				setWeather(weather[0].description)
			});
	}, []);

	return (
		<div className={className}>
			<FooterLeft />
			<FooterRight city={city} temperature={temperature} weather={weather}/>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	position: fixed;
	top: calc(100vh - 140px);
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 54px;
	width: 1333px;
	height: 140px;
	font-size: 25px;
	font-weight: bold;
	box-shadow: 0 9px 35px 9px #616161;
	background-color: #fff;
`;
