import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getApi1Url } from "../Services/apiService1";


const notify=()=>{
  toast("Please Enter Valid City Name",
  {position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",})
}

function Weather() {


  const apiKey = "46e443772309165a769302e69da761ba"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})
  
  
  const getWetherDetails = (cityName) => {
      const apiURL = getApi1Url() + cityName + "&appid=" + apiKey
      axios.get(apiURL).then((res) => {
          console.log("response", res.data)
          setData(res.data)
      })
      .catch((err) => {
        console.log("err", err)
        setData({});
        notify();
      })
  }

  const handleChangeInput = (e) => {
      console.log("value", e.target.value)
      setInputCity(e.target.value)  
  }

  const handleSearch = () => {

      getWetherDetails(inputCity);

  }


  return (
  //gap-10 col-12 mt-0 text-center
    <div className="margin">
        <div >
          <label for="mytext">Enter any city: </label>
          <input  id="mytext" type="text" 
            value={inputCity}
            onChange={handleChangeInput} />
          <button  type="button"
            onClick={handleSearch}
          >Search</button>
        <ToastContainer/>
      </div>

      {Object.keys(data).length > 0 &&
        <div >

          <div>
            

            <h5 >
              {data?.name}
            </h5>
            <p>Temerature: {((data?.main?.temp) - 273.15).toFixed(2)}°C</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Wind Speed: {data.wind.speed} km/hr</p>
            <p>Visibility: {(data.visibility)/1000} km</p>
            <p>Type: {data.weather[0].main} ({data.weather[0].description})</p>

          </div>
        </div>
      }
    
    </div>
    
  );
  
}


export default Weather;
// // 46e443772309165a769302e69da761ba
