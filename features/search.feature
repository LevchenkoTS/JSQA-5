Feature: Booking tickets
    We are testing ticket booking

    Scenario: Should book ticket tomorrow
        Given user is on "client" page
        When choose the date today + 1 day
        When user selects time 2
        When user select seats row "5" and seat "5"
        Then user gets "QR_code"

    Scenario: Should book two tickets in 3 days"

        Given user is on "client" page
        When choose the date today + 4 day
        When user selects time 2
        When user select seats row "6" and seat "3"
        When user select seats row "6" and seat "4"
        Then user gets "QR_code"

    Scenario: Should be Inactive booking button
        Given user is on "client" page
        When choose the date today + 2 day
        When user selects time 2
        Then booking "button" is disabled