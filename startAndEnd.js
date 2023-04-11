const directionsWidget = new Directions({
  view: view,
  routeServiceUrl: "<YOUR ROUTE SERVICE URL HERE>",
  searchProperties: {
    source: {
      layer: yourLayer, // The layer to search for the start stop
      outFields: ["room_number"] // The fields to include in the search results
    },
    placeholder: "Enter start location", // The placeholder text for the start stop search input
    suffix: " Chicago", // The suffix text to append to the search string when searching for the start stop
    minSuggestCharacters: 3, // The minimum number of characters to enter before displaying suggestions for the start stop
    maxSuggestions: 10, // The maximum number of suggestions to display for the start stop
    minDistance: 50, // The minimum distance in meters from the start stop to the closest suggested location
    resultFormat: "StreetAddress" // The format of the result for the start stop
  }
});

// Customize the search properties for the destination
const destinationSearch = new Search({
  view: view,
  sources: [{
    layer: yourLayer, // The layer to search for the end stop
    outFields: ["room_number"] // The fields to include in the search results
  }],
  placeholder: "Enter end location", // The placeholder text for the end stop search input
  suffix: " Chicago", // The suffix text to append to the search string when searching for the end stop
  minSuggestCharacters: 3, // The minimum number of characters to enter before displaying suggestions for the end stop
  maxSuggestions: 10, // The maximum number of suggestions to display for the end stop
  minDistance: 50, // The minimum distance in meters from the end stop to the closest suggested location
  resultFormat: "StreetAddress" // The format of the result for the end stop
});

// Set the destination search to the customized Search object
directionsWidget.setDestination(destinationSearch);
