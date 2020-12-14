let purchaseApp = angular.module("myApp", []);
    purchaseApp.controller("myController", function ($scope, $http) {
    $scope.list = [];
    $scope.lastId = 1; 
    $scope.sum = 0;
    $scope.edit = false; 
    $scope.currentIndex = -1;

    $scope.totalAverage = function() {
        let value = 0;
        for(let key of $scope.list) {
            value += key.average; 
        }
        let sum = value / $scope.list.length
        $scope.sum = Math.round(sum * 100) / 100;
    }

    $scope.addItem = function(name, surname, age, average) {
        $scope.list.push({
            name,
            surname,
            age: Number(age),
            average: Number(average),
            id: ++$scope.lastId
        })
        
        $scope.name = '';
        $scope.surname = '';
        $scope.age = 0;
        $scope.average = 0;
        
        $scope.totalAverage();
    }

    $scope.getData = function() {
        $http.get('https://run.mocky.io/v3/885684f7-653d-41dd-a55b-ed03eb27ebb1')
        .then(value =>{
            for(let key of  value.data) {
                key.id = $scope.lastId;
                $scope.list.push(key);
                $scope.lastId++;
            }
            
        $scope.totalAverage();
        })
        .catch(err => {
            console.log(err);
            Promise.reject(err);
        })    
    }
    $scope.getData();

    $scope.editItem = function(index) {
        $scope.edit = true;
        $scope.name = $scope.list[index].name;
        $scope.surname = $scope.list[index].surname;
        $scope.age = $scope.list[index].age;
        $scope.average = $scope.list[index].average;
        
        $scope.currentIndex = index;
    }

    
    $scope.stopEdit = function(name, surname, age, average) {
        let item = {
            name,
            surname,
            age: Number(age),
            average: Number(average)
        };
        $scope.list[$scope.currentIndex] = item;

        
        $scope.name = '';
        $scope.surname = '';
        $scope.age = 0;
        $scope.average = 0;

        $scope.edit = false;
    }

    $scope.delItem = function(index) {
        $scope.list.splice(index, 1);
        $scope.totalAverage();
    }

});