import puzzle from './puzzle_input.txt';

const [rawWorkflows, rawRatings] = puzzle.split('\n\n');

// {
//     name: 'px',
//     operations: [{
//         element: 'a',
//         operator: '<',
//         value: '2006',
//         nextWorkflow: 'qkq'
//     }, {
        
//     }]
// }

// px{a<2006:qkq,m>2090:A,rfg}
// a<2006:qkq
// rfg
const formatRawStringWorkflowToFomattedWorkflowObject = (rawWorkflow: string) => {
    const  obj = {};
    const [name, rawOperations] = rawWorkflow.replace('}', '').split('{');
    obj.name = name;
    obj.operations = rawOperations.split(',').map((rawOperation) => formatRawStringOperationToFormattedOperationObject(rawOperation));

    return obj;
}

// a<2006:qkq
// qkq
const formatRawStringOperationToFormattedOperationObject = (rawOperation: string) => {
    const obj = {};
    
    const rawString = rawOperation.split(':');
    if (rawString.length === 2){
        const [s, nextWorkflow] = rawString;
        obj.element = s[0];
        obj.operator = s[1];
        obj.value = s.split('').splice(2).join('');
        obj.nextWorkflow = nextWorkflow
        return obj;
    }
    if (rawString.length === 1){
        return {
            nextWorkflow: rawString[0],
        }
    }
}

const listOfWorflows = rawWorkflows.split('\n').map((w) => formatRawStringWorkflowToFomattedWorkflowObject(w));

console.log('list', listOfWorflows);

// {x=787,m=2655,a=1222,s=2876}

const formatRating = (rawRating: string) => {
    const s = rawRating.replace('}', '').replace('{', '');
    const rawRatings = s.split(',').map((r) => r.split('='));

    return rawRatings;
}

const listOfRatings = rawRatings.split('\n').map((r) => formatRating(r));
console.log('listOfRatings', listOfRatings);

const getRatingStatus = (ratings: string[][], listOfWorkflows: any, startingWorkflow: any) => {
    console.log('---------');
    console.log('Hello', startingWorkflow.name);

    for (let index = 0; index < startingWorkflow.operations.length; index++) {
        const operation = startingWorkflow.operations[index];
         // [x, 787]
         const matchingRating = ratings.find((r) => r[0] === operation.element);
         if (!matchingRating && !operation.nextWorkflow) {
             console.log('No matching, something wrong', operation);
             return;
         }
 
         if (!matchingRating && operation.nextWorkflow) {
             console.log('⚠️ No matching rating');
             if (['A', 'R'].includes(operation.nextWorkflow)) return operation.nextWorkflow;
             const nextWorkflow = listOfWorkflows.find((w) => w.name === operation.nextWorkflow)
             return getRatingStatus(ratings, listOfWorkflows, nextWorkflow);
         }
         console.log('operator', operation.operator);
         switch (operation.operator) {
             case '<':
                 if (Number(matchingRating[1]) < Number(operation.value)) {
                     const nextWorkflow = listOfWorkflows.find((w) => w.name === operation.nextWorkflow)
                     if (['A', 'R'].includes(operation.nextWorkflow)) return operation.nextWorkflow;
                     return getRatingStatus(ratings, listOfWorkflows, nextWorkflow);
                 }
                 break;
             case '>':
                 console.log(operation);
                 if (Number(matchingRating[1]) > Number(operation.value)) {
                     const nextWorkflow = listOfWorkflows.find((w) => w.name === operation.nextWorkflow);
                     if (['A', 'R'].includes(operation.nextWorkflow)) {
                         console.log('DONE');
                         return operation.nextWorkflow;
                     }
                     return getRatingStatus(ratings, listOfWorkflows, nextWorkflow);
                 }
                 break;
             default:
                 break;
         }
    }

    // startingWorkflow.operations.forEach(operation => {
    //     // [x, 787]
    //     const matchingRating = ratings.find((r) => r[0] === operation.element);
    //     if (!matchingRating && !operation.nextWorkflow) {
    //         console.log('No matching, something wrong', operation);
    //         return;
    //     }

    //     if (!matchingRating && operation.nextWorkflow) {
    //         console.log('⚠️ No matching rating');
    //         if (['A', 'R'].includes(operation.nextWorkflow)) return operation.nextWorkflow;
    //         const nextWorkflow = listOfWorkflows.find((w) => w.name === operation.nextWorkflow)
    //         return getRatingStatus(ratings, listOfWorkflows, nextWorkflow);
    //     }
    //     console.log('operator', operation.operator);
    //     switch (operation.operator) {
    //         case '<':
    //             if (Number(matchingRating[1]) < Number(operation.value)) {
    //                 const nextWorkflow = listOfWorkflows.find((w) => w.name === operation.nextWorkflow)
    //                 if (['A', 'R'].includes(operation.nextWorkflow)) return operation.nextWorkflow;
    //                 return getRatingStatus(ratings, listOfWorkflows, nextWorkflow);
    //             }
    //             break;
    //         case '>':
    //             console.log(operation);
    //             if (Number(matchingRating[1]) > Number(operation.value)) {
    //                 const nextWorkflow = listOfWorkflows.find((w) => w.name === operation.nextWorkflow);
    //                 if (['A', 'R'].includes(operation.nextWorkflow)) {
    //                     console.log('DONE');
    //                     return operation.nextWorkflow;
    //                 }
    //                 return getRatingStatus(ratings, listOfWorkflows, nextWorkflow);
    //             }
    //             break;
    //         default:
    //             break;
    //     }
    // });
}

const startingWorkflow = listOfWorflows.find((w) => w.name === 'in');
console.log(getRatingStatus(listOfRatings[4], listOfWorflows, startingWorkflow));

let result = 0;
listOfRatings.forEach((rating) => {
    const status = getRatingStatus(rating, listOfWorflows, startingWorkflow);
    if (status === 'A') {
        // [x, 787]
        const sum = rating.reduce((sum, current) => {
            sum += Number(current[1]);
            return sum;
        }, 0);
        result += sum;
    }
});

console.log('Result', result);







