import puzzle from './input.txt';

const parsedInput = puzzle.split('\n').map((line) => {
    const lineWithoutColon = line.replace(':', '');
    return lineWithoutColon.split(' ');
});


const identifyAllModules = () => {
    const array = [];
    parsedInput.forEach((line) => {
        const entry = [...line];
        const [firstModule] = line; // jqt
        parsedInput.forEach((lineBis) => {
            const [first, ...rest] = lineBis
            if (rest.includes(firstModule)) {
                entry.push(first);
            }
        })
        array.push(entry);
    });
    return array;
}

// [
//  [jqt rhn xhk nvd]
//  [rsh frs pzl lsr]
//]

identifyAllModules().forEach((l) => console.log(l));

const parsed = identifyAllModules();

const aeFunction = () => {
    const newArray = []
    // [ "jqt", "rhn", "xhk", "ntq" ]
    // [ "rsh", "frs", "pzl", "lsr", "rzs" ]
    // On push la première ligne
// [ "jqt", "rhn", "xhk", "nvd", "ntq" ]
// [ "rsh", "frs", "pzl", "lsr", "rzs" ]
// [ "xhk", "hfx", "jqt", "rhn", "bvb", "ntq" ]
// [ "cmg", "qnr", "nvd", "lhk", "bvb", "rzs" ]
// [ "rhn", "xhk", "bvb", "hfx", "jqt" ]
// [ "bvb", "xhk", "hfx", "cmg", "rhn", "ntq" ]
// [ "pzl", "lsr", "hfx", "nvd", "rsh" ]
// [ "qnr", "nvd", "cmg", "rzs", "frs" ]
// [ "ntq", "jqt", "hfx", "bvb", "xhk" ]
// [ "nvd", "lhk", "jqt", "cmg", "pzl", "qnr" ]
// [ "lsr", "lhk", "rsh", "pzl", "rzs", "frs" ]
// [ "rzs", "qnr", "cmg", "lsr", "rsh" ]
// [ "frs", "qnr", "lhk", "lsr", "rsh" ]
    parsed.forEach((line) => {
        console.log('LINE QUON REGARDE AVANT', line)
        // [ "jqt", "rhn", "xhk", "ntq" ]
        let lineToPush = [];
        const allModulesInArray = newArray.some((l) => {
            return l.some((module) => line.includes(module));
        });
        if (newArray.length === 0 || !allModulesInArray){
            lineToPush = [...line];
            line.forEach((module) => {
                const matchedLine = parsed.find((line) => {
                    return line[0] === module
                });
                console.log('matchedLine', matchedLine);
                // On push dans la ligne de newarray les modules du parsed qui n'y étaient pas
                const modulesToPush = matchedLine.filter((mod) => !lineToPush.includes(mod));
                console.log('LINE PUSHED', lineToPush)
                lineToPush = [...lineToPush, ...modulesToPush];
            });
            newArray.push(lineToPush);
        }
         // On parcours la ligne module par module 
         // On va chercher dans le parsed les lignes qui commencent par le module
        // else {
        //     // [[ "jqt", "rhn", "xhk", "ntq"]]
        //     newArray.forEach((pushedLine, i) => {
        //         // [ "jqt", "rhn", "xhk", "ntq" ]
        //         for (let index = 1; index < pushedLine.length; index++) {
        //             // "rhn"
        //             const module_ = pushedLine[index];
        //             const matchedLine = parsed.find((line) => {
        //                 return line[0] === module_
        //             });
        //             if (!matchedLine) {
        //                 console.log('BREAK', line)
        //                 break;
        //             }
        //             // On veut pusher dans newArray[i] chaque module de matchedLine qui n'y est pas deja
        //             matchedLine.forEach((module__) => {
        //                 if (newArray[i].includes(module__)) {
        //                     console.log('Return', newArray[i]);
        //                     console.log('Module', module__);
        //                     return;
        //                 }
        //                 console.log('LIGNE QUON REGARDE', line)
        //                 console.log('MODULE PUSHED', module__);
        //                 console.log('DANS QUOI C POUSSE', newArray[i])
        //                 newArray[i].push(module__);
        //             });
        //             break;
        //         }
        //     });
        // }
    });
    return newArray;
}

