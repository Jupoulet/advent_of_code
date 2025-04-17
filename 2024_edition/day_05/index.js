import input from './input.txt';

const [rules, queues] = input.split('\n\n');

const parsedRules = rules.split('\n').map((r) => r.split('|').map(Number));
const parsedQueues = queues.split('\n').map((q) => q.split(',').map(Number));

// on boucle sur chaque chiffre de chaque queue
// 75
// on le l'associe  à chaque chiffre de la queue
// 75, 47
// On regarde s'il y a une règle existante inverse
// 47 | 75 -> fail 
// Fils on s'arrête on stocke le chiffre du milieu dans l'addition


let middlePaper = 0;
let isOk = true;

const fonctionAPart = (queue) => {
    queue.forEach((paper, paperIndex) => {
        for (let index = paperIndex + 1; index < queue.length; index++) {
            const associatedPaper = queue[index];
            console.log('Ass paper', associatedPaper);
            const matchForbidenRule = parsedRules.find((rule) => {
                return associatedPaper === rule[0] && paper === rule[1];
            });
            console.log('RULE', matchForbidenRule);
            // if (!matchForbidenRule) {
            //     console.log('Middle paper added:', queue[(queue.length + 1) / 2 -1])
            //     middlePaper += queue[(queue.length + 1) / 2 -1]
            //     return;
            // }
            if (matchForbidenRule) {
                // ON CORRIGE MA PUTIN DE LIGNE
                // Ici on sait quelle règle pas ok 
                console.log("KO");
                console.log('associatedPaper', associatedPaper);
                console.log('paper', paper);
                isOk = false;
                queue[index] = paper // ??
                queue[paperIndex] = associatedPaper;
                console.log('Nouvelle QUEUE', queue)
                return fonctionAPart(queue);
            }
        }
    })
}

const handleQueue = () => {
    parsedQueues.forEach((queue) => {
        console.log('QUEUE', queue);
        fonctionAPart(queue);
        if (!isOk) {
            console.log('Middle paper added:', queue[(queue.length + 1) / 2 -1])
            middlePaper += queue[(queue.length + 1) / 2 -1]
            return;
        }
    });
    console.log('Middlepaper', middlePaper);
};

handleQueue();