/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/differnces.js":
/*!**************************************!*\
  !*** ./src/js/modules/differnces.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Differnces)
/* harmony export */ });
class Differnces {
  constructor(oldOfficer, newOfficer, items) {
    try {
      this.officerold = document.querySelector(oldOfficer);
      this.officernew = document.querySelector(newOfficer);
      this.oldCards = this.officerold.querySelectorAll(items);
      this.newCards = this.officernew.querySelectorAll(items);
    } catch (e) {}
  }
  hideCard(items) {
    items.forEach((item, i, array) => {
      if (i !== array.length - 1) {
        item.style.display = 'none';
        item.classList.add('animated');
      }
    });
  }
  showCards(items, cardContainer) {
    this.trigger = cardContainer.querySelector('.plus');
    let i = 0;
    this.trigger.addEventListener('click', () => {
      if (i < items.length - 2) {
        items[i].style.display = 'flex';
        items[i].classList.add('fadeIn');
        i++;
      } else {
        items[i].style.display = 'flex';
        items[i].classList.add('fadeIn');
        items[items.length - 1].style.display = 'none';
      }
    });
  }
  init() {
    try {
      this.hideCard(this.oldCards);
      this.hideCard(this.newCards);
      this.showCards(this.oldCards, this.officerold);
      this.showCards(this.newCards, this.officernew);
    } catch (e) {}
  }
}

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Form)
/* harmony export */ });
class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.message = {
      success: 'отправка завершена!',
      loading: 'загрузка',
      failure: 'ошибка отправки данных'
    };
    this.path = '../assets/question.php';
  }
  async postData(url, data) {
    let response = await fetch(url, {
      method: 'POST',
      body: data
    });
    return await response.text();
  }
  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        let modalStatus = document.createElement('div');
        modalStatus.classList.add('animated', 'fadeIn');
        modalStatus.style.cssText = `
                    width: 200px;
                    height: 200px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #000;
                    color: #fff;
                    border-radius: 10px;
                     
                    display: flex;
                    justify-content: center;
                    align-items: center;
                `;
        modalStatus.textContent = this.message.loading;
        form.append(modalStatus);
        const formData = new FormData(form);
        this.postData(this.path, formData).then(response => {
          console.log(response);
          modalStatus.textContent = this.message.success;
          // if (response.status >= 200 && response.status <= 300) {
          //     modalStatus.textContent = this.message.success;
          // } else {
          //     let err = new Error(response.statusText);
          //     console.log(err);
          //     throw err;
          // }
        }).catch(error => {
          console.log(error);
          modalStatus.textContent = this.message.failure;
        }).finally(() => {
          setTimeout(() => {
            modalStatus.classList.add('fadeOut');
            setTimeout(() => modalStatus.remove(), 2000);
          }, 3000);
        });
      });
    });
  }
}

/***/ }),

/***/ "./src/js/modules/playVideo.js":
/*!*************************************!*\
  !*** ./src/js/modules/playVideo.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VideoPlayer)
/* harmony export */ });
class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
  }
  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (document.querySelector('iframe#frame')) {
          this.overlay.style.display = 'flex';
        } else {
          const path = btn.getAttribute('data-url');
          this.createPlayer(path);
        }
      });
    });
  }
  bindCloseBtn() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
  }
  createPlayer(url) {
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`
    });
    console.log(this.player);
    this.overlay.style.display = 'flex';
  }
  init() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    this.bindTriggers();
    this.bindCloseBtn();
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-main.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-main.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(btns) {
    super(btns);
  }
  showSlides(n) {
    try {
      if (n > this.slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = this.slides.length;
      }
      try {
        this.hanson.style.opacity = 0;
        if (n === 3) {
          this.hanson.classList.add('animated');
          setTimeout(() => {
            this.hanson.style.opacity = 1;
            this.hanson.classList.add('slideInUp');
          }, 3000);
        } else {
          this.hanson.classList.remove('slideInUp');
        }
      } catch (e) {}
      this.slides.forEach(slide => {
        slide.style.display = 'none';
      });
      this.slides[this.slideIndex - 1].style.display = 'block';
    } catch (e) {}
  }
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  bindTriggers() {
    this.btns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        this.plusSlides(1);
      });
      btn.parentNode.previousElementSibling.addEventListener('click', e => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });
    document.querySelectorAll('.prevmodule').forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(-1);
      });
    });
    document.querySelectorAll('.nextmodule').forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        this.plusSlides(-1);
      });
    });
  }
  render() {
    if (this.container) {
      try {
        this.hanson = document.querySelector('.hanson');
      } catch (e) {}
      this.showSlides(this.slideIndex);
      this.bindTriggers();
    }
  }
}

/***/ }),

/***/ "./src/js/modules/slider/slider-mini.js":
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-mini.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MiniSLider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MiniSLider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
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

/***/ }),

/***/ "./src/js/modules/slider/slider.js":
/*!*****************************************!*\
  !*** ./src/js/modules/slider/slider.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
  constructor() {
    let {
      container = null,
      btns = null,
      next = null,
      prev = null,
      activeClass = '',
      animate,
      autoPlay
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.container = document.querySelector(container);
    try {
      this.slides = [...this.container.children];
    } catch (e) {}
    ;
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoPlay = autoPlay;
    this.slideIndex = 1;
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider/slider-main */ "./src/js/modules/slider/slider-main.js");
/* harmony import */ var _modules_playVideo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/playVideo */ "./src/js/modules/playVideo.js");
/* harmony import */ var _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider/slider-mini */ "./src/js/modules/slider/slider-mini.js");
/* harmony import */ var _modules_differnces__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/differnces */ "./src/js/modules/differnces.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./src/js/modules/form.js");





window.addEventListener('DOMContentLoaded', () => {
  const slider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    btns: '.next',
    container: '.page'
  });
  slider.render();
  const modulePageSlider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: '.moduleapp',
    btns: '.next'
  });
  modulePageSlider.render();
  const showUpSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.showup__content-slider',
    prev: '.showup__prev',
    next: '.showup__next',
    activeClass: 'card-active',
    animate: true
  });
  showUpSlider.init();
  const modulesSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.modules__content-slider',
    prev: '.modules__info-btns .slick-prev',
    next: '.modules__info-btns .slick-next',
    activeClass: 'card-active',
    animate: true,
    autoPlay: 5000
  });
  modulesSlider.init();
  const feedSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_2__["default"]({
    container: '.feed__slider',
    prev: '.feed__slider .slick-prev',
    next: '.feed__slider .slick-next',
    activeClass: 'feed__item-active'
  });
  feedSlider.init();
  const player = new _modules_playVideo__WEBPACK_IMPORTED_MODULE_1__["default"]('.showup .play', '.overlay');
  player.init();
  const differnces = new _modules_differnces__WEBPACK_IMPORTED_MODULE_3__["default"]('.officerold', '.officernew', '.officer__card-item');
  differnces.init();
  const form = new _modules_form__WEBPACK_IMPORTED_MODULE_4__["default"]('form');
  form.init();
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map