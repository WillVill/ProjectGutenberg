Feature: User can get nearby cities and books mentioning them from a given City.
	As a user of the application
	I want to see the nearby cities and books mentioning the cities
	So that I can see what books mention the cities.

Background
	Given I have city Copenhagen with geolocation 42323.43
	And I have city Aarhus with geolocation 42523.43
	And I have city Odense with geolocation 42523.43
	And I have book John book 3 that has mentioned Copenhagen
	And I have book John book 1 that has mentioned Odense
	And I have book Jane book 5 that has mentioned Aarhus

	Scenario: Geolocation given, books mentioning a city within the vicinity of 500 km are returned.
		When I select a city
		And I click "Get nearby cities"
		Then I should see a map with nearby cities
		And I should see list of the books that mentioned the cities
