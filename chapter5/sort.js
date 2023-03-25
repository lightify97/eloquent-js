const bubbleSort = (array) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] > array[j]) {
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }
    return array;
};


const selectionSort = (array) => {
    // let i = j = minIdx = 0;
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
        }
    }
    return array;
};

const insertionSort = (array) => {
    for (let i = 1; i < array.length; i++) {
        let j = i - 1;
        while (j >= 0 && array[j + 1] < array[j]) {
            let temp = array[j + 1];
            array[j + 1] = array[j];
            array[j] = temp;
        }
    }
    return array;
};

const mergeSort = (array) => {
    return;
};

console.log(selectionSort([3, 5, 7, 2, 2, 1, 15, 4, 3, 0, 4]));
