export default class Differnces {
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
        })
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