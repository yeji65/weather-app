import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect,useState } from 'react';
import WeatherBox from "./component/WeatherBox"
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";


// 1. 앱이 실행되지마자 현재 위치기반의 날씨가 보인다.
// 2. 날씨정보에는 도시, 섭씨, 화씨 , 날씨 상태 
// 3. 5개 버튼이 있다.(1개는 현재위치,4개는 다른 도시)
// 4. 도시버튼을 클릭할 때 마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 보인다.
// 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.

function App() {
  const[weather,setWeather]= useState(null)
  const [city,setCity] = useState('')
  const [loading,setLoading] = useState(false)

  const cities=['paris','new york','tokyo','seoul']

  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        console.log(lat,lon)
        getWeatherByCurrentLocation(lat,lon)
    });
  }
    const getWeatherByCurrentLocation = async(lat,lon)=>{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8c9926d4f7b0ee4a61a48b8edea87ab7&units=metric`
      setLoading(true)
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data)
      setLoading(false)
    }
    const getWeatherByCity = async()=>{
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8c9926d4f7b0ee4a61a48b8edea87ab7&units=metric`
      setLoading(true)
      let response = await fetch(url);
      let data = await response.json();
      console.log("data",data)
      setWeather(data)  
      setLoading(false)
    }
  

  useEffect(()=>{
    if(city==""){
    getCurrentLocation();
    }else{
    getWeatherByCity();
    }
  },[city])

 
  

  return (
    <div>
      {loading ? ( 
         <div className='container'>
     <ClipLoader color="#f88c6b" loading={loading} size={150} />
     </div>
      ) : ( <div className='container'>
      <WeatherBox weather={weather}/> 
      <WeatherButton cities={cities} setCity={setCity} />
      </div>)}
      
    </div>
  );
}

export default App;
