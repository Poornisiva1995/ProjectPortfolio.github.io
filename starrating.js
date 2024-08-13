let radioElement = document.querySelectorAll('input');
let rating = document.querySelector('.rating-value');

radioElement.forEach((radio)=>{
    radio.addEventListener('click',()=>{
        let value = radio.value;
        rating.innerText = `${value} of 5`;
    })
});