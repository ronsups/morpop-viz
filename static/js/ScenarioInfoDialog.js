define([
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/on",
    "dijit/registry",
    "dojo/parser",
    "dijit/Dialog",
    "dijit/form/TextBox",
    "js/ScenariosDialog",
    "js/ScenariosList",
    "dojo/domReady!"
], function(dom, domConstruct, on, registry, parser, Dialog, Button, TextBox, ScenariosDialog, ScenariosList) {

    parser.parse();
    editInfoHandler = null;

    // Show the New Scenario Dialog
    showScenarioInfoDialog = function(id){
        readScenario(id, function (scenario) {
            registry.byId("scenarioInfoDialog").set("title", scenario.name);
            dom.byId("scenarioNameInfo").innerHTML = scenario.name;

            editInfoHandler = on(dom.byId("editScenarioFromInfo"),"click", dojo.partial(showEditScenarioDialog,id,true));
            registry.byId("scenarioInfoDialog").show();
        });

    };
    // Hide the New Scenario Dialog
    hideScenarioInfoDialog = function () {
        registry.byId("scenarioInfoDialog").hide();
    };

});