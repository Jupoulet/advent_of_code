import input from './input.txt';

const parsedInput = input.split('\n').map((l) => l.split(''));
let STEP_COUNTER = 0;
const DIRECTIONS = ['^', '>', 'v', '<'];
const findGuard = () => {
    for (let index = 0; index < parsedInput.length; index++) {
        const line = parsedInput[index];
        for (let y = 0; y < line.length; y++) {
            const value = line[y];
            if (!['.', '#'].includes(value)) {
                return [index, y];
            }
        }
    }
};

let lastPosition = findGuard();
const path = [];
let counter = 0;

// Return array or false if obstacle
const moveTop = (currentPosition) => {
    const [y, x] = currentPosition;
    if (!parsedInput[y - 1]) {
        throw new Error(STEP_COUNTER);
    }
    let nextPosition = parsedInput[y - 1][x]
    if (nextPosition === '#') {
        return false;
    };
    lastPosition = currentPosition;
    parsedInput[y - 1][x] = '^';
    parsedInput[y][x] = '.';

    return [y - 1, x];
};

const moveBottom = (currentPosition) => {
    const [y, x] = currentPosition;
    if (!parsedInput[y + 1]) {
        throw new Error(STEP_COUNTER);
    }
    let nextPosition = parsedInput[y + 1][x]
    if (nextPosition === '#') {
        return false;
    };
    lastPosition = currentPosition;
    parsedInput[y + 1][x] = 'v';
    parsedInput[y][x] = '.';
    return [y + 1, x];
};

const moveRight = (currentPosition) => {
    const [y, x] = currentPosition;
    if (!parsedInput[y][x + 1]) {
        throw new Error(STEP_COUNTER);
    }
    let nextPosition = parsedInput[y][x + 1]
    if (nextPosition === '#') {
        return false;
    };
    lastPosition = currentPosition;
    parsedInput[y][x + 1] = '>';
    parsedInput[y][x] = '.';
    return [y, x + 1];
};

const moveLeft = (currentPosition) => {
    const [y, x] = currentPosition;
    if (!parsedInput[y][x - 1]) {
        throw new Error(STEP_COUNTER);
    }
    let nextPosition = parsedInput[y][x - 1]
    if (nextPosition === '#') {
        return false;
    };
    lastPosition = currentPosition;
    parsedInput[y][x - 1] = '<';
    parsedInput[y][x] = '.';
    return [y, x - 1];
};

const dingue = (coordinates) => {
    const [y, x] = coordinates;
    if (!path.some((c) => {
        return c[0] === y && c[1] === x
    })) {
        path.push(coordinates);
        console.log('result', path.length);
    }
}


const proceed = () => {
    const [guardY, guardX] = findGuard();
    const guardValue = parsedInput[guardY][guardX];
    let nextPosition;
    switch (guardValue) {
        case '^':
            nextPosition = moveTop([guardY, guardX]);
            if (nextPosition) {
                parsedInput[nextPosition[0]][nextPosition[1]] = '^'
                dingue(nextPosition);
            }
            if (!nextPosition) {
                nextPosition = moveRight([guardY, guardX]);
                if (nextPosition) {
                    parsedInput[nextPosition[0]][nextPosition[1]] = '>'
                    dingue(nextPosition);
                }
                if (!nextPosition) {
                    nextPosition = moveBottom([guardY, guardX]);
                    if (nextPosition) {
                        parsedInput[nextPosition[0]][nextPosition[1]] = 'v'
                        dingue(nextPosition);
                    }
                    if (!nextPosition) {
                        nextPosition = moveLeft([guardY, guardX]);
                        parsedInput[nextPosition[0]][nextPosition[1]] = '<'
                        dingue(nextPosition);
                    }
                }
            }
            break;
        case '>':
            nextPosition = moveRight([guardY, guardX]);
            if (nextPosition){
                parsedInput[nextPosition[0]][nextPosition[1]] = '>'
                dingue(nextPosition);
            }   
            if (!nextPosition) {
                nextPosition = moveBottom([guardY, guardX]);
                if (nextPosition) {
                    parsedInput[nextPosition[0]][nextPosition[1]] = 'v'
                    dingue(nextPosition);
                }
                if (!nextPosition) {
                    nextPosition = moveLeft([guardY, guardX]);
                    if (nextPosition){
                        parsedInput[nextPosition[0]][nextPosition[1]] = '<'
                        dingue(nextPosition);
                    }
                    if (!nextPosition) {
                        nextPosition = moveTop([guardY, guardX]);
                        parsedInput[nextPosition[0]][nextPosition[1]] = '^'
                        dingue(nextPosition);
                    }
                }
            }
            break;
        case 'v':
            nextPosition = moveBottom([guardY, guardX]);
            if (nextPosition) {
                parsedInput[nextPosition[0]][nextPosition[1]] = 'v'
                dingue(nextPosition);

            }
            if (!nextPosition) {
                nextPosition = moveLeft([guardY, guardX]);
                if (nextPosition){
                    parsedInput[nextPosition[0]][nextPosition[1]] = '<'
                    dingue(nextPosition);
                }
                if (!nextPosition) {
                    nextPosition = moveTop([guardY, guardX]);
                    if (nextPosition) {
                        parsedInput[nextPosition[0]][nextPosition[1]] = '^'
                        dingue(nextPosition);
                    }
                    if (!nextPosition) {
                        moveRight([guardY, guardX]);
                        parsedInput[nextPosition[0]][nextPosition[1]] = '>'
                        dingue(nextPosition);
                    }
                }
            }
            break;
        case '<':
            nextPosition = moveLeft([guardY, guardX]);
            if (nextPosition) {
                parsedInput[nextPosition[0]][nextPosition[1]] = '<'
                dingue(nextPosition);
            }
            if (!nextPosition) {
                nextPosition = moveTop([guardY, guardX]);
                if (nextPosition) {
                    parsedInput[nextPosition[0]][nextPosition[1]] = '^'
                    dingue(nextPosition);
                }
                if (!nextPosition) {
                    nextPosition = moveRight([guardY, guardX]);
                    if (nextPosition){
                        parsedInput[nextPosition[0]][nextPosition[1]] = '>'
                        dingue(nextPosition);
                    }
                    if (!nextPosition) {
                        moveBottom([guardY, guardX]);
                        parsedInput[nextPosition[0]][nextPosition[1]] = 'v'
                        dingue(nextPosition);
                    }
                }
            }
            break;
        default:
            break;
    }
    proceed();
}

proceed();
