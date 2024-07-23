const isTrue = (value) => [true , "true" , 1 , "1"].includes(value);
const isFalse = (value) => [false , "false" , 0 , "0"].includes(value);
const removeObjectProperties = async (target = {} , properties = []) =>{
    properties.forEach(prop => {
        delete target[prop];
    });
    return target;
}
module.exports = {
    isTrue,
    isFalse,
    removeObjectProperties
}