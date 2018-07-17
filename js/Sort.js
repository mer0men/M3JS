var tests = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    [5, 2, 1, 6, 4, 3, 7, 9, 10, 8],
    [2, 5, 3, 9, 10, 4, 1, 6, 7, 8],
    [1, 8, 4, 2, 7, 5, 9, 10, 6, 3],
    [2, 7, 9, 1, 3, 5, 4, 8, 10, 6],
    [3, 1, 7, 4, 2, 8, 5, 6, 10, 9],
    [9, 5, 3, 1, 4, 2, 7, 8, 6, 10],
    [5, 3, 6, 1, 2, 4, 9, 10, 7, 8],
    [4, 2, 1, 7, 9, 5, 3, 8, 10, 6]
];

var rightValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function selectionSort(a)       
{
    let n = a.length;

    for (let i = 0; i < n-1; i++) { 
       let min = i;
       for (let j = i+1; j < n; j++) { 
           if (a[j] < a[min]) 
           	  min = j; 
       } 

       let t = a[min];
       a[min] = a[i];
       a[i] = t;
    }     

    return a;
}

function rightEq(a, b) {
	for (let i = 0; i < a.length - 1; i++) {
		if (a[i] != b[i])
			return false;
	}

	return true;
}

function testSort() {
	for (let i = 0; i < tests.length; i++) {
		console.log("Mas: " + tests[i]);
    selectionSort(tests[i]);
    console.log("Sorted mas: " + tests[i]);
    console.log(rightEq(tests[i], rightValues));
    console.log("//-----------------------------------------------//");
  }
}   