Feature: Hear Shout

  Rules
  =====
  - Listener must be within 1km from shouter
  - No notifications - app must be open
  - No registration needed to hear messages

  Questions
  =========
  - Can shouters pay for farther reach of shouts?
  - Do shouts expire

  Scenario: Tom hears Pete who is nearby
    Given "Pete" is at "Bridge House"
    And "Tom" is at "The Quays"
    And "Bridge House" is within 1 km of "The Quays"
    When "Pete" shouts
    Then "Tom" should hear "Pete"'s shout

  Scenario: Tom does not hear Pete who is far away
    Given "Pete" is at "Piccadilly"
    And "Tom" is at "The Quays"
    And "Piccadilly" is more than 1 km away from "The Quays"
    When "Pete" shouts
    Then "Tom" should not hear anything

  Scenario: Tom moves after hearing Pete and still hears Pete
    Given "Tom" has heard "Pete"'s shout
    When "Tom" moves next to "Pete"
    Then "Tom" should hear "Pete"'s shout

  Scenario: Tom is far away from Pete, but hears Pete's old message when he moves near him
