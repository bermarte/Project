import React, { Component } from 'react';
import Datamaps from 'datamaps';
import { ISOCODE3 } from '../data/isoCountries';

class WorldMap extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
      mapStyle: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };
  }

  componentDidMount = () => {

    //list of countries from the D3
    var countries = Datamaps.prototype.worldTopo.objects.world.geometries;
    for (var i = 0, j = countries.length; i < j; i++) {
      console.log(countries[i].properties.name, countries[i].id);
      
    }

    this.map = this.renderMap();
    // Add listener to resize map
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount = () => window.removeEventListener('resize', this.onResize);

  onResize = () => {
    //map is responsive
    this.map.resize();
  }

  renderMap = () => new Datamaps({
    scope: "world",
    element: document.getElementById('map-container'),
    responsive: true,
    geographyConfig: {
      popupOnHover: true,
      highlightOnHover: true,
      borderColor: "#444",
      borderWidth: 0.5,
      highlightFillColor: 'rgba(94, 129, 172, 0.5)',
      highlightBorderColor: 'rgba(67, 76, 94, 0.5)',
      popupTemplate: function (geography, data) { 
        //this function should just return a string
        return '<div style="color: #1864ab; background-color: rgba(236, 239, 244, 0.5); padding: 12px 30px; border-radius: 25px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); margin: 8px"><strong>' + geography.properties.name + '</strong></div>';
      },
    },
    fills: {
      Visited: "#306596",
      neato: "rgba(15,160, 250,0.5)",
      Trouble: "#bada55",
      defaultFill: "#dddddd"
    },
    bubblesConfig: {
      popupTemplate: function (data) {
        return (
         `<div style="color: #1864ab; background-color: rgba(236, 239, 244, 0.5); padding: 12px 30px; border-radius: 25px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); margin: 8px">
          <strong>${data.countryName} </strong><br>
          new confirmed: ${data.newConfirmed} <br>
          new deaths: ${data.newDeaths} <br>
          new recovered: ${data.newRecovered} <br>
          </div>`
        );
      },
      fillOpacity: 0.5
    },
  });
  //bubbles
  bubbles = () => {

    //convert ISO from API to Datamap
    const isoCode3 = ISOCODE3;

    function getCountryCode3(countryCode) {
      if (isoCode3.hasOwnProperty(countryCode)) {
        return isoCode3[countryCode];
      } else {
        return countryCode;
      }
    }

      //get all the countrycodes
      const countries = this.props.storage.Countries;
      const countryArray = [];
      //fill the bubbles on the map
      //inject extra properties
      for (var i in countries) {
        countryArray.push({ 
          centered: getCountryCode3(this.props.storage.Countries[i].CountryCode),
          fillKey: "neato",
          radius: 5,
          //injected
          countryName: this.props.storage.Countries[i].Country,
          newConfirmed: this.props.storage.Countries[i].NewConfirmed,
          newRecovered: this.props.storage.Countries[i].NewRecovered,
          newDeaths: this.props.storage.Countries[i].NewDeaths
        });
      }
      
      this.map.bubbles(countryArray);

  }

  render = () => 
    <React.Fragment>
    { 
      /* load bubbles only when props load is completed */
      this.props.storage.Countries ?
      this.map.bubbles = this.bubbles()
      : ''
      }
    <div id="map-container" /> 
   </React.Fragment>;
}

export default WorldMap;