Feature: Get something
	As a user of the application
	I want to get something from the database
	So that I can see the result

	Scenario: Fetching data
		Given I am the application user
		When I click "get something"
		Then I should see "something"
