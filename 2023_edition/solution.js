// let object = {};

// const objectMaker = (obj, path, value) => {
//   const [firstKey, ...rest] = path.split('.');
//   if (!obj[firstKey]) obj[firstKey] = {};
//   if (rest.length === 0) {
//     obj[firstKey] = value;
//     return obj;
//   }
//   return {
//     [firstKey]: objectMaker(obj[firstKey], rest.join('.'), value)
//   };
// };

// const result = objectMaker(object, 'day.first.insult', 'ta gueule');
// console.log(result);