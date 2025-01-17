// Require the Dialog class
define([
    "dojo/dom",
    "dojo/dom-construct",
    "dijit/registry",
    "dojo/parser",
    "dijit/Dialog",
    "dijit/form/Button",
    "js/ScenariosList",
    "js/NewScenarioDialog",
    "js/ScenarioInfoDialog",
    "js/EditScenarioDialog",
    "dojo/domReady!"
], function(dom, domConstruct, registry, parser, Dialog, Button, ScenariosList, scenarioInfoDialog){

    parser.parse();

    var noop = function () {};

    // Show the Scenarios Dialog
    showScenariosDialog = function() {
        registry.byId("scenarioDialog").show();
        updateScenariosList();
    };
    // Hide the Scenarios Dialog
    hideScenariosDialog = function() {
        registry.byId("scenarioDialog").hide();
    };

    updateScenariosList = function (c) {
        var callback = c || noop;

        var scenariosList = dom.byId("scenariosList");
        domConstruct.empty(scenariosList);

        readScenarios(function (scenarios) {

            scenarios.forEach(function(scenario) {
                domConstruct.create("tr", {
                    innerHTML: "<td>" + scenario.name + "</td>" +
                    // info button
                    "<td><button onclick='showScenarioInfoDialog(" + String(scenario.id) + ")'>i</button></td>" +

                    // edit button
                    "<td><button data-dojo-type='dijit/form/Button' type='button'" +
                    "data-dojo-props=\"iconClass: 'dijitIcon dijitIconEdit'\"" +
                    "onclick='showEditScenarioDialog(" + String(scenario.id) + ")'></button></td>" +

                    // duplicate button
                    "<td><button data-dojo-type='dijit/form/Button' type='button' " +
                    "data-dojo-props=\"iconClass: 'dijitEditorIcon dijitEditorIconCopy'\"" +
                    "onclick='duplicateScenario(" + String(scenario.id) + ")'></button></td>" +

                    // run button
                    "<td><button onclick='runScenario(" + String(scenario.id) + ")'>r</button></td>" +

                    // delete button
                    "<td><button data-dojo-type='dijit/form/Button' type='button' " +
                    "data-dojo-props=\"iconClass: 'dijitIcon dijitIconDelete'\"" +
                    "onclick='removeScenario(" + String(scenario.id) + ")'></button></td>"
                }, scenariosList);
            });

            parser.parse();
            callback();
        });

    };

    duplicateScenario = function(id) {
        readScenario(id, function (s) {
            var scenario = Object.assign({}, s);
            createScenario(scenario, updateScenariosList);
        });
    };

    runScenario = function (id) {
        readScenario(id, function (scenario) {
            console.log(scenario);
        });
    };

    removeScenario = function (id) {
        deleteScenario(id, updateScenariosList);
    }
});