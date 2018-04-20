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

    var editFromInfo = false;

    // Show the Edit Scenario Dialog
    showEditScenarioDialog = function(id, fromInfo){
        editFromInfo = fromInfo;

        readScenario(id, function (scenario) {
            console.log('scenario id: ', id);
            registry.byId("editScenarioDialog").set("title", "Edit " + scenario.name);
            registry.byId("editedScenarioName").set("value", scenario.name);
            dom.byId("editedScenarioLastModifiedDt").innerHTML = scenario.last_modified_dt;
            on(dom.byId("saveEditedScenarioButton"),"click",dojo.partial(saveEditedScenario,id));

            registry.byId("editScenarioDialog").show();
        });

    };

    // Hide the New Scenario Dialog
    hideEditScenarioDialog = function () {
        registry.byId("editScenarioDialog").hide();
    };

    // Save scenario
    saveEditedScenario = function (id) {
        console.log('scenario id: ', id);
        readScenario(id, function (scenario) {
            scenario.name = registry.byId("editedScenarioName").get("value").trim();
            console.log(scenario);
            updateScenario(scenario, function () {
                updateScenariosList(function() {
                    registry.byId("editedScenarioName").set("value","");

                    if (editFromInfo) {
                        hideScenarioInfoDialog();
                        editFromInfo = false;
                    }
                    hideEditScenarioDialog();
                });
            });
        });
    };

    parser.parse();
});