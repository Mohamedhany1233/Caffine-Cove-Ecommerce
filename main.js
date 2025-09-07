const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.querySelector('i').classList.toggle('fa-bars');
    hamburger.querySelector('i').classList.toggle('fa-times');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.add('fa-bars');
        hamburger.querySelector('i').classList.remove('fa-times');
    });
});

let DataCards = []
let DataItemCart = []
let all = document.querySelector('.all-columns')
let IdCount = 1

function CreateCard(imgSource,h4T,p,price,Quantity) {
    let Card = {
        id:IdCount++,
        imgSrc:imgSource,
        h4:h4T,
        pT:p,
        Price: price,
        cardQuantity: Quantity || 0
    }
    DataCards.push(Card)
    ShowCard()
}

function ShowCard() {
    //content-box Div
    all.innerHTML = ''
    DataCards.forEach(function(ele){
        let contentBox = document.createElement('div')
        contentBox.classList.add('content-box')
        contentBox.setAttribute('data-id', ele.id)
        //img
        let img =  document.createElement('img')
        img.src = ele.imgSrc
        contentBox.appendChild(img)
        //content-text
        let contentText = document.createElement('div')
        contentText.classList.add('content-text')
        let h4T = document.createElement('h4')
        h4T.appendChild(document.createTextNode(ele.h4))
        contentText.appendChild(h4T)
        let pT = document.createElement('p')
        pT.appendChild(document.createTextNode(ele.pT))
        contentText.appendChild(pT)
        contentBox.appendChild(contentText)
        //content-price
        let contentPrice = document.createElement('div')
        contentPrice.classList.add('content-price')
        let pPrice = document.createElement('p')
        pPrice.appendChild(document.createTextNode(ele.Price))
        contentPrice.appendChild(pPrice)
        contentBox.appendChild(contentPrice)
        //quantity
        let quantity = document.createElement('h3')
        quantity.appendChild(document.createTextNode(`quantity : ${ele.cardQuantity}`))
        quantity.classList.add('quantity')
        contentPrice.appendChild(quantity)
        //put content-box in All
        all.appendChild(contentBox)
        //btn
        let btn = document.createElement('button')
        btn.appendChild(document.createTextNode('Add To Cart'))
        contentBox.appendChild(btn)
    })
    
}

CreateCard('Images/menu-1.png','Espresso','A strong, rich coffee made by forcing hot water through finely-ground coffee beans.','$2.99')
CreateCard('Images/menu-2.png','Americano','Espresso mixed with hot water for a smoother, milder flavor.','$3.49')
CreateCard('Images/menu-4.png','Latte','A shot of espresso combined with steamed milk and finished with a thin, velvety layer of foam.','$4.50')
CreateCard('Images/menu-5.png','Mocha',' Espresso with chocolate syrup, steamed milk, and whipped cream.','$4.95')
CreateCard('Images/menu-6.png','Flat White',' Similar to a latte but with higher ratio of espresso to steamed milk.','$4.25')
CreateCard('Images/menu-7.png','Cortado','A perfect balance of espresso and warm milk, reducing acidity.','$3.75')
CreateCard('Images/menu-8.png','Matcha Latte','Sweet blend of matcha green tea, steamed milk, and sweetness.','$4.75')

let cart = document.querySelector('.Cart')
let cartContainer = document.querySelector('.cart-container')
let cartCounter = document.getElementById('CartCounter')
let CartsItem = document.querySelector('.carts-item')
let CloseCart = document.querySelector('.close-cart')
const overlay = document.getElementById("overlay");

cart.onclick = function () {
    cartContainer.classList.toggle('showed');
    overlay.classList.toggle('active');
}

CloseCart.onclick = function() {
    cartContainer.classList.remove('showed');
    overlay.classList.remove('active');
}

overlay.onclick = function() {
    cartContainer.classList.remove('showed');
    overlay.classList.remove('active');
}

function CreateCartItem(CartId,CartImg,Cartname,CartPrice,quantity) {
    let CartItem = {
        CartItemId :CartId,
        CartItemImg:CartImg,
        CartItemName:Cartname,
        CartItemPrice:CartPrice,
        quantity:quantity || 1,
    }
    
    DataItemCart.push(CartItem)
    showCartItem()
}

