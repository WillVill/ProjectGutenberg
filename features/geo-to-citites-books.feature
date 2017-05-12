Feature: User can get nearby cities and books mentioning them from a given Geolocation.
	As a user of the application
	I want to see the nearby cities and books mentioning the cities
	So that I can see what books mention the cities.

	Scenario: Geolocation given, books mentioning a city within the vicinity of 500 km are returned.
		Given I am the application user
		When I select a geolocation and click "get books mentioning nearby citites"
		Then I should see the books mentioning all of the cities.