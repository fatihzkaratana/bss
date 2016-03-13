/**
 * Created by fatih on 13/03/16.
 */
'use strict';

var BSS = function(){
    this.total = 0;

    // Initiate the class
    this.init = function(){
        return this;
    };

    // define stops, it may be retrieved from some data source
    this.stops = [
        { stopId: 1, lat: 33.760262, lng: -84.384706, donationsRaisedInDollars: 0, name: 'Hertz at Portman Blvd' },
        { stopId: 2, lat: 33.760138, lng: -84.388043, donationsRaisedInDollars: 0, name: 'Peachtree Center Mall' },
        { stopId: 3, lat: 33.757355, lng: -84.386423, donationsRaisedInDollars: 0, name: 'Georgia Pacific' },
        { stopId: 4, lat: 33.758648, lng: -84.382754, donationsRaisedInDollars: 0, name: 'Sheraton Atlanta' },
        { stopId: 5, lat: 33.755365, lng: -84.384921, donationsRaisedInDollars: 0, name: 'Loudermilk Center' },
        { stopId: 6, lat: 33.756887, lng: -84.389417, donationsRaisedInDollars: 0, name: 'Rialto Arts Center' },
        { stopId: 7, lat: 33.759215, lng: -84.391719, donationsRaisedInDollars: 0, name: 'Sky View Atlanta' },
        { stopId: 8, lat: 33.762046, lng: -84.391708, donationsRaisedInDollars: 0, name: 'Centennial Park' },
        { stopId: 9, lat: 33.763004, lng: -84.387041, donationsRaisedInDollars: 0, name: 'Suntrust Plaza' },
        { stopId: 0, lat: 33.754661, lng: -84.380101, donationsRaisedInDollars: 0, name: 'Sweet Auburn Market' }
    ];

    // Donate the stop by binding the event to the click object
    this.donate = function(sId, donation){
        // Get the stop by given stop id

        try{
            var stop = this.getStop(sId);
            stop.donationsRaisedInDollars += parseInt(donation);
            this.setTotal(this.getTotal() + parseInt(donation));
            this.submit(this);
        }catch (err){
            console.error("Error occurred while donating. Please see error: " + err.toString());
        }


    };

    /**
     * Find a stop object and return it to the caller
     * @param sId
     * @returns {T}
     */
    this.getStop = function(sId){
        if (isNaN(sId)) throw new Error("Stop id has not been provided");
        return this.stops.filter(function(stop){ if (stop.stopId == sId) return stop})[0];
    };

    /**
     * Return all stops as an array already defined in BSS
     * @returns {Array}
     */
    this.getAllStops = function(){
        return this.stops;
    };

    /**
     * Set BSS.total variable
     * @param total
     */
    this.setTotal = function(total){
        this.total = total;
    };

    /**
     * Get BSS.total variable
     * @returns {*}
     */
    this.getTotal = function(){
        return this.total;
    };

    this.submit = function(bss){
        $.getJSON('data/donate', function(data){
            // get some action here after a REST backend got ready
        });
    }
};