import input from './input.txt';

const parsed = input.split('\n').map((line) => {
    return line.split(' ').map(Number);
});

const safeReports = [];

parsed.forEach((report) => {
    // console.log('---');
    // console.log(report);
    // console.log('---');
    let direction = undefined;
    let previous = undefined;
    for (let i = 0; i < report.length; i++) {
        const element = report[i];
        // console.log('element', element);
        // console.log('direction', direction);
        // console.log('previous', previous)
        const delta = element - previous;
        previous = element;
        if (i === 0) {
            continue;
        };

        // console.log('DELTA', delta);
        if (delta === 0) return;
        else if (direction === undefined) {
            // console.log('should set direction');
            direction = delta > 0 ? 'up' : 'down';
        } else {
            const previousDirection = direction;
            direction = delta > 0 ? 'up' : 'down';
            if (previousDirection && direction !== previousDirection) {
                // console.log('RETURN SWITCH');
                return;
            }
        }

        if (Math.abs(delta) > 3) {
            // console.log('RETURN DELTA');
            return;
        }    
    }
    safeReports.push(report);
});

console.log('safe reports', safeReports.length);