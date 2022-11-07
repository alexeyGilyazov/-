'use strict'

const data = [
    {
        id: 1,
        name: 'Коптильня 10л',
        price: 1200,
        img: 'images/dist/p1.png'
    },
    {
        id: 2,
        name: 'Коптильня 20л',
        price: 1400,
        img: 'images/dist/p2.jpeg'
    },
    {
        id: 3,
        name: 'Коптильня 30л',
        price: 1600,
        img: 'images/dist/p3.jpeg'
    },
]

const productName = document.querySelectorAll('.b-product__heading');
const productPrice = document.querySelectorAll('.b-product__price');
const productImg = document.querySelectorAll('.b-product__img');

function space(a){
    var point = "";
    //Пока удаляю, но сохраняю целую часть...
    var x = String(a).replace(/(\.|,)\d+/, function(m){ point = m; return ""; });
    
    x = x.split("").reverse().join("")
        .replace(/(\d{3})/g,"$1 ")
        .split("").reverse().join("");
    //Разбил в массив, перевернул, расставил пробелы, перевернул обратно.
    return x + point;
}

for (let i = 0; i < productName.length; i++) {
    productName[i].innerHTML = data[i].name;
    productPrice[i].innerHTML = data[i].price.toLocaleString('ru-RU') + ' РУБ.';
    productImg[i].setAttribute('src', data[i].img)
}

const products = document.querySelectorAll("[data-type='product']");
const summ = document.querySelector('[data-type="summ"]');
let summa = 0;
const add_to_cart = (element) => {
    const btn = element.querySelector("[data-type='add_btn']");
    const btn_title = element.querySelector("[data-type='btn-title']");
    const product_price = parseInt(element.querySelector('[data-type="price"]').innerHTML.replace(/&nbsp;/gi, '', ' РУБ.'));
    
    if (element.getAttribute('data-incart') === '0') {
        element.setAttribute('data-incart', '1');
        btn_title.innerHTML = 'ДОБАВЛЕНО';
        btn.classList.add('is_cart');
        summa = summa + product_price;
        summ.innerHTML = summa.toLocaleString('ru-RU');
    } else if (element.getAttribute('data-incart') === '1') {
        element.setAttribute('data-incart', '0');
        summ.innerHTML = parseInt(summ.innerHTML) - product_price;
        console.log(summ.innerHTML);
        btn_title.innerHTML = 'ДОБАВИТЬ В КОРЗИНУ';
        btn.classList.remove('is_cart');
    }
}

[].map.call(products, (product, value) => {
    const add_btn = product.querySelector("[data-type='add_btn']");

    add_btn.addEventListener('click', () => add_to_cart(product), {once: true});
})
    