import variables from './variables.js'
import {data} from './data.js'
const {shopContent, moreBtn, closeCartBtn, cartBtn, cart, removeCartBtns, totalPrice, cartBoxes, cartContent, quantityInputs, addCarts, buyBtn} = variables

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
        ready()
    })

}
moreCards()


cartBtn.addEventListener('click', () => cart.classList.toggle('active'))
closeCartBtn.addEventListener('click', () => cart.classList.remove('active'))

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    //remove items from cart
    for (let i = 0; i < removeCartBtns.length; i++) {
        let button = removeCartBtns[i]
        console.log(button)
        button.addEventListener('click', removeCartItem)
    }
    // change quantity
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    // add to cart
    for (const i of addCarts) {
        let button = i
        button.addEventListener('click', addCartClicked)
    }

    // buy button work
    buyBtn.addEventListener('click', buyButtonClicked)
}

function buyButtonClicked() {
    alert(`Your order is placed: ${totalPrice.textContent}`)
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}

function removeCartItem(event) {
    let button = event.target
    button.parentElement.remove()
    updateTotal()
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
}

// add to cart
function addCartClicked(event) {
    let button = event.target
    let shopCards = button.parentElement
    let title = shopCards.getElementsByClassName('shop-card__title')[0].innerText
    let price = shopCards.getElementsByClassName('shop-card__price')[0].innerText
    let img = shopCards.getElementsByClassName('shop-card__img')[0].src
    addProductTo(title, price, img)
    updateTotal()
}

function addProductTo(title, price, img) {
    let cartItemsNames = cartContent.getElementsByClassName('cart__product-title')
    let cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart__box')
    for (const item of cartItemsNames) {
        if (item.innerText == title) {
            alert('You have already add this item to cart =)')
            return
        }
    }
    let cartBoxContent = `
        <img src="${img}" class="cart__img"></img>
        <div class="cart__details">
            <div class="cart__product-title">${title}</div>
            <div class="cart__price">${price}</div>
            <input type="number" value="1" min="0" class="cart__quantity">
        </div>
        <i class="fa-solid fa-trash cart__remove"></i>
    `
    cartShopBox.innerHTML = cartBoxContent
    cartContent.append(cartShopBox)
    cartShopBox.getElementsByClassName('cart__remove')[0].addEventListener('click', removeCartItem)
    cartShopBox.getElementsByClassName('cart__quantity')[0].addEventListener('click', quantityChanged)
}

function updateTotal() {
    let total = 0
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i]
        let priceElement = cartBox.getElementsByClassName('cart__price')[0]
        let quantityElement = cartBox.getElementsByClassName('cart__quantity')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ' ')) // delete $
        let quantity = quantityElement.value
        total += price * quantity
        total = Math.round(total*100)/100
    }
    totalPrice.innerText = total + '$'
}

updateTotal()
