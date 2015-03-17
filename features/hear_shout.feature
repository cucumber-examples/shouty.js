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
    When Sean shouts "Free Guinness!"
    Then Lucy should hear "Free Guinness!"

  Scenario: The one where Lucy is in the zone
    Given Lucy is 800ft away from Sean
    When Sean shouts "Free Bagels!"
    Then Lucy should hear "Free Bagels!"
