import React, { useEffect } from "react";
import "./Components/WeatherApp/WeatherApp.css";
import axios from "axios";

function Home() {
	const [data, setData] = React.useState({
    celcius: "",
    name: "",
    humidity: 10,
    speed: 2,
	image: 'Image/cloud.svg'
  });

	const [name, setName] = React.useState('');

	const handleClick = () => {
	if(name !== '') {
		const apiUrl =
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=53223eb8381de35b5a1d07e836c97c69&&units=metric`;
    axios.get(apiUrl)
	.then(res => {
		let imagePath = '';
		if(res.data.weather[0].main == 'Clouds'){
			imagePath = '/Images/cloud.svg'
		} else if(res.data.weather[0].main === 'Clear'){
			imagePath = 'Images/clear.svg'
		} else if(res.data.weather[0].main === 'Rain'){
			imagePath = 'Images/rain.svg'
		} else if(res.data.weather[0].main === 'Drizzle'){
			imagePath = 'Images/drizzle.svg'
		} else if(res.data.weather[0].main === 'Mist'){
			imagePath = 'Images/mist.svg'
		} else {
			imagePath = 'Image/cloud.svg'
		};
		console.log(res.data);
		setData({...data,
			celcius: Math.round(res.data.main.temp),
			name: res.data.name,
			humidity: Math.round(res.data.main.humidity),
			speed: Math.round(res.data.wind.speed),
			image: imagePath})
	})
	.catch(err => console.log(err.data));
	}
}

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input type="text" placeholder="Enter city name" onChange={e => setName(e.target.value)}></input>
          <button onClick={handleClick}>
            <img src="/Images/search.svg" alt=""></img>
          </button>
        </div>
        <div className="winfo">
          <img src={data.image} alt=""></img>
          <h1>{data.celcius}°C</h1>
          <h2>{data.name}</h2>
          <div className="details">
            <div className="col">
              <img src="/Images/humidity.svg" alt=""></img>
              <div className='humidity'>
                <p>{data.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src="/Images/wind.svg" alt=""></img>
              <div className='wind'>
                <p>{data.speed} km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