console.log('REsult', aeFunction())

// [ "jqt", "rhn", "xhk", "nvd", "ntq", "hfx", "bvb" ]

// [ "rsh", "frs", "pzl", "lsr", "rzs" ]

// [ "xhk", "hfx", "jqt", "rhn", "bvb", "ntq" ]

// [ "cmg", "qnr", "nvd", "lhk", "bvb", "rzs" ]
// [ "rhn", "xhk", "bvb", "hfx", "jqt" ]
// [ "bvb", "xhk", "hfx", "cmg", "rhn", "ntq" ]
// [ "pzl", "lsr", "hfx", "nvd", "rsh" ]
// [ "qnr", "nvd", "cmg", "rzs", "frs" ]
// [ "ntq", "jqt", "hfx", "bvb", "xhk" ]
// [ "nvd", "lhk", "jqt", "cmg", "pzl", "qnr" ]
// [ "lsr", "lhk", "rsh", "pzl", "rzs", "frs" ]
// [ "rzs", "qnr", "cmg", "lsr", "rsh" ]
// [ "frs", "qnr", "lhk", "lsr", "rsh" ]


// [ "jqt", "rhn", "xhk", "ntq" ]
// [ "rsh", "frs", "pzl", "lsr", "rzs" ]
// [ "xhk", "hfx", "jqt", "rhn", "bvb", "ntq" ]
// [ "cmg", "qnr", "nvd", "lhk", "rzs" ]
// [ "rhn", "xhk", "bvb", "hfx", "jqt" ]
// [ "bvb", "xhk", "hfx", "rhn", "ntq" ]
// [ "pzl", "lsr", "nvd", "rsh" ]
// [ "qnr", "nvd", "cmg", "rzs", "frs" ]
// [ "ntq", "jqt", "hfx", "bvb", "xhk" ]
// [ "nvd", "lhk", "cmg", "pzl", "qnr" ]
// [ "lsr", "lhk", "rsh", "pzl", "rzs", "frs" ]
// [ "rzs", "qnr", "cmg", "lsr", "rsh" ]
// [ "frs", "qnr", "lhk", "lsr", "rsh" ]

// [ "jqt", "rhn", "xhk", "ntq" ]
// [ "rhn", "xhk", "bvb", "hfx", "jqt" ]
// [ "xhk", "hfx", "jqt", "rhn", "bvb", "ntq" ]
// [ "ntq", "jqt", "hfx", "bvb", "xhk" ]
// [ "bvb", "xhk", "hfx", "rhn", "ntq" ]

// [ "rsh", "frs", "pzl", "lsr", "rzs" ]
// [ "frs", "qnr", "lhk", "lsr", "rsh" ]
// [ "pzl", "lsr", "nvd", "rsh" ]
// [ "lsr", "lhk", "rsh", "pzl", "rzs", "frs" ]
// [ "rzs", "qnr", "cmg", "lsr", "rsh" ]
// [ "qnr", "nvd", "cmg", "rzs", "frs" ]
// [ "nvd", "lhk", "cmg", "pzl", "qnr" ]
// [ "cmg", "qnr", "nvd", "lhk", "rzs" ]



