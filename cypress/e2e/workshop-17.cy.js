/**
 * Workshop #17
 *
 * Task #1
 * Topic: Array.length + Array.push()
 * 1. Create new spec file, which would validate how many options for priorities Jira issue have
 * 2. Access the field of priorities
 * 3. Invoke values from the field and save them into an Array
 * 4. Assert invoked array to be the same length as we expect it to be
 * 5. Invoked array will have initially 4 elements in it, push fifth element from initially selected priority value
 *
 * Expected result:
 * You have a test that validates values in issue priorities
 * Finished array must have 5 elements: [“Lowest“, “Low“, “Medium”, “High“, “Highest”]

 * Task #2
 * Topic: Regex
 * 1. Create new spec file with opening or creating new issue
 * 2. Open the created issue and invoke assignee name
 * 3. Assert that it has only characters in it (no numbers, no special characters etc).
 * Regex to be used: /^[A-Za-z]*$/
 *
 * Expected result:
 * 1. You will have a test that validates assignee matching defined characters
 *

 * Task #3
 * Topic: String.trim()
 * 1. Create new spec file with creating new issue
 * 2. Define issue title as a variable and add multiple spaces between words
 *      Example: const title = 'Hello             world';
 * 3. Create issue with this title, save the issue and observe it on the board (issue on the board will not have extra spaces and be trimmed)
 * 4. Invoke issue title from the board and assert it with variable defined, but remove extra spaces from it
 *
 * Expected result:
 * 1. You will have a test that validates, that issue title on the board does not have extra spaces in it
 */