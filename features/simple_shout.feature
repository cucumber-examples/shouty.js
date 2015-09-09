Feature: Simple Shout

  Rules:
  - Messages are only received within a radius of 1000m
  - Messages must be between 1 and 140 characters UTF-8

  Questions:
  - Do we call it a message or a shout?
  - Will I receive my neighbour's shout from this morning when I come home?
  - Do we need to worry about profanity?
  - What does the UI look like?

  Persona:
  - Joanne is a listener
  - Fred is a shouter

  Scenario: Joanne is too far away to hear Fred
    Given Joanne is 2 km away from Fred
    When Fred shouts
    Then Joanne does not hear anything

  Scenario: Joanne is close enough to hear Fred
    Given Joanne is 1 km away from Fred
    When Fred shouts
    Then Joanne hears Fred's shout
