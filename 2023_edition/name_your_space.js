// let stuff = {}
// namespace(stuff, 'moreStuff.name.firstName', 'the stuff')
// // results in {moreStuff: { name: 'the stuff' }}
// namespace(stuff, 'moreStuff.name') // returns 'the stuff'
// namesace(stuff, 'otherStuff.id') // returns undefined


let stuff = {};
const nameSpace = (object, path, value) => {
    if (!value) return;
    const splittedPath = path.split('.'); // ['moreStuff', 'name'];
    let currentPath = 'moreStuff.name';
    splittedPath.forEach((key) => {
        if (!stuff[currentPath]) {
            stuff[key] = {}; // stuff: { moreStuff: {} }
        }
        currentPath += "." + key;
    });
    nameSpace(updatedObject,'name', value)
}
