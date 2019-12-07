import { Component, OnInit, AfterContentInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Post, PostService } from '../services/post.service';
declare var google;
import { Observable } from 'rxjs';

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
  posts: Observable<Post[]>;
  
  @ViewChild('mapElement',{static:false}) mapElement: ElementRef;

  constructor(private geolocation: Geolocation,private postService: PostService) { }


  ngOnInit() {
    this.posts=this.postService.getPosts();
  }


  ngAfterViewInit(): void {
    var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      const map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: 22.1509523, lng: -100.9707753},
        zoom: 14
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


      var icons = {
        0: {
            icon: image
        },
        1: {
            icon: image
        },
        2: {
            icon: image
        }
      };
  
      this.posts.subscribe({
        next(objetos) {
          objetos.forEach(post => {
            var myLatlng = new google.maps.LatLng(parseFloat(post.Lat),parseFloat(post.Lon));

            var marker = new google.maps.Marker({
              position:myLatlng,
              icon: icons[post.clasification].icon,
              map: map
          });
          });
        },
        error(err) { console.log('errors'); }
      })

    }).catch((error) => {
      console.log('Error getting location', error);
    });    
  }  
}
