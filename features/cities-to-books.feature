Feature: User can see all cities mentioned in a book.
	As a user of the application
	I want to see the cities mentioned in a book
	So that I have a visual representation of the mentioned cities.

	Scenario: Book given, cities returned
		Given I am the application user
		When I select a book and click "Plot cities"
		Then I should see a world map with all mentioed cities plotted on it.