/**
 * Created by fatih on 13/03/16.
 */

'use strict';

/**
 * APP is an application class to deal with
 * @constructor
 */
var APP = function(){
    this.init = function(){
        console.debug("New App has been initiated.");
        return this;
    };

    /**
     * This method is a observer to draw openlayers map
     */
    this.drawMap = function(target){
        try{
            var map = new ol.Map({
                target: target,
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([-76.609383, 39.299236]),
                    zoom: 16
                })
            });
        }catch (e){
            throw new Error("Error occurred while generating the map. Please see error: " + e);
        }
    };

    this.drawStops = function(bss){
        if ( ! bss.hasOwnProperty("stops")) throw "Bus stops are not defined!";
        try{
            var start_point = new ol.geom.Point(0,10);
            var end_point = new ol.geom.Point(30,0);

            start_point.transform(
                new ol.Projection("EPSG:4326"),
                new ol.Projection("EPSG:900913")
            );
            end_point.transform(
                new ol.Projection("EPSG:4326"),
                new ol.Projection("EPSG:900913")
            );

            map.zoomToMaxExtent();
        }catch (e){
            console.error("Could not draw bus stops. Please see error: " + e);
        }
    };
};
