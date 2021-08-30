const orderList= document.getElementById('order-list');
const totalPrice = document.getElementById('total-price');
const pizzaLoader = document.getElementById('pizza-loader');
const buttonOrder = document.getElementById('button-order');
const checkBox = [...document.getElementsByTagName('input')];
const container = document.getElementById("container");
const formsInput= [...document.getElementsByTagName('form')];

const pizzaIngrid ={
    base:[
        {
            name: 'classic_base',
            innerName: `Основа "Классика"`,
            price: 1.1,
            checked: false
        },
        {
            name: 'thin_base',
            innerName: `Основа тонкоя`,
            price: 1.2,
            checked: false
        },
        {
            name: 'cheese_base',
            innerName: `Основа "Сырный борт`,
            price: 1.3,
            checked: false
        },
        {
            name: 'hot-dog_base',
            innerName: `Основа "Хот-Дог борт`,
            price: 1.4,
            checked: false
        },
    ],
    meat:[
        {
            name: 'bavarian_sausages',
            innerName: `Баварские колбаски`,
            price: 2.1,
            checked: false
        },
        {
            name: 'bacon',
            innerName: `Бекон`,
            price: 2.2,
            checked: false
        },
        {
            name: 'chicken',
            innerName: `Курица`,
            price: 2.3,
            checked: false
        },
        {
            name: 'shrimp',
            innerName: `Креветки`,
            price: 2.4,
            checked: false
        }
    ],
    veg:[
        {
            name: 'olives',
            innerName: `Маслины`,
            price: 3.1,
            checked: false
        },
        {
            name: 'bell_pepper',
            innerName: `Сладкий перец`,
            price: 3.2,
            checked: false
        },
        {
            name: 'champignon',
            innerName: `Шампиньоны`,
            price: 3.3,
            checked: false
        },
        {
            name: 'onion',
            innerName: `Лук`,
            price: 3.4,
            checked: false
        },
    ],
    sauce:[
        {
            name: 'garlic',
            innerName: `Соус "Чесночный"`,
            price: 4.1,
            checked: false
        },
        {
            name: 'barbecue',
            innerName: `Соус "Барбекю"`,
            price: 4.2,
            checked: false
        },
        {
            name: 'curry',
            innerName: `Соус "Карри"`,
            price: 4.3,
            checked: false
        },
        {
            name: 'pepperoni',
            innerName: `Соус "Пепперони"`,
            price: 4.4,
            checked: false
        },
    ]
}

checkBox.forEach(checkInput => {
    checkInput.addEventListener('click', start )
});

formsInput.forEach(form =>{
    form.addEventListener('change', function(){
        change(form);
        changeImg(totalForm);
    })
});

function start(e){  
    pizzaIngrid[e.target.dataset.type].forEach(elem => {
        if(elem.name===e.target.name){
            elem.checked=!elem.checked;
            if(elem.checked){
                creatOrder(elem,e);
                addTotalForm(elem,e);
            }else {
                delOrder(elem,e);
            }
        }
    })
        
}

let total=0.00;
totalPrice.innerText=total;

function creatOrder(ingrid,e){  //создает элементы списка заказа
    const li = document.createElement('li');
    li.innerText = ingrid.innerName+ `      ` + ingrid.price + `$`;
    li.name=ingrid.name;
    orderList.append(li);
    li.addEventListener('click',  function clickLi(){ 
        ingrid.checked=!ingrid.checked;
        e.target.checked=false;
        delOrder(ingrid,e); 
        changeImg(totalForm);
   
    })

    total +=ingrid.price;
    totalPrice.innerText=total.toFixed(2);
}

function delOrder(ing,e){ // удаляет элементы из списка заказа
    [...orderList.children].forEach(el=>{
        if(el.name===ing.name){
            el.remove();
        }
    })
    delTotalForm(ing, e);  
    total = (total - ing.price);
    totalPrice.innerText=total.toFixed(2); 
}

 function addTotalForm (ingr,e){ //добавляет ингридиенты в итоговый объект
    for (key in totalForm){
        if(key===e.target.dataset.type){
            totalForm[key].push({
                name:ingr.innerName,
                price: ingr.price,
                }                
            )
        }
    }
}

function delTotalForm(ingr, e){  //удаляет ингридиенты из итогового объекта
    for(key in totalForm){
        if(key===e.target.dataset.type){
            totalForm[key].forEach((elem,i) => {
                if(ingr.innerName===elem.name){
                    totalForm[key].splice(i, 1);
                } 
            });
            change(e.target.form);
        }   
    }
}

let totalForm={   //объект заказа
    base: [],
    meat: [],
    veg: [],
    sauce: [],
};
 
function change(form) {  // не дает выбрать более одного или двух элементов
    let all = form.querySelectorAll('[type="checkbox"]');
    let check = form.querySelectorAll('[type="checkbox"]:checked');

    if(form===base || form===sauce){
    [...all].forEach(el=>{
        if(check.length>=1){
            el.disabled=true;
            [...check].forEach(elem=>
                elem.disabled=false
            );
        } else {
            all.forEach(el=>
                el.disabled=false
                )
        }
    })
} else {
    [...all].forEach(el=>{
        if(check.length>=2){
            el.disabled=true;
            [...check].forEach(elem=>
                elem.disabled=false
            );
        } else {
            all.forEach(el=>
                el.disabled=false
                )
        }
    })
}  
}

function changeImg(arr){  //считает checked по отдельным формам; меняет картинку
    let counter=0;  
    for(key in arr){
        if(arr[key].length>0){
            counter++
        } else { 
            counter
        }        
} 
pizzaLoader.style.backgroundImage= `url(img/${counter}.png)`;
changebuttonOrder(counter)
}

function clickButtonOrder(){   //click на кнопку заказа
    buttonOrder.addEventListener("click", function(){
        createOrderMessage();
        console.log(totalForm);
     })
}clickButtonOrder()

function changebuttonOrder(formCounter){ //активность кнопки заказа
    if(formCounter===4){
        buttonOrder.style.backgroundColor= `rgb(245,7,7)`;
        buttonOrder.style.cursor="pointer";
        document.getElementById('button-order').disabled=false;
    } else {
        buttonOrder.style.backgroundColor= `rgb(88, 84, 84)`;
        buttonOrder.style.cursor=""
        document.getElementById('button-order').disabled=true;
    }
}

function createOrderMessage(){ //окно сообщения об успешном оформлении заказа

    const wrapper = document.createElement('div');
    wrapper.id="wrapper";
    container.append(wrapper);

    const orderMessage = document.createElement('div');
    orderMessage.id = "order-message";
    wrapper.append(orderMessage);

    const orderMessageImg = document.createElement('div');
    orderMessageImg.className='orderMessageImg';
    orderMessage.append(orderMessageImg);

    const orderMessageH1=document.createElement('h1');
    orderMessageH1.innerText = 'Спасибо!';
    orderMessage.append(orderMessageH1);

    const orderMessageText=document.createElement('h2');
    orderMessageText.innerText=`Ваш заказ успешно оформлен. Мы свяжемся с Вами в ближайшее время.
    Номер вашего заказа  #${123456789}`
    orderMessage.append(orderMessageText);

    // const closeButton=document.createElement('button');
    // closeButton.id='closeButton';
    // closeButton.innerText='x'
    // orderMessage.append(closeButton);
}



