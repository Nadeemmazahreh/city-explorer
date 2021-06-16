import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';
import { result } from 'lodash';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      locData:'',
      errMsg : '',
      displayErr: false,
      map : false,
      weather: false,
      weatherData : [],
      searchQuery : ''
    }
  }
  UpdateSearchQuery = (event) => {
    this.setState ({
      searchQuery : event.target.value
    })
  }

  getWeather = async() => {
      try{
         let weatherResult = await axios.get(`https://city-explorer-api33.herokuapp.com/weather?searchQuery=${this.state.searchQuery}`);
         console.log(weatherResult.data);
         this.setState({
           weatherData : weatherResult.data,
           weather : true
         })
      }
      catch{
        this.setState({
          displayErr :true
        })
      }
  }
  
  getLocation = async(event) => {
    event.preventDefault()
    let locURL = `https://eu1.locationiq.com/v1/search.php?key=pk.c633e3c3415d57a3e6605607e0a87b4f&q=${this.state.searchQuery}&format=json`
    try{
      let result = await axios.get(locURL);
      console.log(result.data);
      this.setState({
      locData: result.data[0],
      map: true,
      weather :true,
    })
    }
    catch{
      this.setState({
        errMsg : 'Unable to geocode',
        displayErr: true,
        
      })

    }
    this.getWeather()
}
  
  render(){
    return(
      <div>
        <form onSubmit={this.getLocation}>
          <input type='text' placeholder='City Name' name='query' onChange={this.UpdateSearchQuery}/>
          <input type='submit' value='search'/>
        </form>
        <p>{this.state.locData.display_name}</p>
        <p>{this.state.locData.lat}</p>
        <p>{this.state.locData.lon}</p>
        {this.state.map && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.c633e3c3415d57a3e6605607e0a87b4f&center=${this.state.locData.lat},${this.state.locData.lon}`} alt='map'/>}
        {this.state.displayErr && this.state.errMsg}
        {this.state.weather && this.state.weatherData.map(item =>(
          <div>
            <p>date: {item.date}</p>
            <p>description: {item.description}</p>
          </div>
    ))}
      </div>
    )
  }


}


export default App;
