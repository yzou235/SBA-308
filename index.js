
// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
        },
        {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
        },
        {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
        submitted_at: "2023-01-25",
        score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
        submitted_at: "2023-02-12",
        score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
        submitted_at: "2023-01-25",
        score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
        submitted_at: "2023-01-24",
        score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
        submitted_at: "2023-03-07",
        score: 140
        }
    }
];

//////////////////////////////////////////////////////////

////// My Answer Starts //////

// Create a function to flatten the objects in LearnerSubmissions array

function flattenSubmissions(submissions) {
    
    return submissions.map(

        ({learner_id, assignment_id, submission}) => ({

            learner_id,
            assignment_id,
            submitted_at: submission.submitted_at,
            score: submission.score

        })

    );

}

// Create a function to return an array of assignment objects that are already due and also rename "id" to "assignment_id"

function getAssignmentsDue(ag) {

    const currentDate = new Date();

    return ag.assignments.filter(assignment => {
        const dueDate = new Date(assignment.due_at);
        return dueDate < currentDate
    });

}

console.log(getAssignmentsDue(AssignmentGroup))

// Create a function to deduct 10% of the total possible points from their score for late submission.

function adjustLateSubmissions(agdue, submissions) {
    const adjustedSubmissions = submissions.map(
        
        submission => {

            const assignment = agdue.find(assignment => assignment.id === submission.assignment_id);

            // console.log(assignment);
    
            if (assignment && submission.submitted_at > assignment.due_at) {

                const latePenalty = Math.floor(assignment.points_possible * 0.1);

                const adjustedScore = Math.max(0, submission.score - latePenalty);
    
                return {
                    ...submission,
                    score: adjustedScore
                };
            }
    
            return submission;
        });
    
    return adjustedSubmissions;
  }

let assignmentDue = getAssignmentsDue(AssignmentGroup);
let flattenLearnerSubmissions = flattenSubmissions(LearnerSubmissions);
let adjustedLearnerSubmissions = adjustLateSubmissions(assignmentDue, flattenLearnerSubmissions);
console.log(adjustedLearnerSubmissions);

// Create a function to filter out submissions in `LearnerSubmissions` where the assignment is not due yet.

function filterLearnerSubmissions(agdue, submissions) {

    const assignmentIds = agdue.map(assignment => assignment.id);
    
    return submissions.filter(submission => assignmentIds.includes(submission.assignment_id));
}

let filteredLearnerSubmissions = filterLearnerSubmissions(assignmentDue, adjustedLearnerSubmissions);
console.log(filteredLearnerSubmissions);

// Create a function to calculate the total possible points

function calcTotalPossiblePoints(agdue) {
    
    return agdue.reduce((accumulator, assignment) => {
        return accumulator + assignment.points_possible
    }, 0);

}

let totalPossiblePoints = calcTotalPossiblePoints(assignmentDue);
console.log(totalPossiblePoints);

console.log("assignmentDue:")
console.log(assignmentDue);
console.log("filteredLearnerSubmissions")
console.log(filteredLearnerSubmissions);

// Create a function to calculate the average score for each learner.

function calcAverageScores(submissions, totalPossiblePoints) {

    // First create an object like this: {'learner_id': score}

    const totalScores = {};

    submissions.forEach(submission => {

        const learner_id = submission.learner_id;
        const score = submission.score;

        if(!totalScores[learner_id]) {
            totalScores[learner_id] = score;
        } else {
            totalScores[learner_id] += score;
        }

    });

    // console.log(totalScores);

    // Then convert this object to an array of objects
    // actually... I got the answer from google but don't understand why use Object.keys here... Need to revisit it later.

    const result = Object.keys(totalScores).map(learner_id => ({
        learner_id: learner_id,
        avg_score_: totalScores[learner_id] / totalPossiblePoints
    }));

    return result;

}

let LearnerAvg = calcAverageScores(filteredLearnerSubmissions, totalPossiblePoints);
console.log(LearnerAvg);

