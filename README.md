# SBA-308： JavaScript Fundamentals

## Description

_This is a skilled-based assessment project for the Per Scholas Software Engineering Bootcamp._

This JavaScript project built a function `getLearnerData(course, ag, submissions)` that processes structured data related to course, assignments, and learner submissions. It showcases JavaScript control flow, data collection and organization, and error handling. The output is an array of objects containing the assignment score details for each learner.

## Input

The `getLearnerData` function takes three parameters:

1. **course(`CourseInfo`):** an object representing course information.

```javascript
const CourseInfo = {
  id: number,
  name: string,
}
```

2. **ag(`AssignmentGroup`):** an object representing the information of an assignment group.

```javascript
const AssignmentGroup = {
    id: number,
    name: string,
    course_id: number,
    group_weight: number,
    // assignment is an array of AssignmentInfo objects
    assignment: [
        {
            id: number,
            name: string,
            due_at: date string,
            points_possible: number
        },
        // ... other assignments
    ]
};
```

3. **submissions(`LearnerSubmissions`):** an array of LearnerSubmission objects.

```javascript
const LearnerSubmissions = [
    {
        learner_id: number,
        assignment_id: number,
        // submission is an object showing the submission details
        submission: {
            submitted_at: date string
            score: number
        }
    }
    // ... other submissions
]
```

## Output

The `getLearnerData` function returns an array of objects and each object has the following information:

```javascript
{
    id: number, // the id of the learner
    avg: number, // the learner's total weighted average
    assignment_id: number // the percentage that the learner scored on this assignment (submission.score / points_possible)
    // ... the `assignment_id: number` of other assignments
}
```

Example:

```javascript
;[
  { 1: 0.94, 2: 1, learner_id: 125, avg_score_: 0.985 },
  { 1: 0.78, 2: 0.833, learner_id: 132, avg_score_: 0.82 },
]
```

## Error Handling

- If an `AssignmentGroup` doesn't belong to the course provided (mismatching course id), the function throws an error message.
- If any assignment has a `points_possible` equals to zero, the function throws an error message.

## Function Steps

1. Filters out assignments that haven't reached their due date yet.

2. Flattens learners submissions to simplify processing.

3. Filters out submissions of assignments that are not due yet.

4. Applies a late penalty to late submissions and gets the adjusted submissions (an array of objects).

5. Calculates the total possible points for all assignments that are already due.

6. Calculate the average scores of learners based on the adjusted submissions and stores them along with the corresponding learner id as `LearnerAvg` (an array of objects).

7. Calculates the percentage scores of each submission based on the adjusted submissions and assignment id; stores them along with the corresponding learner's id as `LearnerPct` (an array of objects).

8. Joins `LearnerAvg` and `LearnerPct` into the final result and returns the final result.

## Author

[Yuming Zou]
