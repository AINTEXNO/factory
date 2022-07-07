
function objectLength (object) {
    let counter = 0;
    for(let i in object) { counter++ }
    return counter;
}

function isElementInViewport (el) {
    let rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

function numberLength (number) {
    const value = String(number).length;
    let result = null;

    if(value == 2) 
        result = {
            number: 10,
            time: 200
        };
    else if(value == 3) 
        result = {
            number: 100,
            time: 55
        };
    else if(value == 4) 
        result = {
            number: 1000,
            time: 70
        };

    return result;
}

function timer(element, offset) {
    let firstCounter = 0;
    localStorage.setItem('timer', true);

    time = 0;
    let functionResult = numberLength(offset);

    setInterval(() => {
        if(firstCounter < offset) {
            firstCounter += functionResult.number / 10;
            element.firstElementChild.innerHTML = firstCounter;
        }
    }, functionResult.time);
}

const slides =  {
    1: {
        title: 'ЗТЗ - самый современный трубный завод России',
        subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum sapiente eligendi ea dolore commodi illo velit, alias adipisci.',
        image: 'main.jpg'
    },
    2: {
        title: 'Лучшая инфраструктура среди предприятий России',
        subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum sapiente eligendi ea dolore commodi illo velit, alias adipisci.',
        image:  'main-2.jpg'
    },
    3: {
        title: 'Увеличение производственной мощности',
        subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum sapiente eligendi ea dolore commodi illo velit, alias adipisci.',
        image:  'main-3.jpg'
    }
}

localStorage.getItem('timer') ? localStorage.removeItem('timer') : localStorage.setItem('timer', false);

const header = document.querySelector('.header');
const title = document.querySelector('.header-content__title');
const subtitle = document.querySelector('.header-content__description');
const scrollMenu = document.querySelector('.scroll-menu');
const counterElement = document.querySelector('.counter');
const scrollElement = document.querySelector('.to-top');
const links = document.querySelectorAll('.menu__item');
const modal = document.querySelector('.modal-window');
const side = document.querySelector('.side-menu');

let counter = 1;

if(title && subtitle) {
    header.style.background = "linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)), url('./img/" + slides[1].image + "')";
    title.innerHTML = slides[1].title;
    subtitle.innerHTML = slides[1].subtitle;
}

header.addEventListener('click', (event) => {
    const target = event.target;

    if(target.closest('#prev-btn')) {
        if(counter == 1)
            counter = objectLength(slides);
        else 
            counter--;
    }

    if(target.closest('#next-btn')) {
        if(counter == objectLength(slides)) 
            counter = 1;
        else 
            counter++;
    }

    header.style.background = "linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .6)), url('./img/" + slides[counter].image + "')";
    title.innerHTML = slides[counter].title;
    subtitle.innerHTML = slides[counter].subtitle;
})

document.addEventListener('click', (event) => {
    const target = event.target;

    if(target.closest('#login')) {
        modal.classList.add('modal-window--active');
    }

    if(target.closest('.modal-window') && !target.closest('.modal-form')) {
        modal.classList.remove('modal-window--active');
    }

    if(target.closest('.side-btn')) {
        side.classList.add('side-menu--active');
    }

    if(target.closest('.close-btn') || (!target.closest('.side-btn') && !target.closest('.side-menu')) || target.closest('.side-menu__item')) {
        side.classList.remove('side-menu--active');
    }
})

document.addEventListener('scroll', () => {
    if(scrollMenu) {
        if(window.pageYOffset > document.documentElement.clientHeight - 100 ) {
            scrollMenu.classList.add('scroll-menu--active');
        }
        else {
            scrollMenu.classList.remove('scroll-menu--active');
        }
    }
    if(window.pageYOffset > 150) 
        scrollElement.classList.add('to-top--active');
    else
        scrollElement.classList.remove('to-top--active');

    if(( counterElement ? isElementInViewport(counterElement) : null ) && localStorage.getItem('timer') != 'true') {
        const elements = counterElement.firstElementChild.children;

        const values = {
            1: 570,
            2: 4600,
            3: 16, 
            4: 16
        }

        for(let i in values) {
            timer(elements[i - 1], values[i]);
        }
    }
})