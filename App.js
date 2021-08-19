import React from 'react';
import {Alert} from "react-native";
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = "5913a0af57264c8feaa107e469c6bd57";


export default class extends React.Component {
  state = {
    isLoading: true
  };
  getWeather = async(latitude, longitude) => {
    const { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    console.log(data);
  }
  getLocation = async() => {
    try {
      await Location.requestForegroundPermissionsAsync();
      const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync()
      this.getWeather(latitude, longitude)
      this.setState({ isLoading: false });  
    } catch (error) {
      Alert.alert("Can't find you.", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render(){
    const { isLoading } = this.state;
    return isLoading ? <Loading/> : null;
  }
}
