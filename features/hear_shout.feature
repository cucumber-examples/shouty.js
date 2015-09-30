Feature: Hear Shout
  People want to shout to other people around them.

  Rules:
    - shouts are heard <= 500 meters
    - shout length must be 1 to 143 characters only

    - don't bother when the network is down
    - requires known location
    - shouts are heard immediately, cannot be heard later, cannot be unheard
    - you always get the whole shout, even if you move when it's shouted
    - you hear yourself

  Personae:
    - Sean: a shouter
    - Lucy: a listener

  Scenario: Lucy can hear Sean
    Given Lucy is 500 meters away from Sean
    When Sean shouts "Hello World!"
    Then Lucy should hear "Hello World!"
    And Sean should hear "Hello World!"

  Scenario: Lucy cannot hear Sean
    Given Lucy is 501 meters away from Sean
    When Sean shouts "Hello World!"
    Then Lucy should not hear "Hello World!"
    But Sean should hear "Hello World!"

  Scenario: the one where the shout length is allowed
    Given Lucy is 500 meters away from Sean
    When Sean shouts "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    Then Lucy should hear "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    And Sean should hear "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

  Scenario: the one where the shout is too long
    Given Lucy is 500 meters away from Sean
    When Sean shouts "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"
    Then Lucy should not hear "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"
    And Sean should not hear "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"

  Scenario: the one where the shout is too short
    Given Lucy is 500 meters away from Sean
    When Sean shouts ""
    Then Lucy should not hear ""
    And Sean should not hear ""
