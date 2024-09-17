const app = angular.module('formApp', []);

app.controller('FormController', ['$scope', '$http', function($scope, $http){
    $scope.formData={};
    $scope.error = '';
    $scope.submissionResult = {}
    $scope.formSubmitted = false;

    $scope.submitForm = function(){
        $scope.error = '';
        $scope.submissionResult = '';
        if (!$scope.formData.name || !$scope.formData.email || !$scope.formData.phone || !$scope.formData.course) {
            alert("Kérjük, töltse ki a mezőket!");
            return;
        }

        const formData = new FormData();
        formData.append('name', $scope.formData.name);
        formData.append('emial', $scope.formData.email);
        formData.append('phone', $scope.formData.phone);
        formData.append('course', $scope.formData.course.value);
        formData.append('photo', document.getElementById('photo').files[0]);
        console.log(formData);
        for(let i of formData.entries()){
            console.log(i[0] + ': ' + i[1]);
        }

        $http.post('form2.php'. formData, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .then(function(responsive){
            $scope.submissionResult = response.data;
            $scope.formSubmitted = true;
        }, function(error){
            $scope.error = "Hiba az adatok küldésekor" + error.status + " - " + error.statusText
        })
    }
}]);