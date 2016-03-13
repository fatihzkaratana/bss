/**
 * Created by fatih on 13/03/16.
 */

'use strict';

$(function(){
    // Create a new instance of APP object
    var app = new APP();

    // Draw a map by calling app method
    app.drawMap($('[data-target="map"]').attr("id"));

    // Create Bus Stop Service instance
    var bss = new BSS();

    app.drawStops(bss);
});
