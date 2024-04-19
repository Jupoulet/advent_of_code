import puzzle_input from './puzzle_input.txt';

type Module = {
    type: 'broadcaster' | '%' | '&',
    input: string,
    output: string[],
    isOn: boolean,
    previousPulse: 'high' | 'low'
}

const [rawBroadcaster, ...others] = puzzle_input.split('\n');

const broadCasterOutputs = rawBroadcaster.split(' -> ')[1].split(', ');
const broadcaster = {
    type: 'broadcaster',
    outputs: broadCasterOutputs,
}

let modules: any = others.map((rawModule) => {
    const [type, outputs] = rawModule.split(' -> ');
    return {
        type: type[0],
        input: type.substring(1),
        output: outputs.split(', '),
        isOn: false,
        previousPulse: 'low',
    }
});

let currentPulse: 'low' | 'high' = 'low';

const handlePulse = (pulse: 'low' | 'high', module: Module) => {
    // FLIP-FLOP
    // either on or off; initially off. 
    // If receives a high pulse, ignored nothing happens. 
    // if receives a low pulse, flips between on and off. 
    // If it was off, it turns on and sends a high pulse. 
    // If it was on, it turns off and sends a low pulse.
    if (module.type === '%') {
        if (pulse === 'high') {
            return;
            // modules = modules.map((m) => {
            //     if (m.input !== module.input) return m;
            //     return {
            //         ...m,
            //         previousPulse: pulse,
            //     }
            // })
        }
        currentPulse = !module.isOn ? 'high' : 'low';

        modules = modules.map((m: any) => {
            if (m.input !== module.input) return m;
            return {
                ...m,
                isOn: !module.isOn,
            }
        });
    }
    // Conjunction modules
    // remember the type of the most recent pulse received from each of their connected input modules;
    // they initially default to remembering a low pulse for each input. 
    // When a pulse is received, the conjunction module first updates its memory for that input. 
    // Then, if it remembers high pulses for all inputs, it sends a low pulse; 
    // otherwise, it sends a high pulse.
    if (module.type === '&') {
        modules = modules.map((m) => {
            if (m.input !== module.input || module.type !== '&') return m;
            return {
                ...m,
                previousPulse: pulse,
            };
        });
        const hasAllHighPulse = modules.filter((m: any) => m.type === '&').every((module: any) => module.previousPulse === 'high');
        currentPulse = hasAllHighPulse ? 'low' : 'high';
    }
}

// 

const recursiveSequence = (output) => {
    const matchingModule = modules.find((m: any) => m.input === output);
    if (!matchingModule) return;
    handlePulse(currentPulse, matchingModule);
}

// x4
broadcaster.outputs.forEach((output) => {
    recursiveSequence(output)

    console.log('Après', modules[0]);
});
