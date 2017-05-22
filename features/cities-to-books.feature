Feature: User can see all cities mentioned in a book.
	As a user of the application
	I want to see the cities mentioned in a book
	So that I have a visual representation of the mentioned cities.

Background
	Given I have a list of books

	Scenario: Book given, I should see a map with all cities mentioned in the book plotted on a map.
		Given I am a user of the web application
		When I select book "John Book 1"
		And I click "Get mentioned cities"
		Then I should see the cities mentioned in the books
		And I should see the cities plotted on a map
