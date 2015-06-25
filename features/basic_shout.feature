Feature: Basic shout

  People on Shouty can shout to other people who are not
  too far away.

  Rules:

  * shouts are heard within 1km of the shouter
  * shouts must be less than 256 characters

  Personae:

  * Lucy, the listener
  * Sean, the shouter

  Scenario: the one where Lucy is in the zone
    Given Lucy is within range of Sean
    When Sean shouts
    Then Lucy should hear Sean's shout

  Scenario: the one where Lucy is out of the zone
    Given Lucy is out of range from Sean
    When Sean shouts
    Then Lucy should not hear Sean's shout

  Scenario: the one where Sean shouts a short shout
    Given Lucy can hear Sean
    When Sean shouts a short shout
    Then Lucy should hear Sean's shout

  Scenario: the one where Sean shouts a too-long shout
    Given Lucy can hear Sean
    When Sean shouts a too-long shout
    Then Lucy should not hear Sean's shout
