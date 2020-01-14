$(document).ready(function () {
    goodsInStock();
    lastBuyProduct();
    selectGridListProductAddListener();
    changeGridListProductAfterPageReload();
}
//example jQuery
function goodsInStock ()  {
    $('#bon-stick-cart .bon-stock-countdown').remove();
    let maxQuantity = parseInt($('.bon-stock-countdown').attr("data-max"));
    let quantityProduct = parseInt($('.bon-stock-countdown-counter').text());
    let progressBar = $('.bon-stock-countdown-progress');

    if(quantityProduct < maxQuantity) {
        if (quantityProduct > 0) {
            $(progressBar).css('width', (quantityProduct * 100) / maxQuantity + '%');
        }
    }

    if(quantityProduct > maxQuantity) {
        $(progressBar).css('width', '100%');
    }

    if(quantityProduct <= 0){
        $('.bon-stock-countdown-title').html('<span>No product available!</span>');
        $(progressBar).css('width', '0%');
    }
}

function lastBuyProduct() {
    let customList = $('.product-list');
    if (customList.length) {
        let listItems = $('li', customList);
        if (listItems.length) {
            let index = 1;
            let interval = setInterval(function () {
                if (index < listItems.length) {
                    listItems.removeClass('active-item');
                    $('.product-container').removeClass('active-list');

                }
                if(index == listItems.length) {
                    index = 0;
                    $('.product-container').removeClass('active-list');
                    listItems.removeClass('active-item');
                }
                setTimeout(showProduct, 7000);
                function showProduct () {
                    $('.product-container').addClass('active-list');
                    listItems.eq(index).addClass('active-item');
                    index++;
                }
            }, 15000);
            $('.close-popup').on('click', function (){
                clearInterval(interval);
                $('.product-container').removeClass('active-list');
            })

        }
    }
}

//example Js

function selectGridListProductAddListener() {
    let buttonsChange = document.querySelectorAll("[class^=\'grid-\']");
    buttonsChange.forEach(element => element.addEventListener("click", enableEventListenerOnGrid, false));
}


function enableEventListenerOnGrid() {
    let productList = document.querySelectorAll('#category .product-miniature');
    productList.forEach(element => element.setAttribute('class', 'revealOnScroll animated fadeInUp product-miniature js-product-miniature'));

    if(event.target.classList.contains('grid-to-1')){
        gridToOne(productList);
    }

    if(event.target.classList.contains('grid-to-2')){
        gridToTwo(productList);
    }

    if(event.target.classList.contains('grid-to-3')){
        gridToThree(productList);
    }

    if(event.target.classList.contains('grid-to-4')){
        gridToFour(productList);
    }
}


function gridToOne(productList) {
    productList.forEach(element => element.classList.add('col-xs-12', 'col-sm-12','col-lg-12', 'sort-to-one'));
    let thumbnailArray = document.querySelectorAll('.thumbnail-container');
    thumbnailArray.forEach((element => element.classList.remove('with_thumb')));
    localStorage.clear();
    localStorage.setItem('grid', 'grid-1');
}

function gridToTwo(productList) {
    productList.forEach(element => element.classList.add('col-xs-12', 'col-sm-6','col-lg-6', 'sort-to-two'));
    localStorage.clear();
    localStorage.setItem('grid', 'grid-2');
    addThumbnails();
}

function gridToThree(productList) {
    productList.forEach(element => element.classList.add('col-xs-12', 'col-sm-6','col-lg-4', 'sort-to-three'));
    localStorage.clear();
    localStorage.setItem('grid', 'grid-3');
    addThumbnails();
}

function gridToFour(productList) {
    productList.forEach(element => element.classList.add('col-xs-12', 'col-sm-6','col-lg-3', 'sort-to-four'));
    localStorage.clear();
    localStorage.setItem('grid', 'grid-4');
    addThumbnails();
}

function changeGridListProductAfterPageReload() {
    let productList = document.querySelectorAll('#category .product-miniature');
    if(localStorage.length !== null && localStorage.length != 1) {
        productList.forEach(element => element.setAttribute('class', 'revealOnScroll animated fadeInUp product-miniature js-product-miniature'));
        let localGridItem = localStorage.getItem('grid');

        if(localGridItem === "grid-1") {
            gridToOne(productList);
        }
        if(localGridItem === "grid-2") {
            gridToTwo(productList);
        }
        if(localGridItem === "grid-3") {
            gridToThree(productList);
        }
        if(localGridItem === "grid-4") {
            gridToFour(productList);
        }
    }else {
        productList.forEach(element => element.setAttribute('class', 'revealOnScroll animated fadeInUp product-miniature js-product-miniature col-xs-12 col-sm-6 col-lg-4 sort-to-three'));
    }
}