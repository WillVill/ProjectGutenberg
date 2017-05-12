Feature: User can get corresponding books and authors from a given city.
	As a user of the application
	I want to see the books and cities corresponding to a city
	So that I can see what books mention the given city.

	Scenario: City given, books and author returned
		Given I am the application user
		When I select a city and click "Get books and authors"
		Then I should see the corresponding books and authors.