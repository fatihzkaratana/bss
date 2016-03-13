/**
 * Created by fatih on 13/03/16.
 */

'use strict';

$(function(){
    // Create a new instance of APP object
    var app = new APP();

    // Create Bus Stop Service instance
    var bss = new BSS();

    // Draw a map by calling app method
    app.drawMap($('[data-target="map"]').attr("id"), bss);

    $(document).on("click", '[data-action="donate"]', function(event){
        event.preventDefault();
        bss.donate($('input[name="stopId"]').val(), $('input[name="donation"]').val());
        app.updateProgress(bss);
    }).on("click", '[data-action="load"]', function(event){
        event.preventDefault();
        app.loadDonationPanel(bss.getStop($(this).attr("data-source")));
    });
});
