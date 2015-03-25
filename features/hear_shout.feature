Feature: Hear Shout

  People want to hear other folks shouting at a limited distance. To keep things local.

  Rules:

  * Shouts are heard within 1000m.
  * Shouts are no longer than 180 characters.

  Personae:

  * Lucy the listener.
  * Sean the shouter.

  Scenario: Lucy hears Sean
    Given Lucy is 800m away from Sean
    When Sean shouts "Free espressos!"
    Then Lucy should hear "Free espressos!"
