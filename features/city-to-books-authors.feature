Feature: User can get corresponding books and authors from a given city.
	As a user of the application
	I want to see the books and cities corresponding to a city
	So that I can see what books mention the given city.

Background
	Given I have city Paris
	And it is mentioned in books:
	"""
	John book 1
	Jane book 3
	Kurwa book 5
	"""
	And John is the author of John book 1
	And Jane is the author of Jane book 3
	And Kurwa is the author of Kurwa book 5

	Given I have city Dubai
	And it is mentioned in books:
	"""
	John book 4
	Jane book 2
	Kurwa book 3
	"""
	And John is the author of John book 4
	And Jane is the author of Jane book 2
	And Kurwa is the author of Kurwa book 3


	Scenario: City given, I can get the books mentioning the cities and authors of the books.
		Given the list of city
		When I select "Paris"
		And I click "Get mentioned cities"
		Then I should see the books mentioning the city
		And I should see the authors of the books
