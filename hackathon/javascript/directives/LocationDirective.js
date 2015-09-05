var connectItDirectives = angular.module('connectItDirectives');

connectItDirectives.directive('location', [function () {
    return {
        template: '<div id="location-map"></div>',
        controller: function($scope){
            var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
            var location_data = _.map($scope.offices, function(office){
                var startDate = office.located_during.start;
                var endDate = office.located_during.end;

                return  {
                  svgPath: targetSVG,
                  zoomLevel: 5,
                  scale:  1,
                  title: office.office.name + (endDate != undefined? (" (" + moment(startDate).format('YYYY-MM') + " to " + moment(endDate).format('YYYY-MM') + ")"):" (current)"),
                  latitude: office.office.latitude,
                  longitude: office.office.longitude
               }
            });

            var map = AmCharts.makeChart( "location-map", {
                type: "map",
                "theme": "light",
                imagesSettings: {
                    rollOverColor: "#089282",
                    rollOverScale: 2,
                    selectedScale: 2,
                    selectedColor: "#089282",
                    color: "#13564e"
                },

                areasSettings: {
                    unlistedAreasColor: "#FFCC00"
                },

                dataProvider: {
                    map: "worldLow",
                    images: location_data
                },
                "export": {
                    "enabled": true
                }
            } );
        }
    }
}]);