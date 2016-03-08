Feature: Shout
  People using shouty are able to **shout** to other people who are close enough to hear them.

  Rules
  =====

  * hear shout only if within 1000m of the shouter
  * hear shout only if in range at the time of shout
  * only text can be shouted and must be at least 1 character and at most 256

  Personas
  ========

  * Lucy: a typical listener
  * Sean: a typical shouter

  UI decisions
  ============

  * when a shouter shouts, a success notification should be displayed to them

  Scenario: someone is in range
    Given Lucy is 800m away from Sean
    When Sean shouts "Hello World!"
    Then Lucy should receive "Hello World!"

  Scenario: someone is in range
    Given Lucy is 800m away from Sean
    When Sean shouts "Bonjour le monde!"
    Then Lucy should receive "Bonjour le monde!"

  Scenario: shouting too short message
    Given Lucy is 800m away from Sean
    When Sean shouts ""
    Then Lucy should not receive ""

  @wip
  Scenario: shouting too long message

  Scenario: nobody is in range
  Scenario: someone comes in range too late
