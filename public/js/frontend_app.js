console.log('loaded frontend app');

var frontend_app = angular.module('employees', []);

frontend_app.controller('emp_data', do_data);

function do_data($scope, $http) {
    console.log('inside do_data');

    $scope.read = function () {
        console.log('reading all records');

        $http.get('/api/v4/read')
            .then(function (results) {
                console.log(results);
                $scope.employees = results.data;
            });
    }

    $scope.read();

    $scope.create = function () {
        console.log('creating new employee');

        var data = {
            name: $scope.input.name,
            gender: $scope.input.gender,
            email: $scope.input.email,
            avatar: $scope.input.avatar
        };

        $http.post('/api/v4/create', data)
            .then(function (result) {
                console.log(result);
                $scope.message = result.data.message;
                $scope.read();
            });
    }

    $scope.update = function (employee) {
        console.log('updating employee');
        console.log(employee);

        // var data = {
        //     _id: employee._id,
        //     name: employee.name,
        //     gender: employee.gender,
        //     email: employee.email,
        //     avatar: employee.avatar
        // };

        $http.put('/api/v4/update', employee)
            .then(function (result) {
                console.log(result);
                $scope.message = result.data.message;
                $scope.read();
            });
    }

    $scope.delete = function (employee) {
        console.log('deleting employee');
        console.log(employee);
        $http.delete('/api/v2/delete' + employee._id)
            .then(function (result) {
                console.log(result);
                $scope.message = result.data.message;
                $scope.read();
            });
    }

}