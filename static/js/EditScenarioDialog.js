define([
    "dojo/dom",
    "dojo/on",
    "dijit/registry",
    "dojo/parser",
    "dijit/Dialog",
    "dijit/form/TextBox",
    "js/ScenariosDialog",
    "js/ScenariosList",
    "dojo/domReady!"
], function(dom, on, registry, parser, Dialog, Button, TextBox, ScenariosDialog, ScenariosList) {

    parser.parse();
    var editFromInfo = false;
    saveEditHandler = null;

    // Show the New Scenario Dialog
    showEditScenarioDialog = function(id, fromInfo){
        editFromInfo = fromInfo;

        var scenario = readScenario(id);
        registry.byId("newScenarioDialog").set("title", "Edit " + scenario.name);
        registry.byId("scenarioName").set("value", scenario.name);
        saveEditHandler = on(dom.byId("saveScenarioButton"),"click",dojo.partial(saveEditedScenario,id));

        registry.byId("newScenarioDialog").show();
    };

    // Hide the New Scenario Dialog
    hideEditScenarioDialog = function () {
        registry.byId("newScenarioDialog").hide();
    };

    // Save scenario
    saveEditedScenario = function (id) {

        var scenario = readScenario(id);
        scenario.name = registry.byId("scenarioName").get("value").trim();
        updateScenario(scenario);
        updateScenariosList();

        registry.byId("scenarioName").set("value","");
        saveEditHandler.remove();

        if (editFromInfo) {
            hideScenarioInfoDialog();
            editFromInfo = false;
        }
        hideEditScenarioDialog();
    };
});