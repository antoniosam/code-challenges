document.getElementById('card-name').addEventListener('keyup',(event)=>{
    const destiny = document.getElementById('text-name')
    destiny.innerHTML = event.target.value;
});
document.getElementById('card-number').addEventListener('keyup',(event)=>{
    const value = event.target.value;
    const padValue  = value.padStart(16, '0');
    const splitValue  = padValue.match(/.{1,4}/g);
    const destiny = document.getElementById('text-number')
    destiny.innerHTML =  splitValue.join(' ');
});
document.getElementById('card-number').addEventListener('keydown',(event)=>{
    if (event.keyCode > 32 && (event.keyCode < 48 || event.keyCode > 57)) {
     event.preventDefault();
    }
});
document.getElementById('card-month').addEventListener('keydown',(event)=>{
   if (event.keyCode > 32 && (event.keyCode < 48 || event.keyCode > 57)) {
     event.preventDefault();
    }
});
document.getElementById('card-year').addEventListener('keydown',(event)=>{
   if (event.keyCode > 32 && (event.keyCode < 48 || event.keyCode > 57)) {
     event.preventDefault();
    }
});
function parseExpiration(){
    const month = document.getElementById('card-month');
    const year = document.getElementById('card-year');
    const expiration = document.getElementById('text-expiration');
    expiration.innerHTML = month.value.padStart(2, '0') +'/'+ year.value.padStart(2, '0') ;
}
document.getElementById('card-month').addEventListener('keyup',(event)=>{
    parseExpiration();
});
document.getElementById('card-year').addEventListener('keyup',(event)=>{
    parseExpiration();
});
document.getElementById('card-cvc').addEventListener('keyup',(event)=>{
    const destiny = document.getElementById('text-cvc')
    destiny.innerHTML = event.target.value;
});
document.getElementById('card-cvc').addEventListener('keydown',(event)=>{
    if (event.keyCode > 32 && (event.keyCode < 48 || event.keyCode > 57)) {
     event.preventDefault();
    }
})
const form = document.getElementById('form');
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name = document.getElementById('card-name').value;
    const number = document.getElementById('card-number').value;
    const month = document.getElementById('card-month').value;
    const year = document.getElementById('card-year').value;
    const cvc = document.getElementById('card-cvc').value;
    let isValid = true;
    if(!name){
        isValid = false;
        document.getElementById('error-name').classList.add('show');
    }else{
         document.getElementById('error-name').classList.remove('show');
    }
    if(!number || number.length < 16 ){
        isValid = false;
        document.getElementById('error-number').classList.add('show');
    }else{
         document.getElementById('error-number').classList.remove('show');
    }
    if(!month || (month < 1 || month > 12 ) ){
        isValid = false;
        document.getElementById('error-month').classList.add('show');
    }else{
         document.getElementById('error-month').classList.remove('show');
    }
    if(!year || year < 23 ){
        isValid = false;
        document.getElementById('error-year').classList.add('show');
    }else{
         document.getElementById('error-year').classList.remove('show');
    }
    if(!cvc || cvc.length < 3){
        isValid = false;
        document.getElementById('error-cvc').classList.add('show');
    }else{
         document.getElementById('error-cvc').classList.remove('show');
    }
    if(isValid){
        document.getElementById('success').classList.add('show');
        document.getElementById('form').classList.add('hide');
    }
});
const btnNext = document.getElementById('continue');
btnNext.addEventListener('click',(e)=>{
    document.getElementById('success').classList.remove('show');
    document.getElementById('form').classList.remove('hide');
    const form = document.getElementById('form');
    form.reset();
});