// Create a function that joins the possible points to each submission in the `LearnerSubmission`

function joinPointsPossibleToSubmissions(submissions, agdue) {
    return submissions.map(submission => {

        const matchingAssignment = agdue.find(assignment => assignment.id === submission.assignment_id);

        if(!matchingAssignment) {
            submission.points_possible = 0;
        } else {
            submission.points_possible = matchingAssignment.points_possible
        }

        return submission;

    });
}

let joinedLearnerSubmissions = joinPointsPossibleToSubmissions(filteredLearnerSubmissions, assignmentDue);
console.log("After Join:")
console.log(joinedLearnerSubmissions);

// Create a function to calculate the percentage score of each assignment for each submission

function calcPctScore(submissions) {
    
    return submissions.map(submission => {
        const percentage = submission.score / submission.points_possible;
        const pct_score = Number(percentage.toFixed(3));
        return {...submission, pct_score};
    });
}

let wtPctScoreLearnerSubmissions = calcPctScore(joinedLearnerSubmissions);
console.log(wtPctScoreLearnerSubmissions);

// Create a function to group submissions by learner. For each assignment, the property would be `assignment_id: pct_score`.

function groupPctScores(submissions) {
    
    const result = {};

    submissions.forEach((submission) => {

        const {learner_id, assignment_id, pct_score} = submission; // destructure the properties for later use.

        if (!result[learner_id]) {
            result[learner_id] = {learner_id};
        }

        result[learner_id][assignment_id] = pct_score;
    });

    return Object.values(result);

}

let LearnerPct = groupPctScores(wtPctScoreLearnerSubmissions);
console.log("with pct scores:");
console.log(LearnerPct);

// Now we have LearnerAvg and LearnerPct.
// Create a function to join LeanerAvg and LearnerPct together to get the final result





function getLearnerData(course, ag, submissions) {
    
    const result = [];
    
    // try/catch for course id mismatch
    try {
        if (course.id === ag.course_id) {
            
            const assignmentsDue = getAssignmentsDue(ag); // only keep the assignments that are due

            // try/catch for assignment possible point being 0

            try {
                assignmentsDue.forEach(assignment => {
                    if (assignment.points_possible === 0) {
                        throw new Error (`Error: points_possible cannot be zero for assignment ${assignment.id}.`);
                    } else {

                        // Make all the necessary adjustments
                        
                        const flattenLearnerSubmissions = flattenSubmissions(submissions);

                        const filteredLearnerSubmissions = filterLearnerSubmissions(assignmentsDue, flattenLearnerSubmissions) // filter out submissions where the assignment is not due yet

                        const adjustedLearnerSubmissions = adjustLateSubmissions(filteredLearnerSubmissions); // adjust the score of late submission

                        // Calculate the total possible points

                        const totalPossiblePoints = calcTotalPossiblePoints(assignmentsDue);

                        // Get an array of learners' average score

                        const LearnerAvg = calcAverageScores(adjustedLearnerSubmissions, totalPossiblePoints);


                    }
                });
            } catch (error) {
                console.log(error.message);
            }

        } else {
            throw "Error: Course ID Mismatch in AssignmentGroup. The provided assignment group doesn't belong to the provided course.";
        }
    } catch (error) {
        return error;
    }
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(result);





// function getLearnerData(course, ag, submissions) {
//     // here, we would process this data to achieve the desired result.
//     const result = [
//         {
//         id: 125,
//         avg: 0.985, // (47 + 150) / (50 + 150)
//         1: 0.94, // 47 / 50
//         2: 1.0 // 150 / 150
//         },
//         {
//         id: 132,
//         avg: 0.82, // (39 + 125) / (50 + 150)
//         1: 0.78, // 39 / 50
//         2: 0.833 // late: (140 - 15) / 150
//         }
//     ];

//     return result;
// }


//////////////////////////////////////////////////////////
// const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

// console.log(result);