let menu = [{
    'name': 'Toptrainerbox Silberne Sturmwinde',
    'description': 'Box bestehend aus 8 Boostern, Schutzhüllen, Spielmakern und Regelheft.',
    'price': 49.95,
    'category': 'Toptrainerboxen',
    'image': './img/S-SETB.png',

},
{
    'name': 'Display Pokemon 151',
    'description': 'Displaybox mit 36 Boostern des Sammelkartenspieles Pokemon 151.',
    'price': 149.99,
    'category': 'Display',
    'image': './img/151Display.webp',

},
{
    'name': 'Pokemon Obsidian Flammen Booster',
    'description': 'Ein Booster mit 10 Spielkarten.',
    'price': 5.99,
    'category': 'Booster',
    'image': './img/ofBooster.jpg',

},
{
    'name': 'Display Pokemon Obsidian Flammen',
    'description': 'Displaybox mit 36 Boostern des Sammelkartenspieles Pokemon Obsidian Flammen.',
    'price': 149.99,
    'category': 'Display',
    'image': './img/ofDisplay.jpg',

},
{
    'name': 'Pokemon Paradox Rift Booster',
    'description': 'Ein Booster mit 10 Spielkarten.',
    'price': 5.99,
    'category': 'Booster',
    'image': './img/prBooster.jpg',

},
];

let basket = []
let prices = []
let amounts = []
let images = []




function showMenu() {
    document.getElementById('order-content').innerHTML = '';

    for (let i = 0; i < menu.length; i++) {
        const menus = menu[i];

        document.getElementById('order-content').innerHTML += /* html */ `
        <div class="menu">
            <img class="menuImg" src="${menus['image']}" alt="">
            <div class="product">
                <h2>${menus['name']}</h2>
                <span>${menus['description']}</span>
                <span class="price" >${menus['price'].toFixed(2)}€</span>
            </div>
            <img class="plussymbol" onclick="addToBasket(${i})" src="./img/plus.svg" alt="Hinzufügen">
        </div>
        `;
    }


    displayTotalAmount();
}


function showBasket() {
    document.getElementById('basket').innerHTML = '';


    for (let i = 0; i < basket.length; i++) {

        let subtotal = prices[i] * amounts[i];

        document.getElementById('basket').innerHTML += /*html*/`
        
        <div class="order">
            <div class="amount-basket-subtotal">
                <div><b>${amounts[i]}x</b></div>
                <div class="productName">${basket[i]}</div>
                <div>${subtotal.toFixed(2)}€</div>
            </div>
            <div class="edit">
                <img class="edit-button" onclick="decreaseAmount(${i})" src="./img/minus.svg" alt=""> </button>
                <img class="menuImgsmall" src="${images[i]}" alt="">
                <img class="edit-button" onclick="increaseAmount(${i})" src="./img/plus.svg" alt=""> </button>
            </div>
        </div>
        `;
    }

    displayTotalAmount();
}


function calculateTotalAmount() {
    let totalAmount = 0;

    for (let i = 0; i < basket.length; i++) {
        totalAmount += prices[i] * amounts[i];
    }
    return totalAmount;
}

function displayTotalAmount() {
    console.log('displayTotalAmount() wurde aufgerufen');
    let totalAmount = calculateTotalAmount();
    let delivery = 2.50;

    if (totalAmount == 0) {
        document.getElementById('total-amount').innerHTML = `
        <div class="empty-message-div">
            <div class="empty-message">Bitte wählen sie Produkte, <br> die sie in den Warenkorb legen wollen.</div>
            
        </div>
        `;
    } else {
        document.getElementById('total-amount').innerHTML = /*html*/`
            
        <div class="total-amount">
            <span> Zwischensumme: ${totalAmount.toFixed(2)}€ </span>
            <span> Lieferung: Kostenlos </span>
            <span> Gesamtsumme: ${totalAmount.toFixed(2)}€ </span>
        </div>
        <div class="orderButton"><button class="orderButtonStyle" onclick="sendOrder(); showPopup()" >Bestellen</button></div>
        `;
    }
}

function increaseAmount(i) {
    amounts[i]++;
    showBasket();
}
function decreaseAmount(i) {
    if (amounts[i] > 0) {
        amounts[i]--;

        if (amounts[i] === 0) {
            basket.splice(i, 1);
            prices.splice(i, 1);
            amounts.splice(i, 1);
            images.splice(i, 1);
        }
    }
    showBasket();
}

function addToBasket(i) {
    let index = basket.indexOf(menu[i]['name']);

    if (index == -1) {
        basket.push(menu[i]['name']);
        prices.push((menu[i]['price'].toFixed(2)));
        amounts.push(1);
        images.push(menu[i]['image']);
    } else {
        amounts[index]++;
    }

    showBasket();
}


window.onscroll = function() {
    let basket2 = document.getElementById('basket2');
    
    if(window.scrollY > 120) {
        basket2.style = 'top: 0'

    }else {
        basket2.style = 'top: 130'
        

    }


};

function sendOrder(i){
    basket.splice(i);
    prices.splice(i);
    amounts.splice(i);
    images.splice(i);

    showBasket();
    


}

function showPopup() {
    paypopup.style.display = 'flex';
    document.getElementById('paypopup').innerHTML = /* html */ `
    <div id="popB" class="popupBackground" >
        <div class="open-pay-popup">
            <h2>Vielen Dank für ihre Bestellung</h2>
            <img class="pikachu" src="./img/pikachu.png" alt="">
        </div>
    </div>
    `;
}

function closePopup(){
    paypopup.style.display = 'none';



}

function showBasketmobile() {
    document.getElementById('basket2').classList.add('show-overlay-menu');
    document.getElementById('hide-Menu').classList.remove('d-none');
}

function hideBasket() {
    document.getElementById('basket2').classList.remove('show-overlay-menu');
    document.getElementById('hide-Menu').classList.add('d-none');
}

