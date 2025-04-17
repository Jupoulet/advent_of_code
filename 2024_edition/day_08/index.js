import input from './input.txt';

const parsed = input.split('\n').map((l) => l.split(''));

parsed.forEach(element => {
    console.log(element);
});

// on identifie les frequénces avec les coordonnées
// on boucle sur les fréquences et on remplit l'input

// [0,x,y]

const identifyFrequencies = () => {
    const result = [];
    for (let y = 0; y < parsed.length; y++) {
        const element = parsed[y];
        for (let x = 0; x < element.length; x++) {
            const elementBis = element[x];
            if (elementBis !== '.') {
                let index;
                const antenneExists = result.find((e, ii) => {
                    index = ii;
                    return e[0] === elementBis
                });
                if (!antenneExists) result.push([elementBis, [y, x]])
                else result[index].push([y, x]);                
            }
        }
    }
    return result;
}

const antinodes = [];

parsed.forEach((line, y) => {
    line.forEach((column, x) => {
        const element = parsed[y][x];
        if (element === '.') return;
        let index;
        const isAntenneExists = antinodes.find((e, ii) => {
            index = ii;
            return element === e[0];
        });
        if (isAntenneExists) {
            antinodes[index].push([y,x])
        } else {
            antinodes.push([element, [y, x]])
        }
    });
})

const calculateAntiNode = (frequencyA, frequencyB, antenne) => {
    const X = frequencyB[1] - frequencyA[1];
    const Y = frequencyB[0] - frequencyA[0];

    let antinode1X = frequencyA[1] - X;
    let antinode1Y = frequencyA[0] - Y;
    let whileCounter1=1;

    while ((antinode1X >= 0 && antinode1X < parsed[0].length)
    && (antinode1Y >= 0 && antinode1Y < parsed.length)
    ){
        antinode1X = frequencyA[1] - X*whileCounter1;
        antinode1Y = frequencyA[0] - Y*whileCounter1;
        let index;
        const isAntenneExists = antinodes.find((e, ii) => {
            index = ii;
            return antenne[0] === e[0];
        });
        if ((antinode1X >= 0 && antinode1X < parsed[0].length)
        && (antinode1Y >= 0 && antinode1Y < parsed.length)
        ){
            if (isAntenneExists) {
                antinodes[index].push([antinode1Y, antinode1X])
            } else {
                antinodes.push([antenne[0], [antinode1Y, antinode1X]])
            }
        }
        whileCounter1++
    }  


    let antinode2Y = frequencyB[0] + Y;
    let antinode2X = frequencyB[1] + X;
    let whileCounter2=1;
    while ((antinode2X >= 0 && antinode2X < parsed[0].length)
        && (antinode2Y >= 0 && antinode2Y < parsed.length)
    ) {
        let index;
        antinode2Y = frequencyB[0] + Y*whileCounter2;
        antinode2X = frequencyB[1] + X*whileCounter2;
        const isAntenneExists = antinodes.find((e, ii) => {
            index = ii;
            return antenne[0] === e[0];
        });
        if ((antinode2X >= 0 && antinode2X < parsed[0].length)
        && (antinode2Y >= 0 && antinode2Y < parsed.length)
        ) {
            if (isAntenneExists) {
                antinodes[index].push([antinode2Y, antinode2X])
            } else {
                antinodes.push([antenne[0], [antinode2Y, antinode2X]])
            }
        }
        whileCounter2++
    }
}

const findAntinodes = (frequency) => {
    const [antenne, ...frequencies] = frequency;
    for (let index = 0; index < frequencies.length; index++) {
        const [y, x] = frequencies[index]; // [1,8]
        for (let indexBis = index + 1; indexBis < frequencies.length; indexBis++) {
            const [yBis, xBis] = frequencies[indexBis]; // [2, 5]
            calculateAntiNode([y, x], [yBis, xBis], antenne);
        }
        
    }
}
const frequencies = identifyFrequencies();
console.log('antinodes');
frequencies.forEach((f) => findAntinodes(f));
antinodes.forEach((a) => console.log(a))
//[ "0", [ 1, 8 ], [ 2, 5 ], [ 3, 7 ], [ 4, 4 ] ]

const result = [];

antinodes.forEach((antinode) => {
    const [antenne, ...antinoeuds] = antinode;
    antinoeuds.forEach((a) => {
        if (result.some((x) => {
            return (x[0] === a[0]) && (x[1] === a[1]);
        })) return;
        result.push(a);
    })
});

console.log('Result', result.length);


// T [0, 0]
// T2 [1, 3]
// T3 [2, 1]

// En gros ca se répète, il faut return quand on sort du tableau