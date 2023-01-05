const ratingOptions = document.querySelectorAll('.rating-option');
const submitBtn = document.querySelector('.submit-btn');
const ratingSubmitErrorText = document.querySelector('.rating-submit-error');

let rating = -1;


function initialSetup() {
    for (let i = 0; i < ratingOptions.length; i++) {
        const option = ratingOptions[i];
        option.dataset.value = i+1;
        option.addEventListener('click', () => setRating(option));
    }
    submitBtn.addEventListener('click', () => submitRating());
}

function setRating(ratingOption) {
    const ratingValue = ratingOption.dataset.value;

    if (isNaN(ratingValue)) return;

    removeActiveState();
    ratingOption.classList.add('active');
    rating = Number(ratingValue);
}

function submitRating() {
    if (rating < 0) {
        ratingSubmitErrorText.classList.remove('hide');
        return;
    }
    
    hideRatingCard();
    showThankyouCard();
}

function hideRatingCard() {
    const ratingCard = document.querySelector('.rating-card');
    ratingCard.classList.add('hide');
}

function showThankyouCard() {
    const thankyouCard = document.querySelector('.thankyou-card');
    const thankyouRating = document.querySelector('.thankyou-rating');
    thankyouCard.classList.remove('hide');

    thankyouRating.textContent = `You selected ${rating} out of 5`;
}

function removeActiveState() {
    ratingOptions.forEach((option) => {
        if (option.classList.contains('active')) {
            option.classList.remove('active');
            return;
        }
    })
}

initialSetup();