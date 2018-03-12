require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/TileLayer",
    "esri/widgets/LayerList",
    "esri/portal/PortalItem",
    "dojo/on",
    "dojo/mouse",
    "dojo/dom",
    "dojo/parser",
    "dijit/registry",
    "dojo/ready",
    "dijit/MenuBar",
    "dijit/MenuBarItem",
    "dijit/form/Button",
    "js/ScenariosDialog",
    "dojo/domReady!"
], function(Map, MapView, FeatureLayer, TileLayer, LayerList, PortalItem, on, mouse, dom,  parser, registry, ready, MenuBar, MenuBarItem, Button, ScenariosDialog){

    var DA_Layer = new FeatureLayer({
        id: "age-dissemination-0_4",
        title: "Age Dissemination",
        url: "https://services1.arcgis.com/9NvE8jKNWWlDGsUJ/arcgis/rest/services/Join%20Features%20to%20age_dissemination_test%20-%200_4/FeatureServer"
    });

    // var LHIN_Layer = new FeatureLayer({
    //     id: "toronto-lhins",
    //     url: "https://tiles.arcgis.com/tiles/9NvE8jKNWWlDGsUJ/arcgis/rest/services/age_dissemination/MapServer"
    // });


    var map = new Map({
        basemap: "topo",
        ground: "world-elevation",
        layers: [DA_Layer] // layers can be added as an array to the map's constructor
    });

    // Create the SceneView
    var view = new MapView({
        container: "map",
        map: map,
        zoom: 12,
        center: [-79.3832, 43.6532]
    });

    view.when(function() {
        var layerList = new LayerList({
            view: view
        });

        // Add widget to the top right corner of the view
        view.ui.add(layerList, "top-right");

    }, function(error){
        // Use the errback function to handle when the view doesn't load properly
        console.log("The view's resources failed to load: ", error);
    });

    parser.parse();
});

