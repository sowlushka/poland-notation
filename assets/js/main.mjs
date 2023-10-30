//Разбор математических выражений согласно польской нотации

import { operators } from "./const.mjs";



let button=document.querySelector('button');

button.addEventListener("click", startExpressionParse);

function startExpressionParse(){
//Разбор строки на систему выражений и вывод результата

    let str=document.querySelector('input').value;// Получаем строку для разбора

    let plExpr=getPolandExpression(str);

}


function getPolandExpression(strExpr){
//Возвращает математическую запись в польской нотации в виде объекта
//str - строковое выражение в инфиксной записи

let str=strExpr[0]=="-"?"0"+strExpr:strExpr;//Унарный минус в начале строки превращаем в бинарный

let stream=str.match(/([^\s+\-*\/\^)(]+)|([+\-*\/\^)(])/);//Получаем поток аргументов и операторов

/*
let args=str.match(/[^\s+\-*\/\^]+/g);//Массив операндов
let oprtr=str.match(/[+\-*\/\^)(]/g);//Массив операторов
*/

let stack=[];
let strResult=[];



}