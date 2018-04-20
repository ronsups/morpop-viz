define([
    "dojo/dom",
    "dojo/on",
    "dijit/registry",
    "dojo/parser",
    "dijit/Dialog",
    "dijit/form/TextBox",
    "js/ScenariosList",
    "dojo/domReady!"
], function(dom, on, registry, parser, Dialog, Button, TextBox, ScenariosList) {

    parser.parse();

    // Show the New Scenario Dialog
    showNewScenarioDialog = function () {
        registry.byId("newScenarioDialog").show();
    };

    // Hide the New Scenario Dialog
    hideNewScenarioDialog = function () {
        registry.byId("newScenarioDialog").hide();
    };

    // Save scenario
    saveNewScenario = function () {
        if (registry.byId("newScenarioName").get("value").trim() != "") {
            var scenario = {
                name: registry.byId("newScenarioName").get("value").trim()
            };
            createScenario(scenario, function () {
                updateScenariosList(function () {
                    registry.byId("newScenarioName").set("value","");
                    hideNewScenarioDialog();
                });
            });
        }
    };

});