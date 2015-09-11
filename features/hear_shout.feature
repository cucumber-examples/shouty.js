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

  Scenario: Tom does not hear Pete who is far away
    Given "Pete" is at "Piccadilly"
    And "Tom" is at "The Quays"
    And "Piccadilly" is more than 1 km away from "The Quays"
    When "Pete" shouts
    Then "Tom" should not hear anything

  Scenario: Joe proposes to Jane, but her app is closed

  Scenario: Pete is not signed in, but still hears shouts
