// Create a new map object and add it to a web page
var map = new Map({
  basemap: "streets-navigation-vector",
  center: [-118.2437, 34.0522],
  zoom: 12,
  container: "map"
});

// Create a new view object
var view = new MapView({
  map: map,
  container: "map",
  zoom: 12,
  center: [-118.2437, 34.0522]
});

// Define a function to display a route between two points
function displayRoute(start, end) {
  // Create a new route task object
  var routeTask = new RouteTask({
    url: "https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World"
  });

  // Define the parameters for the route calculation
  var params = new RouteParameters({
    stops: new FeatureSet({
      features: [
        new Graphic({
          geometry: start,
          symbol: {
            type: "simple-marker",
            style: "square",
            color: "blue",
            size: "8px"
          }
        }),
        new Graphic({
          geometry: end,
          symbol: {
            type: "simple-marker",
            style: "square",
            color: "red",
            size: "8px"
          }
        })
      ]
    }),
    returnDirections: true,
    returnRoutes: true
  });

  // Calculate the route and display it on the map
  routeTask.solve(params).then(function(result) {
    var route = result.routes[0].geometry;
    var routeGraphic = new Graphic({
      geometry: route,
      symbol: {
        type: "simple-line",
        color: "green",
        width: "5px"
      }
    });
    view.graphics.add(routeGraphic);
  });
}

// Define an event listener for the map's click event
view.on("click", function(event) {
  if (view.graphics.length >= 2) {
    // If there are already two graphics on the map, remove them
    view.graphics.removeAll();
  }

  // Create a new graphic for the clicked point
  var pointGraphic = new Graphic({
    geometry: event.mapPoint,
    symbol: {
      type: "simple-marker",
      style: "square",
      color: "black",
      size: "8px"
    }
  });

  // Add the graphic to the map
  view.graphics.add(pointGraphic);

  if (view.graphics.length == 2) {
    // If there are now two graphics on the map, display a route between them
    var start = view.graphics.getItemAt(0).geometry;
    var end = view.graphics.getItemAt(1).geometry;
    displayRoute(start, end);
  }
});
