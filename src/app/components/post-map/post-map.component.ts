import { Component, Input, ViewChild, NgZone, OnInit } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core';

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
  selector: 'app-post-map',
  templateUrl: './post-map.component.html',

  styleUrls: ['./post-map.component.css']
})
export class PostMapComponent implements OnInit {
  @Input() latitude: number;
  @Input() longitude: number;
  flag = false;

  constructor(public mapsApiLoader: MapsAPILoader, private zone: NgZone, private wrapper: GoogleMapsAPIWrapper) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  geocoder: any;

  public location: Location = {
    lat: 1234,
    lng: this.longitude,
    marker: {
      lat: this.latitude,
      lng: this.longitude,
      draggable: true
    },
    zoom: 9
  };

  @ViewChild(AgmMap, { static: true }) map: AgmMap;

  ngOnInit() {
    this.location.marker.draggable = true;

    console.log(typeof this.location.lng);
    // if (this.location.lat && this.location.lng) {
    //   this.flag = true;
    // }
  }
}
