Feature: User can get nearby cities and books mentioning them from a given City.
	As a user of the application
	I want to see the nearby cities and books mentioning the cities
	So that I can see what books mention the cities.

Background
	Given I have a list of cities

	Scenario: City given, books mentioning a city within the vicinity of 10000 meters are returned.
		Given I am a user of the web application
		When I select geo-city Paris
		And I click cityToVicinityButton
		Then I should see a map with nearby cities
