
import Slider from "./slider";

export default class MiniSLider extends Slider {
    constructor(container, prev, next, activeClass, animate, autoPlay) {
        super(container, prev, next, activeClass, animate, autoPlay);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0.4';
            }
        });


        if (this.slides[0].tagName != 'BUTTON') {
            this.slides[0].classList.add(this.activeClass);
        }
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());
        this.prev.addEventListener('click', () => this.prevSlide());
    }

    nextSlide() {
        this.container.append(this.slides[0]); //добавляем первый элемент в конец контейнера на странице
        this.slides.push(this.slides[0]); //добавляем первый элемент в конец массива
        this.slides.shift(); // удаляем первый элемент из массива, чтобы он не дублировался
        this.decorizeSlides();
    }

    prevSlide() {
        let active = this.slides[this.slides.length - 1]; 
        this.container.prepend(active); // добавляем последний элемент в начало контейнера на странице
        this.slides.unshift(active); // добавляем последний элемент в начало массива
        this.slides.pop(); // удаляем последний элемент из массива, чтобы он не дублировался
        this.decorizeSlides();
    }

    autoPlaySlider() {
        const play = setInterval(() => this.nextSlide(), +this.autoPlay);

        this.container.addEventListener('mouseover', () => clearInterval(play));
        this.prev.addEventListener('mouseover', () => clearInterval(play));
        this.next.addEventListener('mouseover', () => clearInterval(play));
    }

    ContinueAutoPlay() {
        this.container.addEventListener('mouseout', () => this.autoPlaySlider());
        this.prev.addEventListener('mouseout', () => this.autoPlaySlider());
        this.next.addEventListener('mouseout', () => this.autoPlaySlider());
    }


    init() {
        try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();

        if (this.autoPlay) {
            this.autoPlaySlider();
            this.ContinueAutoPlay();
        }
        } catch (e) {}
    }
}