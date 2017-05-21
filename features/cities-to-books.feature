Feature: User can see all cities mentioned in a book.
	As a user of the application
	I want to see the cities mentioned in a book
	So that I have a visual representation of the mentioned cities.

Background
	Given I have John Book 1
	And it mentions cities:
	"""
	Copenhagen
	Mallorca
	Dubai
	Delhi
	""" 
	Given I have John Book 2
	And it mentions cities:
	"""
	New York
	Paris
	Berlin
	London
	""" 

	Scenario: Book given, I should see a map with all cities mentioned in the book plotted on a map.
		Given the list of books
		When I select "John Book 1"
		And I click "Get mentioned cities"
		Then I should see the cities mentioned in the books
		And I should see the cities plotted on a map
