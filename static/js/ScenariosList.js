define([
    'dojo/request'
], function (request) {
    var scenarios = [];


    createScenario = function(scenario) {
        scenario.id = scenarios.length > 0 ? scenarios[scenarios.length-1].id + 1 : 1;
        scenarios.push(scenario);

        // Store in database
        request.post('/scenario', {
            data: JSON.stringify(scenario)
        }).then(
            function (res) {
                console.log(res)
            },
            function (err) {
                console.log(err)
            }
        );
    };

    readScenarios =  function () {
        // Retrieve from database
        request.get('/scenario').then(
            function(res){
                console.log(res);
            },
            function (err) {
                console.log(err);
            }
        );

        return scenarios;
    };

    readScenario =  function (id) {
        // Read from database
        request.get('/scenario/' + String(id)).then(
            function (res) {
                console.log(res)
            },
            function (err) {
                console.log(err)
            }
        );

        return scenarios.filter(function(s) {return s.id == id})[0];
    };

    updateScenario = function(scenario) {
        // Edit database
        request.put('/scenario/' + String(scenario.id), {
            data: JSON.stringify(scenario)
        }).then(
            function (res) {
                console.log(res)
            },
            function (err) {
                console.log(err)
            }
        );

        scenarios[scenarios.findIndex(function(s){s.id == scenario.id})] = {
            id: scenario.id,
            name: scenario.name
        }
    };

    deleteScenario = function(id) {
        // Edit database
        request.del('/scenario/' + String(id)).then(
            function (res) {
                console.log(res)
            },
            function (err) {
                console.log(err)
            }
        );

        scenarios = scenarios.filter(function(s) {return s.id != id});
    };

})