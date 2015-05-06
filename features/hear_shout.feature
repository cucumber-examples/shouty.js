Feature: Hear Shout

  Rules:
  - Within 1 km
  - Displayed in chronological order

  Questions:
  - Do users need to be registered?

  Scenario: Alice is 3.6 km away from Bob
    Given "Alice" is in "Mobilvägen 1"
    And "Bob" is in "Lund Centralstation"
    When Bob shouts "hello"
    Then Alice should not hear anything
