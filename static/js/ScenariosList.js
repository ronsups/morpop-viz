define([
    'dojo/request'
], function (request) {

    createScenario = function(scenario, callback) {

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

    readScenarios =  function (callback) {

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

    readScenario =  function (id, callback) {

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

    updateScenario = function(scenario, callback) {
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

    deleteScenario = function(id, callback) {
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