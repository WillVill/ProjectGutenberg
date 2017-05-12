Feature: User can get all books and mentioned cities in the books from given author.
	As a user of the application
	I want to see the books and cities mentioned in the books by a given author
	So that I can see what authors have writeen what books and mentioned what cities.

	Scenario: Author given, city and books returned.
		Given I am the application user
		When I select an author and click "Get books and cities"
		Then I should see the books written by author and the mentioned cities on a map.