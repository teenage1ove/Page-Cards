import variables from './variables.js'
import {data} from './data.js'
const {shopContent, navBasket, moreBtn} = variables

const toHTML = card => `
<div class = "shop-card ${card.show}"> 
    <img src="${card.url}" alt="${card.title}" class="shop-card__img">
    <h2 class="shop-card__title">${card.title}</h2>
    <span class="shop-card__price">${card.price}$</span>
    <i class="fa-solid fa-basket-shopping shop-card__basket"></i>
</div>`

const renderCards = () => {
    const html = data.map(i => toHTML(i)).join('')
    shopContent.innerHTML = html
}

let cards = 8

const showCards = (show) => {
    if (window.innerWidth <= 990) cards = 9
    if (window.innerWidth <= 740) cards = 8
    for (let i = cards; i < data.length; i++) {
        data[i].show = show
    }
    renderCards()
}

const moreCards = () => {
    if (data.length > cards) {
        moreBtn.classList.add('active')
        showCards('none')
    }

    moreBtn.addEventListener('click', () => {
        showCards('active')
        moreBtn.classList.remove('active')
    })

}
moreCards()