function showCartItem() {
    CartsItem.innerHTML = ''
    DataItemCart.forEach( ele => {
        let cartItem = document.createElement('div')
        cartItem.classList.add('cart-item')
        //img of CartItem
        let CartImg = document.createElement('img')
        CartImg.src = ele.CartItemImg
        cartItem.appendChild(CartImg)
        //Cart-Info
        let CartInfo = document.createElement('div')
        CartInfo.classList.add('info')
        cartItem.appendChild(CartInfo)
        //cartInfo h3
        let CartInfoH3 = document.createElement('h3')
        CartInfoH3.appendChild(document.createTextNode(ele.CartItemName))
        CartInfo.appendChild(CartInfoH3)
        //controls div
        let Cartcontrols = document.createElement('div')
        Cartcontrols.setAttribute('data-id', ele.CartItemId)
        Cartcontrols.classList.add('controls')
        CartInfo.appendChild(Cartcontrols)
        //controls btn -
        let controlsDecreament = document.createElement('button')
        controlsDecreament.className = 'decreament'
        controlsDecreament.appendChild(document.createTextNode('-'))
        Cartcontrols.appendChild(controlsDecreament)
        //quantity
        let quantity = document.createElement('span')
        quantity.classList.add('quantity')
        quantity.appendChild(document.createTextNode(ele.quantity))
        Cartcontrols.appendChild(quantity)
        //controls btn +
        let controlsIncreament = document.createElement('button')
        controlsIncreament.className = 'increament'
        controlsIncreament.appendChild(document.createTextNode('+'))
        Cartcontrols.appendChild(controlsIncreament)
        //price
        let price =  document.createElement('p')
        price.classList.add('price')
        price.appendChild(document.createTextNode(ele.CartItemPrice))
        Cartcontrols.appendChild(price)
        //add new item
        CartsItem.appendChild(cartItem)

        //increament        
        controlsIncreament.addEventListener('click', () => {
        ele.quantity++
            GetTotalPrice()
            setCartItemInLS()
            updateCardsAndShow()
            ShowCard()
            delAndCheck()
        })
        //decreament
        controlsDecreament.addEventListener('click', () => {
        if (ele.quantity > 1) {
            ele.quantity--
            GetTotalPrice()
            setCartItemInLS()
            updateCardsAndShow() 
            delAndCheck()
        } 
        else {
            DataItemCart = DataItemCart.filter(item => item.CartItemId !== ele.CartItemId)
            GetTotalPrice()
            delAndCheck()
            updateCardsAndShow()
        }
        setCartItemInLS()
        CartCount()
        })
    })
}

function CartCount() {
    cartCounter.innerHTML = DataItemCart.length ;
    localStorage.setItem('CartCount' , JSON.stringify(DataItemCart.length))
}

if (localStorage.getItem('CartItems')) {
    DataItemCart = JSON.parse(localStorage.getItem('CartItems'))
    showCartItem()
}

function setCartItemInLS() {
    localStorage.setItem('CartItems' , JSON.stringify(DataItemCart))
    showCartItem()
}

if (localStorage.getItem('CartCount')) {
    cartCounter.innerHTML = localStorage.getItem('CartCount') 
}


function cardsQuan() { 
    DataCards.forEach(cards => {
        let cartItem = DataItemCart.find(itemCart => itemCart.CartItemId == cards.id);
        cards.cardQuantity = cartItem ? cartItem.quantity : 0;
    });
}
cardsQuan();

function updateCardsAndShow() {
    cardsQuan();
    ShowCard();
    bindAddToCartEvents();
}

function bindAddToCartEvents() {
    let AddToCartBTNS =  document.querySelectorAll('.all-columns .content-box button');
    AddToCartBTNS.forEach(function (btns) {
        btns.addEventListener('click', (e) => {
            let TargetId = e.target.parentElement.getAttribute('data-id');
            let product = DataCards.find(item => item.id == TargetId);
            let check = DataItemCart.find(ele => ele.CartItemId == TargetId);
            if (check) {
                check.quantity++;
                setCartItemInLS();
            } 
            else if (product) {
                CreateCartItem(product.id,product.imgSrc, product.h4, product.Price, );
                CartCount();
                setCartItemInLS();
            }
            updateCardsAndShow();
            GetTotalPrice();
            delAndCheck()
        });
    });
}

updateCardsAndShow();

let totalPrice = document.querySelector('.total')

if (localStorage.getItem('TotalPrice')) {
    totalPrice.innerHTML = '$' + JSON.parse(localStorage.getItem('TotalPrice'))
}

function GetTotalPrice() {
    let sum = 0;
    DataItemCart.forEach(ele => {
        let prices = parseFloat(ele.CartItemPrice.replace(/^\D/g, ""));
        sum += prices * ele.quantity;
    });
    totalPrice.innerHTML = `$${sum.toFixed(2)}`;
    localStorage.setItem('TotalPrice', JSON.stringify(sum.toFixed(2)));
}

let checkout = document.querySelector('.checkout')
let deleteAll = document.querySelector('.deleteAll')

function delAndCheck() {
if (DataItemCart.length > 0) {
    checkout.style.display = 'block'
    deleteAll.style.display = 'block'
}
else{
    deleteAll.style.display = 'none'
    checkout.style.display = 'none'
    showCartItem()
}

deleteAll.onclick = function() {
    CartsItem.innerHTML = ''
    totalPrice.innerHTML = '$0'
    cartCounter.innerHTML = ''
    localStorage.clear()
    location.reload()
}
}
