function getSelectorButton(keyValue){
    const mapKey={
        'Enter':'result',
        '=':'result',
        'Backspace':'operator del',
        'Delete':'operator del',
        'Escape':'reset',
        '/':'operator divition',
        '*':'operator multiply',
        '-':'operator less',
        '+':'operator plus',
        '.':'operator point',
        '0':'number 0',
        '1':'number 1',
        '2':'number 2',
        '3':'number 3',
        '4':'number 4',
        '5':'number 5',
        '6':'number 6',
        '7':'number 7',
        '8':'number 8',
        '9':'number 9',
    }
    return mapKey[keyValue];
}
function addListeners(value){
     const queryClass = getSelectorButton(value)
    if(queryClass){
        const found = document.getElementsByClassName(queryClass);
        if(found.length>0){
            found.item(0).addEventListener('click',()=>{
                calcPress(value);
            });
        }
    }
}

const datos = {
    result:0,
    operator:'',
    number1:0,
    number2:0,
    text:'0',
    lastDigit:'0'
}
const process = (num1, num2, operator)=>{
        if(operator==='+'){
            return num1+num2;
        }
        if(operator==='-'){
            return num1-num2;
        }
         if(operator==='*'){
            return num1*num2;
        }
         if(operator==='/'){
            return num1/num2;
        }
}
const processPrint=()=>{
    if(datos.number2===0 && datos.operator==='/'){
        datos.text = `Error`;
        datos.lastDigit='0';
        datos.number1=0;
        datos.number2=0;
        datos.result=0;
        datos.operator='';
    }else{
        datos.result = process(datos.number1, datos.number2,datos.operator);
        datos.text = datos.result;
    }
    print();
}

const print=()=>{
    const display =document.getElementById('display');
    display.textContent = datos.text;
}

function calcPress(value){
    if(Number(value)>=0 || Number(value)<=9){
        if(datos.lastDigit ==='0' && datos.text.length===1){
            datos.text = value;
        }else{
            datos.text += value;
        }
        datos.lastDigit =  value;
        print();
    }
    if(value === '.'){
        if(datos.lastDigit !=='.'){
            datos.lastDigit =  value;
            datos.text += value;
        }
        print();
    }
    if(['+','-','*','/'].includes(value)){
       if(datos.number1 && !datos.number2){
            datos.number2 = Number(datos.text);
            processPrint();
            datos.number1 = datos.result;
            datos.number2 = 0;
            datos.operator =  value;
            datos.lastDigit='0';
            datos.text= '0';
        }
        if(!datos.number1 && !datos.number2 && datos.result){
            datos.number1 = datos.result;
            datos.operator =  value;
        }
        if(!datos.number1 && !datos.number2 && !datos.result){
            datos.number1 = Number(datos.text);
            datos.operator =  value;
            datos.lastDigit ='0';
            datos.text= '0';
        }
    }
    if(value==='='){
        if(datos.number1){
            datos.number2 = Number(datos.text);
            processPrint();
            datos.lastDigit ='0';
            datos.text = '0';
            datos.operator = '';
            datos.number1 = 0;
            datos.number2 = 0;
        }
    }
   if(value==='Delete'){
        if(datos.text.length>1){
            datos.text = datos.text.substring(0 , datos.text.length - 1);
        }else{
            datos.text ='0';
            datos.lastDigit='0';
        }
        print();
    }
    if(value==='Escape'){
        datos.lastDigit='0';
        datos.number1=0;
        datos.number2=0;
        datos.result=0;
        datos.operator='';
        datos.text='0';
        print();
    }
    
}
const input =document.getElementById("selector-theme");
input.addEventListener('change',(event)=>{
    const map={'0':'basic','1':'ligth','2':'contrast'};
    const className = map[event.target.value];
    const body = document.getElementById('calc');
    body.className = "";
    body.classList.add(className);
});

document.addEventListener('keydown',(event)=>{
    const queryClass = getSelectorButton(event.key)
    if(queryClass){
        const button = document.getElementsByClassName(queryClass).item(0);
        button.click();
        button.classList.add('clicked');
        setTimeout(()=>{
            button.classList.remove('clicked');
        },100)
    }
});
addListeners('9');
addListeners('8');
addListeners('7');
addListeners('6');
addListeners('5');
addListeners('4');
addListeners('3');
addListeners('2');
addListeners('1');
addListeners('0');
addListeners('.');
addListeners('+');
addListeners('-');
addListeners('*');
addListeners('/');
addListeners('Delete');
addListeners('Escape');
addListeners('=');


