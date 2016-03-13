/**
 * Created by fatih on 13/03/16.
 */

'use strict';

/**
 * APP is an application class to deal with
 * @constructor
 */
var APP = function(){
    this.map = null;
    this.init = function(){
        return this;
    };

    /**
     * This method is a observer to draw openlayers map
     */
    this.drawMap = function(target, bss){
        try{
            // Create an openlayers map to show bus stop on an actual map
            this.map = new ol.Map({
                target: target,
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    }),
                    new ol.layer.Vector({
                        source: new ol.source.Vector({
                            features: this.drawStops(bss)
                        }),
                        style: function(feature) {
                            return new ol.style.Style({
                                image: new ol.style.Icon({
                                    anchor: [0.5, 46],
                                    anchorXUnits: 'fraction',
                                    anchorYUnits: 'pixels',
                                    src: 'app/assets/img/busstop.png'
                                })
                            });
                        }
                    })
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([-84.384706, 33.760262]),
                    zoom: 16,
                    minZoom: 2,
                    maxZoom: 19
                })
            });
            var map_reference = this.map;

            // Construct popup with stop content
            var element = document.getElementById('popup');
            var popup = new ol.Overlay({
                element: element,
                positioning: 'bottom-center',
                stopEvent: false
            });
            this.map.addOverlay(popup);

            // display popup on click
            this.map.on('click', function(evt) {
                var feature = map_reference.forEachFeatureAtPixel(evt.pixel,
                    function(feature, layer) {
                        return feature;
                    });
                if (feature) {
                    var geometry = feature.getGeometry();
                    var coord = geometry.getCoordinates();
                    popup.setPosition(coord);
                    $(element).popover({
                        'placement': 'top',
                        'html': true,
                        'title': feature.get('name'),
                        'content': '<p><strong>Donation:</strong>&nbsp;&dollar;' +
                        bss.getStop(feature.get('id')).donationsRaisedInDollars + '</p><p><button data-action="load" data-source="' + feature.get('id') +'" class="btn btn-sm btn-success">Donate Now</button></p>'
                    });
                    $(element).popover('show');
                } else {
                    $(element).popover('destroy');
                }
            });
            // change mouse cursor when over marker
            $(document).on("mouseleave",".popover", function(e) {
                $(element).popover('destroy');
                return;
            });
        }catch (e){
            throw new Error("Error occurred while generating the map. Please see error: " + e);
        }
    };

    /**
     * Draw bus stop by given BSS object
     * @param bss
     * @returns {Array}
     */
    this.drawStops = function(bss){
        var stopMarkers = [];
        try{
            $.each(bss.getAllStops(), function(k, stop){
                var stopMarker = new ol.Feature({
                    type: 'icon',
                    geometry: new ol.geom.Point(ol.proj.transform([stop.lng, stop.lat], 'EPSG:4326', 'EPSG:3857')),
                    id: stop.stopId,
                    name: stop.name,
                    donation: stop.donationsRaisedInDollars
                });
                stopMarkers.push(stopMarker);
            });
        }catch (e){
            console.error("Could not draw bus stops. Please see error: " + e);
        }finally{
            return stopMarkers;
        }
    };

    /**
     * Load a hidden panel to make user donate easily
     * @param busStop
     */
    this.loadDonationPanel = function(busStop){
        /**
         *
         */
        var source = $('#tpl_donation').html();
        var tpl = Handlebars.compile(source);
        var html = tpl(busStop);

        $("#donate-box").html(html).show().find('input[type="text"]').focus();
    };

    this.updateProgress = function(bss){
        /**
         *
         */
        var total = bss.getTotal();
        var percent = (total * 100) / 7000;
        $('[role="progressbar"]').attr("aria-valuenow", total).css({"width": percent + "%"}).html("$" + total);
    }
};
