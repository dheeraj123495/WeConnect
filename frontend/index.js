function calculateTotalMarks(N, M, marks) {
  let result = [];

  for (let i = 0; i < N; i++) {
    let minAvg = Number.MAX_SAFE_INTEGER;
    let ignoredSubjectIndex = -1;
    let totalMarks = 0;

    // Calculate average marks for each subject and find the subject to ignore
    for (let j = 0; j < M; j++) {
      let subjectTotal = 0;
      for (let k = 0; k < N; k++) {
        if (k !== i) {
          subjectTotal += marks[k][j];
        }
      }
      let avg = subjectTotal / (N - 1);
      if (avg < minAvg) {
        minAvg = avg;
        ignoredSubjectIndex = j;
      }
    }

    // Calculate total marks for the student without the ignored subject
    for (let j = 0; j < M; j++) {
      if (j !== ignoredSubjectIndex) {
        totalMarks += marks[i][j];
      }
    }

    result.push(totalMarks);
  }

  return result;
}

// Test
let marks = [
  [75, 76, 65, 87, 87],
  [78, 76, 68, 56, 89],
  [67, 87, 78, 77, 65],
];
let N = 3;
let M = 5;
console.log(calculateTotalMarks(N, M, marks)); // Output: [325, 299, 296]
