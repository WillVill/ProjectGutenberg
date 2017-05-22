Feature: User can get all books and mentioned cities in the books from given author.
	As a user of the application
	I want to see the books and cities mentioned in the books by a given author
	So that I can see what authors have writeen what books and mentioned what cities.

Background
	Given I have a list of authors

	Scenario: Author given, I should see the books he wrote and the cities plotted.
		Given I am a user of the web application
		When I select author "John"
		And I click "Get books and cities"
		Then I should see the books written by the author
		And I should see the cities mentioned in the books
		And I should see the cities plotted on a map
