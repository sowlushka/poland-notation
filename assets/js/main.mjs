//Разбор математических выражений согласно польской нотации
// http://www.interface.ru/home.asp?artId=1492

import { priority } from "./const.mjs";



let button=document.querySelector('button');

button.addEventListener("click", startExpressionParse);

function startExpressionParse(){
//Разбор строки на систему выражений и вывод результата

    let str=document.querySelector('input').value;// Получаем строку для разбора

    let plExpr=getPolandExpression(str);
    document.querySelector('.expression-result').innerHTML=plExpr;

}


function getPolandExpression(strExpr){
//Возвращает математическую запись в польской нотации в виде объекта
//str - строковое выражение в инфиксной записи

    let str=strExpr[0]=="-"?"0"+strExpr:strExpr;//Унарный минус в начале строки превращаем в бинарный

    let stream=str.match(/([^\s+\-*\/\^)(]+)|([+\-*\/\^)(])/g);//Получаем поток аргументов и операторов

    /*
    let args=str.match(/[^\s+\-*\/\^]+/g);//Массив операндов
    let oprtr=str.match(/[+\-*\/\^)(]/g);//Массив операторов
    */

    let stack=[];
    let strResult=[];
    for(let i=0;i<stream.length;++i){
        if(priority[stream[i]]){
        //Очередной элемент выражения является оператором
            if(!stack.length || priority[stack[stack.length-1]]<priority[stream[i]]){
            //Стек пуст или приоритет операций в стеке ниже текущего
                stack.push(stream[i]);
            }
            else{
            //В стеке находятся операции с бОльшим приоритетом. Извлекаем их в выходную строку
                for(;stack.length>0;){
                    if(priority[stack[stack.length-1]]>priority[stream[i]]){
                        strResult.push(stack.pop());
                    }else{
                    //Встретился оператор с тем же или меньшим приоритетом
                        break;
                    }
                }
                stack.push(stream[i]);//Операцию заносим в стек
            }
        }else{
        //Элемент выражения является аргументом
            strResult.push(stream[i]);
        }
    }

    for(;stack.length>0;){
    //Освобождаем стек
        strResult.push(stack.pop());
    }

    return strResult.join(" ");
}