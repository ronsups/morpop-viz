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
    saveNewHandler = null;

    // Show the New Scenario Dialog
    showNewScenarioDialog = function(){
        saveNewHandler = on(dom.byId("saveScenarioButton"),"click",saveScenario);
        registry.byId("newScenarioDialog").show();
    };
    // Hide the New Scenario Dialog
    hideNewScenarioDialog = function () {
        registry.byId("newScenarioDialog").hide();
    };

    // Save scenario
    saveScenario = function () {
        if (registry.byId("scenarioName").get("value").trim() != "") {
            var scenario = {
                name: registry.byId("scenarioName").get("value").trim()
            };
            createScenario(scenario);
            updateScenariosList();

            registry.byId("scenarioName").set("value","");
            saveNewHandler.remove();
            hideNewScenarioDialog();
        }
    };

});