var cart = [{name: "Гитара",price:11000,count:0,img: "images/guitar.jpg",btn:document.createElement('button')},
 {name: "Саксофон",price:30000,count:0,img: "images/sax.jpg",btn:document.createElement('button')},
  {name: "Укулеле",price:5000,count:0,img: "images/ukulele.jpg",btn:document.createElement('button')},
   {name: "Барабаны",price:35000,count:0,img: "images/drums.jpg",btn:document.createElement('button')},
   {name: "Микрофон",price:3499,count:0,img: "images/micro.jpg",btn:document.createElement('button')},
   {name: "Студийные наушники",price:19900,count:0,img: "images/headset.jpg",btn:document.createElement('button')}];

for (let i = 0; i < cart.length; i++) {
    cart[i].btn.innerHTML = "Купить";
    cart[i].btn.className = "buy";
    cart[i].btn.addEventListener("click", function(){
        plusFunction(i);
    });
}

function renderShop(array, min=0, max=Infinity){
    document.querySelector('.catalog').innerHTML ="";
    for (let i = 0; i < array.length; i++) {
        const e = array[i];
        if((e.price >= min || min == '') && (e.price <= max || max == '')){
            let product = document.createElement("div");
            product.className = "product";
            product.innerHTML = `<img src="${e.img}" alt="" class="product_img" ondragstart = "return false">
            <span>${e.name}</span>
            <span><span class="price">${e.price}</span> руб</span>`;
            product.appendChild(e.btn);
            document.querySelector('.catalog').appendChild(product);
        }
    }
}

renderShop(cart);

var summa = 0;
function plusFunction(k){
    cart[k].count++;
    summa += cart[k].price;
    renderCart();
}
function minusFunction(k){
    cart[k].count--;
    summa-=cart[k].price;
    renderCart();
}
function deleteFunction(k){
    summa -= cart[k].count*cart[k].price;
    cart[k].count = 0;
    renderCart();
}
function renderCart(){
    document.querySelector('.carts').innerHTML ="";
    for(let i = 0; i < cart.length;i++){
        if(cart[i].count > 0){
            let div, div2, dis = "", plus, minus, del, span;
            div = document.createElement('div');
            div.className = "cart";
            span = document.createElement('span');
            span.innerHTML = cart[i].name;
            div.appendChild(span);
            span = document.createElement('span');
            span.innerHTML = (cart[i].price*cart[i].count) + " руб";
            div.appendChild(span);
            plus = document.createElement('button');
            plus.className = "plus";
            minus = document.createElement('button');
            minus.className = "minus";
            if(cart[i].count == 1)minus.disabled = true;
            del = document.createElement('button');
            del.className = "delete";
            plus.addEventListener('click', function(){
                plusFunction(i);
            });
            minus.addEventListener('click', function(){
                minusFunction(i);
            });
            del.addEventListener('click', function(){
                deleteFunction(i);
            });
            div2 = document.createElement('div');
            div2.className = "count";
            span = document.createElement('span');
            span.innerHTML = cart[i].count;
            div2.appendChild(minus);
            div2.appendChild(span);
            div2.appendChild(plus);
            div.appendChild(div2);
            div.appendChild(del);
            document.querySelector('.carts').appendChild(div);
        }
    }
    document.querySelector('.summa').innerHTML = summa;
}

document.querySelector('.filter_btn').addEventListener("click",function(){
    renderShop(cart, document.querySelector('#min').value, document.querySelector('#max').value);
});

let sort = 1;
document.querySelector('.sort').addEventListener("click",function(){
    if(sort == 1){
        renderShop(cart.slice().sort((a,b)=>a.price - b.price), 
            document.querySelector('#min').value, document.querySelector('#max').value);
        document.querySelector('.sort_text').innerHTML = 'По возрастанию';
        sort++;
    }else if(sort == 2){
        renderShop(cart.slice().sort((a,b)=> b.price - a.price), 
            document.querySelector('#min').value, document.querySelector('#max').value);
        document.querySelector('.sort_text').innerHTML = 'По убыванию';
        sort++;
    }else{
        renderShop(cart, document.querySelector('#min').value, 
            document.querySelector('#max').value);
        document.querySelector('.sort_text').innerHTML = 'По умолчанию';
        sort++;
    }
    sort = sort % 3;
});



