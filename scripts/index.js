import variables from './variables.js'
import {data} from './data.js'
const {shopContent, navBasket} = variables

const toHTML = card => `
<div class = "shop-card"> 
    <img src="${card.url}" alt="${card.title}" class="shop-card__img">
    <h2 class="shop-card__title">${card.title}</h2>
    <span class="shop-card__price">${card.price}$</span>
    <i class="fa-solid fa-basket-shopping shop-card__basket"></i>
</div>`

const renderCards = () => {
    const html = data.map(i => toHTML(i)).join('')
    console.log(html)
    shopContent.innerHTML = html
}

renderCards()