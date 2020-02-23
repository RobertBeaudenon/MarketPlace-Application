import { Component, Input, ViewChild, NgZone, OnInit, Output, EventEmitter } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  circleRadius: number = 5000;

  //to pass var from child component to parent component
  @Output() latitude = new EventEmitter<string>();
  @Output() longitude = new EventEmitter<string>();

  constructor(public mapsApiLoader: MapsAPILoader, private zone: NgZone, private wrapper: GoogleMapsAPIWrapper) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {
    this.location.marker.draggable = true;
  }

  geocoder: any;
  public location: Location = {
    lat: 45.5041,
    lng: -73.5747,
    marker: {
      lat: 45.5041,
      lng: -73.5747,
      draggable: true
    },
    zoom: 5
  };

  @ViewChild(AgmMap, { static: true }) map: AgmMap;

  updateOnMap() {
    let full_address: string = this.location.address_level_1 || '';
    if (this.location.address_level_2) full_address = full_address + ' ' + this.location.address_level_2;
    if (this.location.address_state) full_address = full_address + ' ' + this.location.address_state;
    if (this.location.address_country) full_address = full_address + ' ' + this.location.address_country;

    this.findLocation(full_address);
  }

  findLocation(address) {
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
    this.geocoder.geocode(
      {
        address: address
      },
      (results, status) => {
        console.log(results);
        if (status == google.maps.GeocoderStatus.OK) {
          for (var i = 0; i < results[0].address_components.length; i++) {
            let types = results[0].address_components[i].types;

            if (types.indexOf('locality') != -1) {
              this.location.address_level_2 = results[0].address_components[i].long_name;
            }
            if (types.indexOf('country') != -1) {
              this.location.address_country = results[0].address_components[i].long_name;
            }
            if (types.indexOf('postal_code') != -1) {
              this.location.address_zip = results[0].address_components[i].long_name;
            }
            if (types.indexOf('administrative_area_level_1') != -1) {
              this.location.address_state = results[0].address_components[i].long_name;
            }
          }

          if (results[0].geometry.location) {
            //console.log(results[0].geometry.location.lat());

            //transfering data to parent child
            this.latitude.emit(results[0].geometry.location.lat());
            this.longitude.emit(results[0].geometry.location.lng());

            this.longitude = results[0].geometry.location.lng();
            this.location.lat = results[0].geometry.location.lat();
            this.location.lng = results[0].geometry.location.lng();
            this.location.marker.lat = results[0].geometry.location.lat();
            this.location.marker.lng = results[0].geometry.location.lng();
            this.location.marker.draggable = true;
            this.location.viewport = results[0].geometry.viewport;
          }

          this.map.triggerResize();
        } else {
          alert('Sorry, this search produced no results.');
        }
      }
    );
  }

  markerDragEnd(m: any, $event: any) {
    this.location.marker.lat = m.coords.lat;
    this.location.marker.lng = m.coords.lng;
    this.findAddressByCoordinates();
  }

  findAddressByCoordinates() {
    this.geocoder.geocode(
      {
        location: {
          lat: this.location.marker.lat,
          lng: this.location.marker.lng
        }
      },
      (results, status) => {
        this.decomposeAddressComponents(results);
      }
    );
  }

  decomposeAddressComponents(addressArray) {
    if (addressArray.length == 0) return false;
    let address = addressArray[0].address_components;

    for (let element of address) {
      if (element.length == 0 && !element['types']) continue;

      if (element['types'].indexOf('street_number') > -1) {
        this.location.address_level_1 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('route') > -1) {
        this.location.address_level_1 += ', ' + element['long_name'];
        continue;
      }
      if (element['types'].indexOf('locality') > -1) {
        this.location.address_level_2 = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('administrative_area_level_1') > -1) {
        this.location.address_state = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('country') > -1) {
        this.location.address_country = element['long_name'];
        continue;
      }
      if (element['types'].indexOf('postal_code') > -1) {
        this.location.address_zip = element['long_name'];
        continue;
      }
    }
  }

  milesToRadius(value) {
    this.circleRadius = value / 0.00062137;
  }

  circleRadiusInMiles() {
    return this.circleRadius * 0.00062137;
  }
}
