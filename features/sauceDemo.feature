Feature: SauceDemo Application

@validLogin
@logininventory
Scenario: Verify Login and Product Inventory Details
    Given I am on the Login Page
    When I Login into to the site
    When I login successfully take me to inventory Page
    When I am on inventory page get total number of products
    Then I check if each inventory item has a name, price, description, Add-to-cart button

@validLogin
@addthreeprods
Scenario: Verify Adding Multiple Products to Cart
    Given I am on the site
    When I get on inventory page extract all the names
    And I add first three products to cart
    And I check remove buttons for three Items
    And I verify the cart bagde displays three
    Then I reload the page to see if the data is retained

@validLogin
@cartRemoveFunc
Scenario: Verify Cart Details and Remove Product Functionality
    Given I am on the sauce site
    When I am on the inventory page add first three products
    And I get the added products name and price
    And I go to cart page
    And I get the cart product name, price
    And I remove a product from the cart
    Then I verify the cart count decreases
    And I check the removed is no longer displayed 


@multipleInvalidLogin
Scenario: Verify Invalid Login Scenarios
    Given I am login page
    When I am on the page I try multiple invlaid credentials , get the error message
    Then I chek if the error message can be closed

@validLogin
@productSorting
Scenario: Verify Product Sorting Functionality
    Given I am on SauceDemo
    When I am the inventory page I get all the names, prices of the products
    Then I Verify the A-Z Sorting
    And I verify the Z-A Sorting
    And I verify the Low to high price Sorting
    And I verify the High to Low Price Sorting

@validLogin
@checkoutFlow
Scenario: Verify Complete Checkout Flow and Price Calculation
    Given I Login on SauceDemo
    And I add two items to cart
    And I goto checkout Page
    When I am on checkoutpage click continue without filling Details and verify error message
    And I fill the details and proceed to overview
    And I Calculate the price of selected items to comapare with the total
    And I verify tax , total amount
    Then I Complete the purchase to verify success info

@validLogin
@productPageNav
Scenario: Verify Product Details Page Navigation
    Given I login to the Application
    When I am on inventory page click on any product
    And I Validate product name, description, price
    And I navigate back to inventory page
    Then I Verify all products are displayed

@validLogin
@cartPersistance
Scenario: Verify Cart Persistence During Navigation
    Given I log into SauceDemo
    And I add two products
    When I am on cart page validate products
    And I Navigate between inventory, product page
    And I verify the cart Count remains unchanged
    Then I validate the selected products still show the remove button

@validLogin
@checkcancelflow
Scenario: Verify Checkout Cancellation Flow
    Given I am SauceDemo site
    And add products into cart
    When I start checkout process
    And I cancel from customer's info page
    And I verify the products in the cart
    And I checkout again but cancel it on the overview page
    Then I check if the cart data is retained

@validLogin
@FunctionalityVerify
Scenario: Verify Hamburger Menu, Reset App State, and Logout Functionality
    Given I login with valid credentials
    When I add two products into cart 
    And I verify cart Count
    And I click the Hamburger menu 
    And I extract all the menu items to stor into a list
    And I verify the extracted items 
    And I Verify the total number of menu items matches the expected count
    And I reset the app state
    And I check the cart badge is reset , add to cart is visibel for all
    When I hamburger menu again and click Logout 
    And I Verify the user is redirected to the login page
    And I try to access the inventory page directly
    Then I verify the previous session is not accessible