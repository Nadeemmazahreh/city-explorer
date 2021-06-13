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
    }
  }
  
  getLocation = async(event) => {
    event.preventDefault()
    let locquery = event.target.query.value
    let locURL = `https://eu1.locationiq.com/v1/search.php?key=pk.c633e3c3415d57a3e6605607e0a87b4f&q=${locquery}&format=json`
    try{
      let result = await axios.get(locURL);
      console.log(result.data);
      this.setState({
      locData: result.data[0],
      map: true,
    })
    }
    catch{
      this.setState({
        errMsg : 'Unable to geocode',
        displayErr: true,
        
      })

    }
}
  
  render(){
    return(
      <div>
        <form onSubmit={this.getLocation}>
          <input type='text' placeholder='City Name' name='query' />
          <input type='submit' value='search'/>
        </form>
        <p>{this.state.locData.display_name}</p>
        <p>{this.state.locData.lat}</p>
        <p>{this.state.locData.lon}</p>
        {this.state.map && <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.c633e3c3415d57a3e6605607e0a87b4f&center=${this.state.locData.lat},${this.state.locData.lon}`} alt='map'/>}
        {this.state.displayErr && this.state.errMsg}
      </div>
    )
  }

}


export default App;
