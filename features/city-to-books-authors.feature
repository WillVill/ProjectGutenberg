Feature: User can get corresponding books and authors from a given city.
	As a user of the application
	I want to see the books and cities corresponding to a city
	So that I can see what books mention the given city.

Background
	Given I have a list of cities


	Scenario: City given, I can get the books mentioning the cities and authors of the books.
		Given I am a user of the web application
		When I select city Paris
		And I click cityToBookAuthorButton
		Then I should see the books mentioning the city
		And I should see the authors of the books
