//Разбор математических выражений согласно польской нотации
// http://www.interface.ru/home.asp?artId=1492

import { priority } from "./const.mjs";



let button=document.querySelector('button');

button.addEventListener("click", startExpressionParse);

function startExpressionParse(){
//Разбор строки на систему выражений и вывод результата

    let str=document.querySelector('input').value;// Получаем строку для разбора

    let plExpr=getPolandExpression(str);
    let html=`
    <div>Выражение в польской нотации: ${plExpr.join(" ")}</div>
    <div>Результат: ${calcPolandExpression(plExpr)}</div>
    `;
    document.querySelector('.expression-result').innerHTML=html;

}


function getPolandExpression(strExpr){
//Возвращает математическую запись в польской нотации в виде объекта
//str - строковое выражение в инфиксной записи

    let str=strExpr[0]=="-"?"0"+strExpr:strExpr;//Унарный минус в начале строки превращаем в бинарный

    let stream=str.match(/([^\s+\-*\/\^)(]+)|([+\-*\/\^)(])/g);//Получаем поток аргументов и операторов

    let stack=[];
    let result=[];
    for(let i=0;i<stream.length;++i){
        if(priority[stream[i]]){
        //Очередной элемент выражения является оператором
            if(!stack.length || stream[i]=="(" || priority[stack[stack.length-1]]<priority[stream[i]]){
            //Стек пуст или открывающая скобка или приоритет операций в стеке ниже текущего
                stack.push(stream[i]);
            }
            else{
            //В стеке находятся операции с бОльшим или равным приоритетом. Извлекаем их в выходную строку
                let operator;
                do{
                    operator=stack.pop();
                    if(operator!="("){
                        result.push(operator);
                    }

                } while(stack.length>0 && priority[operator]>priority[stream[i]]);
                if(stream[i]!=")")stack.push(stream[i]);//Операцию заносим в стек
            }
        }else{
        //Элемент выражения является аргументом
            result.push(stream[i]);
        }
    }

    for(;stack.length>0;){
    //Освобождаем стек
        result.push(stack.pop());
    }

    return result;
}

function calcPolandExpression(expr){
//Вычисление выражений, записанных в польской нотации
    let stack=[];
    expr.forEach(el=>{
        if(priority[el]){
        //Получен оператор
            if(isNaN(stack[stack.length-1]) || isNaN(stack[stack.length-2])){
            //Численное решение невозможно
                stack.push(el);
            }else{
                let arg2=Number(stack.pop());
                switch(el){
                    case "+":
                        stack[stack.length-1]+=arg2;
                        break;
                    case "-":
                        stack[stack.length-1]-=arg2;
                        break;
                    case "*":
                        stack[stack.length-1]*=arg2;
                        break;
                    case "/":
                        stack[stack.length-1]/=arg2;
                        break;
                    case "^":
                        stack[stack.length-1]**=arg2;
                        break;
                }
            }       
        }else{
        //получен аргумент
            stack.push(el);
        }
    });
    return stack.join(" ");
}