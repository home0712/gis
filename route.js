// Load the ArcGIS API for JavaScript modules
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/tasks/RouteTask",
  "esri/tasks/support/RouteParameters",
  "esri/tasks/support/FeatureSet",
  "esri/Graphic",
  "dojo/domReady!"
], function(
  Map,
  MapView,
  FeatureLayer,
  RouteTask,
  RouteParameters,
  FeatureSet,
  Graphic
) {
  // Create a new map object and add it to a web page
  var map = new Map({
    basemap: "streets-navigation-vector"
  });

  // Create a new view object
  var view = new MapView({
    map: map,
    container: "map",
    zoom: 12,
    center: [-118.2437, 34.0522]
  });

  // Add your web map as a layer to the map
  var webMapId = "your-web-map-id";
  var webMapLayer = new FeatureLayer({
    url: "https://services.arcgis.com/your-organization-id/arcgis/rest/services/your-web-map-layer-name/FeatureServer",
    id: webMapId,
    visible: false
  });
  map.add(webMapLayer);

  // Create a new route task object using your own route layer
  var routeTask = new RouteTask({
    url: "https://services.arcgis.com/your-organization-id/arcgis/rest/services/your-route-layer-name/Route/NAServer/Route_World"
  });

  // Define a function to display a route between two points
  function displayRoute(start, end) {
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
      // If there are now two graphics on the map,
