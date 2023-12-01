# SBA-308： JavaScript Fundamentals

## Description

brief description

## Usage

explain the usage

## Input

The `getLearnerData` function takes three parameters:

1. **course:** an object representing course information.

```javascript
const CourseInfo = {
  id: number,
  name: string,
}
```

2. **ag:** an object representing the information of an assignment group.

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

3. **submissions:** an array of LearnerSubmission objects.

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

## Function Details

functions

## Implementation Steps (my solution approach)

## Author

[Yuming Zou]