// [ "jqt", "rhn", "xhk", "nvd", "ntq" ]
// [ "rsh", "frs", "pzl", "lsr", "rzs" ]
// [ "xhk", "hfx", "jqt", "rhn", "bvb", "ntq" ]
// [ "cmg", "qnr", "nvd", "lhk", "bvb", "rzs" ]
// [ "rhn", "xhk", "bvb", "hfx", "jqt" ]
// [ "bvb", "xhk", "hfx", "cmg", "rhn", "ntq" ]
// [ "pzl", "lsr", "hfx", "nvd", "rsh" ]
// [ "qnr", "nvd", "cmg", "rzs", "frs" ]
// [ "ntq", "jqt", "hfx", "bvb", "xhk" ]
// [ "nvd", "lhk", "jqt", "cmg", "pzl", "qnr" ]
// [ "lsr", "lhk", "rsh", "pzl", "rzs", "frs" ]
// [ "rzs", "qnr", "cmg", "lsr", "rsh" ]
// [ "frs", "qnr", "lhk", "lsr", "rsh" ]

// [ "jqt", "rhn", "xhk", "nvd", "ntq" ]

// [ "rsh", "frs", "pzl", "lsr", "rzs" ]

// [ "xhk", "hfx", "jqt", "rhn", "bvb", "ntq" ]
// [ "cmg", "qnr", "nvd", "lhk", "bvb", "rzs" ]
// [ "rhn", "xhk", "bvb", "hfx", "jqt" ]
// [ "bvb", "xhk", "hfx", "cmg", "rhn", "ntq" ]
// [ "pzl", "lsr", "hfx", "nvd", "rsh" ]
// [ "qnr", "nvd", "cmg", "rzs", "frs" ]
// [ "ntq", "jqt", "hfx", "bvb", "xhk" ]
// [ "nvd", "lhk", "jqt", "cmg", "pzl", "qnr" ]
// [ "lsr", "lhk", "rsh", "pzl", "rzs", "frs" ]
// [ "rzs", "qnr", "cmg", "lsr", "rsh" ]
// [ "frs", "qnr", "lhk", "lsr", "rsh" ]

// On push la première
// On parcours la ligne module par module 
// On va chercher dans le parsed les lignes qui commencent par le module
// On push dans la ligne les modules du parsed qui n'y étaient pas

// [ "jqt", "rhn", "xhk", "ntq", "bvb", "hfx", "jqt"]

// [ "jqt", "rhn", "xhk", "ntq" ]
// [ "rhn", "xhk", "bvb", "hfx", "jqt" ]
// [ "xhk", "hfx", "jqt", "rhn", "bvb", "ntq" ]
// [ "ntq", "jqt", "hfx", "bvb", "xhk" ]
// [ "bvb", "xhk", "hfx", "rhn", "ntq" ]
// [ "rsh", "frs", "pzl", "lsr", "rzs" ]
// [ "frs", "qnr", "lhk", "lsr", "rsh" ]
// [ "pzl", "lsr", "nvd", "rsh" ]
// [ "lsr", "lhk", "rsh", "pzl", "rzs", "frs" ]
// [ "rzs", "qnr", "cmg", "lsr", "rsh" ]
// [ "cmg", "qnr", "nvd", "lhk", "rzs" ]
// [ "qnr", "nvd", "cmg", "rzs", "frs" ]
// [ "nvd", "lhk", "cmg", "pzl", "qnr" ]

// [ "xhk", "hfx", "jqt", "rhn", "bvb", "ntq", ]

// [ "xhk", "hfx", "jqt", "rhn", "bvb", "ntq" ]
// [ "cmg", "qnr", "nvd", "lhk", "bvb", "rzs" ]
// [ "rhn", "xhk", "bvb", "hfx", "jqt" ]
// [ "bvb", "xhk", "hfx", "cmg", "rhn", "ntq" ]
// [ "pzl", "lsr", "hfx", "nvd", "rsh" ]
// [ "qnr", "nvd", "cmg", "rzs", "frs" ]
// [ "ntq", "jqt", "hfx", "bvb", "xhk" ]
// [ "nvd", "lhk", "jqt", "cmg", "pzl", "qnr" ]
// [ "lsr", "lhk", "rsh", "pzl", "rzs", "frs" ]
// [ "rzs", "qnr", "cmg", "lsr", "rsh" ]
// [ "frs", "qnr", "lhk", "lsr", "rsh" ]