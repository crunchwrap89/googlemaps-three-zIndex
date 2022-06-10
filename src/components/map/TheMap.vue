<template><div></div></template>
<script setup lang="ts">
import {
  Mesh,
  Scene,
  HemisphereLight,
  WebGLRenderer,
  MeshLambertMaterial,
  PerspectiveCamera,
  PCFSoftShadowMap,
  sRGBEncoding,
  BoxGeometry
} from "three";

import { ThreeJSOverlayView, latLngToVector3 } from "@googlemaps/three";
import { useInitMap } from "@/composables/useInitMap";

const { initMap } = useInitMap();
const map = await initMap();

        //add colors to all countries with geojson data.
            map.data.loadGeoJson('/geojson.json');

            map.data.setStyle(function(feature) {
                var color = 'green';
                return /** @type {google.maps.Data.StyleOptions} */({
                    fillColor: color,
                    strokeColor: color,
                    strokeWeight: 2,
                    zIndex: 0
                });
            });

    //create scene and add lighting
      const scene = new Scene();
      const hemiLight = new HemisphereLight(0xffffff, 0x444444, 0.8);
      hemiLight.position.set(0, 1, -0.2).normalize();
      scene.add(hemiLight);

    //create ThreeJSOverlayView
      const overlay = new ThreeJSOverlayView({
        scene,
        map,
        THREE: {
          Scene,
          WebGLRenderer,
          PerspectiveCamera,
          PCFSoftShadowMap,
          sRGBEncoding,
        },
      });

    //add a 3D box to the scene on manhattan
      const geometry = new BoxGeometry( 400000, 400000, 400000 );

      const box = new Mesh( geometry, new MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
          latLngToVector3(
            {
            lat: 40.776676,
            lng: -73.971321,
            },
            box.position
          );
          overlay.scene.add(box);

    overlay.requestRedraw();


    //add a drawing Manager for ability to draw on map
    const drawingManager = new google.maps.drawing.DrawingManager(
          {
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.CIRCLE,
            google.maps.drawing.OverlayType.POLYGON,
            google.maps.drawing.OverlayType.POLYLINE,
            google.maps.drawing.OverlayType.RECTANGLE,
          ],
        },
        circleOptions: {
          fillColor: "#ffff00",
          fillOpacity: 1,
          strokeWeight: 5,
          clickable: false,
          editable: false,
          zIndex: 0,
        },
      }
    );
    
drawingManager.setMap(map);

    (window as any).__GLOBALS__ = {
        overlay: overlay,
        map: map
      };



</script>
