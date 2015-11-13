console.log("start");

var weatherData = {};
var temp_min = [];
var temp_now = [];
var temp_max = [];
var k2cOffset = 273.15; // Kelvin vs. Celcius shift

function k2f(x) {
  return (x - k2cOffset) * 1.8 + 32;
}

var barData = {
  labels : ["0","1","2","3","4","5","6"],
  datasets : [
    { fillColor :      "rgba(220,220,220,0.5)",
      strokeColor :    "rgba(220,220,220,0.8)",
      highlightFill:   "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data : "Hi Jake!"
    },
    { fillColor : "rgba(151,187,205,0.5)",
      strokeColor : "rgba(151,187,205,0.8)",
      highlightFill : "rgba(151,187,205,0.75)",
      highlightStroke : "rgba(151,187,205,1)",
      data : [2, -2.5, -0.33]
    }
  ]
}


function processResp(rObj) {
  list = rObj.list;
    
  for (ii=0; ii < list.length; ii++) {
    main = list[ii].main;
    temp_min[ii] = k2f(main.temp_min);
    temp_max[ii] = k2f(main.temp_max);
    temp_now[ii] = Math.round(k2f(main.temp_now));
  }

  console.log("temp_min=" + temp_min);
  console.log("temp_max=" + temp_max);
}

$.ajax(
   { url: "http://api.openweathermap.org/data/2.5/forecast?q=Porland,OR&mode=json&appid=2de143494c0b295cca9337e1e96b00e0",
     beforeSend: function(xhr) {
     //xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }
   })
   // End of ajax(), but here we do some chaining:
   .done( function(respObj) { // Success
      console.log("respObj = ", respObj);
      processResp(respObj);

      barData.datasets[0].data = temp_min.slice(0,7);
      barData.datasets[1].data = temp_max.slice(0,7);
      window.myBar = new Chart(ctx).Bar(barData, {responsive:true});
      console.log("Done");
   })
    .fail ( function() { // Failed
    console.log("XHR failed.");
   } );

window.onload = function() {
  ctx = $("canvas")[0].getContext("2d");
}