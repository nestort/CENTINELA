import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {
  map; 
  heatmap;
  latitude: any;
  longitude: any;
  
  @ViewChild('mapElement',{static:false}) mapElement: ElementRef;

  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      const map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: 22.1509523, lng: -100.9707753},
        zoom: 16
      });

      const infoWindow = new google.maps.InfoWindow;
      const pos = {
        lat: this.latitude,
        lng: this.longitude
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(22.151206, -101.028682),
        map: map,
        icon: image
      });
      map.setContent(marker);

    }).catch((error) => {
      console.log('Error getting location', error);
    });


    
  }

  getPoints(){
    return [
      new google.maps.LatLng(22.170305, -101.040403),
      new google.maps.LatLng(22.172471, -101.039479),
      new google.maps.LatLng(22.166597, -101.039295),
      new google.maps.LatLng(22.169638, -101.040936),
      new google.maps.LatLng(22.168336, -101.044823),];

  }
}
