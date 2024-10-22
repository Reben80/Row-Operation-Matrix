// Function to generate a random 3x4 matrix
export const generateRandomMatrix = (): number[][] => {
    const rows = 3;
    const cols = 4;
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(Math.floor(Math.random() * 10)); // Random number between 0 and 9
        }
        matrix.push(row);
    }
    return matrix;
};

// Function to swap two rows randomly
const swapRows = (matrix: number[][]): { newMatrix: number[][], operation: string } => {
    const rows = matrix.length;
    const i = Math.floor(Math.random() * rows);
    let j;
    do {
        j = Math.floor(Math.random() * rows);
    } while (i === j);
    const newMatrix = matrix.map(row => [...row]);
    [newMatrix[i], newMatrix[j]] = [newMatrix[j], newMatrix[i]];
    const operation = `R${i + 1} ↔ R${j + 1}`;
    return { newMatrix, operation };
};

// Function to multiply a row by a random scalar
const multiplyRowByScalar = (matrix: number[][]): { newMatrix: number[][], operation: string } => {
    const rows = matrix.length;
    const i = Math.floor(Math.random() * rows);
    const n = Math.floor(Math.random() * 9) + 1; // Random non-zero integer between 1 and 9
    const newMatrix = matrix.map(row => [...row]);
    for (let k = 0; k < matrix[0].length; k++) {
        newMatrix[i][k] *= n;
    }
    const operation = `R${i + 1} → ${n}R${i + 1}`;
    return { newMatrix, operation };
};

// Function to add a multiple of one row to another
const addMultipleOfRow = (matrix: number[][]): { newMatrix: number[][], operation: string } => {
    const rows = matrix.length;
    const i = Math.floor(Math.random() * rows);
    let j;
    do {
        j = Math.floor(Math.random() * rows);
    } while (i === j);
    const n = Math.floor(Math.random() * 9) + 1; // Random non-zero integer between 1 and 9
    const newMatrix = matrix.map(row => [...row]);
    for (let k = 0; k < matrix[0].length; k++) {
        newMatrix[i][k] += n * matrix[j][k];
    }
    const operation = `R${i + 1} → R${i + 1} + ${n}R${j + 1}`;
    return { newMatrix, operation };
};

// Function to apply a random row operation
export const applyRandomRowOperation = (matrix: number[][]): { newMatrix: number[][], operation: string } => {
    const operations = [swapRows, multiplyRowByScalar, addMultipleOfRow];
    const randomOperation = operations[Math.floor(Math.random() * operations.length)];
    return randomOperation(matrix);
};

// Function to generate multiple choice options, avoiding reverse swap issues
export const generateOptions = (correctOperation: string): string[] => {
    const options = [correctOperation];  // Start with the correct operation
    const reverseSwap = correctOperation.includes('↔')
        ? correctOperation.split(' ↔ ').reverse().join(' ↔ ')
        : '';  // Handle swap row reversals, if it's a swap operation

    while (options.length < 4) {
        const i = Math.floor(Math.random() * 3) + 1;
        let j;
        do {
            j = Math.floor(Math.random() * 3) + 1;
        } while (i === j);

        const n = Math.floor(Math.random() * 9) + 1;
        const operation = `R${i} → R${i} + ${n}R${j}`;

        // Make sure it's not the reverse of the correct swap operation or already included
        if (!options.includes(operation) && operation !== reverseSwap) {
            options.push(operation);
        }
    }

    return options.sort(() => Math.random() - 0.5); // Shuffle options
};
