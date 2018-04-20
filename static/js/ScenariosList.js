define([
    'dojo/request'
], function (request) {

    var noop = function () {};

    createScenario = function(scenario, c) {

        var callback = c || noop;

        // Store in database
        request.post('/scenario', {
            data: JSON.stringify(scenario)
        }).then(
            function (res) {
                // console.log(res)
                callback();
            },
            function (err) {
                console.log("Create Error: ", err);
            }
        );
    };

    readScenarios =  function (c) {

        var callback = c || noop;

        // Retrieve from database
        request.get('/scenario').then(
            function(res){
                var data = JSON.parse(res);
                callback(data.scenarios);
            },
            function (err) {
                console.log("Read Error: ", err);
            }
        );
    };

    readScenario =  function (id, c) {

        var callback = c || noop;

        // Read from database
        request.get('/scenario/' + String(id)).then(
            function (res) {
                var data = JSON.parse(res);
                callback(data.scenario);
            },
            function (err) {
                console.log("Read Error scenario id " + String(id) + ": ", err);
            }
        );
    };

    updateScenario = function(scenario, c) {

        var callback = c || noop;
        console.log(scenario)
        // Edit database
        request.put('/scenario/' + String(scenario.id), {
            data: JSON.stringify(scenario)
        }).then(
            function (res) {
                // console.log(res);
                callback();
            },
            function (err) {
                console.log("Update Error scenario id " + String(scenario.id) + ": ", err);
            }
        );
    };

    deleteScenario = function(id, c) {

        var callback = c || noop;

        // Edit database
        request.del('/scenario/' + String(id)).then(
            function (res) {
                // console.log(res)
                callback();
            },
            function (err) {
                console.log("Delete Error scenario id " + String(id) + ": ", err);
            }
        );
    };

})