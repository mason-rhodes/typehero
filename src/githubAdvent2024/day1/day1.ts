const fs = require('fs');

const main = () => {
  const input = fs.readFileSync('src/githubAdvent2024/day1/day1.input.txt', 'utf-8');
  const lines = input.split('\n');

  const leftList: number[] = [];
  const rightList: number[] = [];

  for (const line of lines) {
    const [left, right] = line.split('   ');
    leftList.push(parseInt(left));
    rightList.push(parseInt(right));
  }

  let similarityScore = 0;
  const similarityMap = new Map<number, number>()
  for (const left of leftList) {
    let times = 0;
    const n = similarityMap.get(left)
    if (n != null) {
      similarityScore += n
      continue
    }
    for (const right of rightList) {
      if (left === right) {
        times++
      }
    }
    similarityScore += times * left;
    similarityMap.set(left, times * left);
  }
  console.log("similarity score: ", similarityScore);

  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  const distances: number[] = [];
  for (let i = 0; i < leftList.length; i++) {
    distances[i] = Math.abs(leftList[i] - rightList[i])
  }

  let totalDistance = 0;
  for (const distance of distances) {
    totalDistance += distance;
  }
  console.log('total distance', totalDistance);
}

main();