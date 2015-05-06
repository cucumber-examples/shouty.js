Feature: Hear Shout

  Rules:
  - Within 1 km
  - Displayed in chronological order

  Questions:
  - Do users need to be registered?
  - Should we receive own messages?

  Scenario: Alice is 3.6 km away from Bob
    Given "Alice" is at "Mobilvägen 1"
    And "Bob" is at "Lund Centralstation"
    When "Bob" shouts "hello"
    Then "Alice" should not hear anything

  Scenario: Carl is 0.8 km away from Silvia
    Given "Carl" is at "Mobilvägen 1"
    And "Silvia" is at "Mobilvägen 3"
    When "Silvia" shouts "Where are you älskling"
    Then "Carl" should hear "Where are you älskling"

  Scenario: Jonas shouts before his location is known
