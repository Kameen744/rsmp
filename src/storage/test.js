
const findDuplicates = (data) => {
  let duplicatesFound = new Set();
  for(let i = 0; i < data.length; i++) {
    let cVal = data[i];
    let vFound = 0;
    data.forEach((num) => {
      if(num === cVal) {
        vFound += 1;
      }
    });

    if(vFound > 1) {
      duplicatesFound.add(cVal);
    }
  }

  return Array.from(duplicatesFound);
}

const duplicates = findDuplicates([1, 2, 3, 4, 2, 7, 8, 8, 3]);
console.log(duplicates);