const Math = {};
function add(x1,x2){

    return x1 + x2;
}

function substract(x1,x2){

    return x1 - x2;
}
function multiply(x1,x2){

    return x1 * x2;
}

function divide(x1,x2){

   if(x2 == 0){
       console.log("Valor no puede ser 0");
   }else{
       return x1 / x2;
   }
}
exports.add = add;
exports.divide = divide;
Math.add = add;
Math.substract = substract;
Math.multiply = multiply;
Math.divide = divide;
module.exports = Math;

//console.log(divide( 5, 0));

