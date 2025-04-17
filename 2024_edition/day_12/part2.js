import input from './input.txt';

const parsed = input.split('\n').map((x) => x.split(''))

let perimeterCounter = 0;
let areaChecker = [];
let areaCounter = 0;
const checkPerimeter = (index) => {
    areaCounter++;
    const isAlreadyVisited = (i) => areaChecker.some((area) => JSON.stringify(area) === JSON.stringify(i));
    if (!isAlreadyVisited(index)) {
        areaChecker.push(index);
    }
    const [y, x] = index;
    const value = parsed[y][x];
    const top = !parsed[y - 1] ? undefined : parsed[y - 1][x];
    const bottom = !parsed[y + 1] ? undefined : parsed[y + 1][x];
    const left = parsed[y][x - 1];
    const right = parsed[y][x + 1];
    [top, bottom, right, left].forEach((v, index) => {
        if (!v || v !== value) {
            perimeterCounter++;
        }
        if (v === value) {
            if (index === 0 && !isAlreadyVisited([y-1,x])) {
                //on stocke la direction que l'on a actuellement 
                checkPerimeter([y-1,x])
            }
            if (index === 1 && !isAlreadyVisited([y+1,x])) checkPerimeter([y+1,x])
            if (index === 2 && !isAlreadyVisited([y,x+1])) checkPerimeter([y,x+1])
            if (index === 3 && !isAlreadyVisited([y,x-1])) checkPerimeter([y,x-1])
        }
    });
    return { counter: perimeterCounter, areaChecker };
    // [[]]
}
const result = [];
for (let y = 0; y < parsed.length; y++) {
    console.log('line', y);
    for (let x = 0; x < parsed[y].length; x++) {
        const isAlreadyVisited = (index) => areaChecker.some((area) => JSON.stringify(area) === JSON.stringify(index));
        if (isAlreadyVisited([y,x])) continue;
        const { counter } = checkPerimeter([y,x]);
        result.push([counter, areaCounter]);
        areaCounter = 0;
        perimeterCounter = 0;
    }    
}

let sum = 0;
result.forEach((e) => {
    sum += e[0]*e[1]
})
console.log('result', checkPerimeter([0,0]));
console.log('resultt', result);
console.log('SUM', sum);