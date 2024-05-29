module.exports = () => {
    const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    counter = document.querySelector(".offer__slider-counter"),
    total = counter.querySelector("#total"),
    current = counter.querySelector("#current")

    let slideIndex = 1;

    showSlides(slideIndex);

    if (slides.length < 10){
    total.textContent = "0"+slides.length;
    } else{
    total.textContent = slides.length;
    }

    function showSlides(n){
    if (n > slides.length){
        slideIndex = 1;
    } else if (n < 1){
        slideIndex = slides.length;
    }

    slides.forEach(item => item.style.display = "none");
    slides[slideIndex - 1].style.display = "block";

    if (slideIndex < 10){
        current.textContent = "0"+slideIndex
    } else{
        current.textContent = slideIndex
    }
    }

    function plusSlides(n){
        showSlides(slideIndex += n)
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    })

    next.addEventListener("click", () => {
        plusSlides(1);
    })
}