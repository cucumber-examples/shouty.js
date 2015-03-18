Feature: Hear Shout

  Shouts are heard by people who are within 1000 feet of the shouter.

  Rules:

  * Shouts are heard only within a 1000ft
  * Shouts are less than 140 characters long

  Personae:

  * Lucy, listens to shouts
  * Sean, a shouter

  Scenario: The one where Lucy is in the zone
    Given Lucy is 800ft away from Sean
    When Sean shouts a message
    Then Lucy should hear that message

  Scenario: The one where lucy is NOT in the zone
    Given Lucy is 1001ft away from Sean
    When Sean shouts a message
    Then Lucy should not hear that message

  Scenario: The one where I type a short message
    Given Lucy is 800ft away from Sean
    When Sean shouts a 130-character message
    Then Lucy should hear that message

  Scenario: The one where I type a long message
    Given Lucy is 800ft away from Sean
    When Sean shouts a 140-character message
    Then Lucy should not hear that message
