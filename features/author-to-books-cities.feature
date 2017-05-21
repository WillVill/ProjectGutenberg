Feature: User can get all books and mentioned cities in the books from given author.
	As a user of the application
	I want to see the books and cities mentioned in the books by a given author
	So that I can see what authors have writeen what books and mentioned what cities.

Background
	Given I have author John
	And it is the author of:
	"""
	John Book 1
	John Book 2
	John Book 3
	John Book 4
	""" 
	And I have author Jane
	And it is the author of:
	"""
	Jane Book 1
	Jane Book 2
	Jane Book 3
	Jane Book 4
	"""
	And I have author Kurwa
	And it is the author of:
	"""
	Kurwa Book 1
	Kurwa Book 2
	Kurwa Book 3
	Kurwa Book 4
	""" 


	Scenario: Author given, I should see the books he wrote and the cities plotted.
		Given the list of authors
		When I select "John"
		And I click "Get books and cities"
		Then I should see the books written by the author
		And I should see the cities mentioned in the books
		And I should see the cities plotted on a map
