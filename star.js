const stars = document.querySelectorAll('.star');
const current_rating = document.querySelector('.current-rating');

stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        const current_star = index + 1;
        current_rating.innerText = `${current_star} of 5`;

        stars.forEach((star, i) => {
            star.innerHTML = i < current_star ? '&#9733;' : '&#9734;';
        });
    });
});

