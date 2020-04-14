let outTotal = document.querySelector('#out-total'),
    sizeKind = document.querySelectorAll('.form-size'), 
    sizeParentNode = document.querySelector('.size-container'),
    adds = document.querySelectorAll('.adds'),
    drinks = document.querySelectorAll('.posit-drink'),
    centerMenu = document.querySelector('.center-menu'),
    orderList = document.querySelector('.order-list'),
    toOrderBtn = document.querySelector('#order-btn'),
    preOrderBtn = document.querySelector('#cancel-order-btn'),
    btnCancelOrder = document.querySelector('.order-cancel-btn'),
    btnConfirmOrder = document.querySelector('.order-confirm-btn'),
    pizzaItems = document.querySelectorAll('.pizzas-position'),
    pizzaPage = document.querySelector('#pizza-page');
    constructorPage = document.querySelector('#constructor-page');
   

window.addEventListener('load', function(){
    if(localStorage.length > 0 ){
        generateOrderLocal();
        generateAmountLocal();
        loopElem(sizeKind);
        loopElem(adds);
        loopElem(drinks);
        btnPizzaLoop();
    }else{
        outTotal.innerHTML = 0;
        loopElem(sizeKind);
        loopElem(adds);
        loopElem(drinks);
        btnPizzaLoop();
    }
    
});

function loopElem(item, section) {

    for (let i = 0; i < item.length; i++) {
    
        item[i].onclick = () => {
            let value = Number(item[i].getAttribute("data-value"));
            let amount = Number(outTotal.innerHTML);
            let section = item[i].parentNode;

            // Validating all sections for checking, then if  item from size-section is chosen - you can order adds for your pizza, if no - without this step you can't make order.
            if (section.classList.contains('size-container')) {
                if (!item[i].classList.contains('active')) {
                    item[i].classList.add('active');
                    outTotal.innerHTML = amount + value;
                    setItem(item[i]);

                    // let keys = Object.keys(localStorage);
                    //     console.log(keys);
                } else {
                    item[i].classList.remove('active');
                    outTotal.innerHTML = amount - value;
                    removeItem(item[i]);
                }

            }else if(section.classList.contains('adds-portion')) {
                
                if(sizeLoop()){
                    if (!item[i].classList.contains('active')) {
                        item[i].classList.add('active');
                        outTotal.innerHTML = amount + value;
                        setItem(item[i]);
                    } else {
                        item[i].classList.remove('active');
                        outTotal.innerHTML = amount - value;
                        removeItem(item[i]);
                    }
                }else{
                    alertMessage();
                }
            }else if(section.classList.contains('double-portion')){
                if(sizeLoop()){
                    if (!item[i].classList.contains('active')) {
                        item[i].classList.add('active');
                        outTotal.innerHTML = amount + value;
                        setItem(item[i]);
                    } else {
                        item[i].classList.remove('active');
                        outTotal.innerHTML = amount - value;
                        removeItem(item[i]);
                    }
                }else{
                    alertMessage();
                }
            }else{
                if (!item[i].classList.contains('active')) {
                    item[i].classList.add('active');
                    outTotal.innerHTML = amount + value;
                    setItem(item[i]);
                } else {
                    item[i].classList.remove('active');
                    outTotal.innerHTML = amount - value;
                    removeItem(item[i]);
                }
            }

        }

    }
}

function sizeLoop(){

    let isTrue = false;

    for(let i of sizeParentNode.children ){
       if( i.classList.contains('active')){
           isTrue = true;
       }
    }

    if(!isTrue){
        return false;
    }else{
        return true;
    }

}

function alertMessage(){
    let div = document.createElement('div');
        div.classList.add('modal-container');
        div.insertAdjacentHTML('afterbegin',`
            <div class="modal-content">
                <div class='modal-header'>
                    <span>Sorry!</span>
                </div>
                <div class='modal-body'>
                    <p>Please, choose pizza size  first.</p>
                    <p>Without this step you can't place an order.</p>
                </div>
                <div class='modal-footer'>
                    <button id="modal-close">Close</button>
                </div>
            </div>
        `);

       let parentNode = document.querySelector('.center-menu');
            parentNode.append(div);
        
        document.querySelector('#modal-close').addEventListener('click' , function(){
           parentNode.removeChild(div);
        });
}

function setItem(item){
    let dataName = item.getAttribute('data-name');
    let dataValue = item.getAttribute('data-value');
    let dataGroup = item.getAttribute('data-group');
        localStorage.setItem(`${dataGroup} : ${dataName}`,dataValue);
}

function removeItem(item){
    let dataName = item.getAttribute('data-name');
    let dataGroup = item.getAttribute('data-group');
        localStorage.removeItem(`${dataGroup} : ${dataName}`);
}

function removeActive(arrOfElem){
    for(let item of arrOfElem){
        if(item.classList.contains('active')){
            item.classList.remove('active');
        }
    }
}

function generateOrderLocal(){

    let keys = Object.keys(localStorage);
    let totalAmount = document.querySelector('.order-list-reference');
    let divTotal = document.createElement('div');
        divTotal.classList.add('order-total');
        divTotal.innerHTML = `Total: ${outTotal.innerHTML} $` ;
    let divContainer = document.createElement('div');
        divContainer.classList.add('order-container');

    let divAdds = document.createElement('div');
        divAdds.innerHTML = `<b>Adds:</b>`;
    let divSize = document.createElement('div');
        divSize.innerHTML = `<b>Size:</b>`;
    let divDrinks = document.createElement('div');
        divDrinks.innerHTML = `<b>Drinks:</b>`;
    let divDoubleA = document.createElement('div');
        divDoubleA.innerHTML = `<b>Double-Adds:</b>`;
    let divPizza = document.createElement('div');
        divPizza.innerHTML  = `<b>Pizza:</b>`;
    
    // Make a loop of keys from LocalStorage, then we separate key like:  part first is (name group) and second part is (name of item from this group),
    // and then we add all of it to total check,
    for(let key = 0; key < keys.length; key++){
        let value = localStorage.getItem(keys[key]);
        let keyGroup = keys[key].split(':');
        
        if(keyGroup[0] == 'adds '){
            let myParaKey = document.createElement('p');
                myParaKey.innerHTML = `${keyGroup[1]} : ${value}$`;
                divAdds.appendChild(myParaKey);
        }else if(keyGroup[0] == 'size '){
            let myParaKey = document.createElement('p');
                myParaKey.innerHTML = `${keyGroup[1]} : ${value}$`;
                divSize.appendChild(myParaKey);
        }else if(keyGroup[0] == 'double-adds '){
            let myParaKey = document.createElement('p');
                myParaKey.innerHTML = `${keyGroup[1]} : ${value}$`;
                divDoubleA.appendChild(myParaKey);
        }else if(keyGroup[0] == 'pizza '){
            let myParaKey = document.createElement('p');
                myParaKey.innerHTML = `${keyGroup[1]} : ${value}$`;
                divPizza.appendChild(myParaKey);
        }else{
            let myParaKey = document.createElement('p');
                myParaKey.innerHTML = `${keyGroup[1]} : ${value}$`;
                divDrinks.appendChild(myParaKey);
        }
        
    }
    // Make a loop for group where we will know what to add to total order, we need add items what have chosen.
        for(let group = 0; group < keys.length; group++){
            
            let keyGroup = keys[group].split(':');
            if(keyGroup[0] == 'size '){
                divContainer.appendChild(divSize);
            }else if(keyGroup[0] == 'adds '){
                divContainer.appendChild(divAdds);
            }else if(keyGroup[0] == 'double-adds '){
                divContainer.appendChild(divDoubleA);
            }else if(keyGroup[0] == 'pizza '){
                divContainer.appendChild(divPizza);
            }else{
                divContainer.appendChild(divDrinks);
            }
        }
        
        divContainer.appendChild(divTotal);

        let container = document.querySelector('.order-container');
        if(container){
            container.parentNode.removeChild(container);
            totalAmount.prepend(divContainer);
        }else{
            totalAmount.prepend(divContainer);
        }
        
    
}

function generateAmountLocal(){
    let arrValue = [];
    let keys = Object.keys(localStorage);
    for(let key = 0; key < keys.length; key++){
        let value = localStorage.getItem(keys[key]);
            arrValue.push(Number(value));
    }
    let total = arrValue.reduce((sumValue,arrValue)=>{
        return sumValue = sumValue + arrValue;
    },0);
        outTotal.innerHTML = total;
}

function cancelOrder(){
    localStorage.clear();
    removeActive(adds);
    removeActive(drinks);
    removeActive(sizeKind);
    removeActive(pizzaItems);
    outTotal.innerHTML = 0;
}

function btnPizzaLoop(){
    loopElem(pizzaItems);
    generateOrderLocal();
}

toOrderBtn.onclick = () => {
    if(localStorage.length > 0){
        centerMenu.classList.add('hide');
        orderList.style.display = "block";
        generateOrderLocal();
    }else{
        let div = document.createElement('div');
            div.classList.add('modal-container');
            div.insertAdjacentHTML('afterbegin',`
                <div class="modal-content">
                    <div class='modal-header'>
                        <span>Sorry!</span>
                    </div>
                    <div class='modal-body'>
                        <p>Shopping Basket is still empty.</p>
                        <p>Please, choose something.</p>
                    </div>
                    <div class='modal-footer'>
                        <button id="modal-close">Close</button>
                    </div>
                </div>
            `);

       let parentNode = document.querySelector('.center-menu');
            parentNode.append(div);
        
            document.querySelector('#modal-close').addEventListener('click' , function(){
           parentNode.removeChild(div);
        });
    }
}
preOrderBtn.onclick = () => {
    cancelOrder();
}
btnCancelOrder.onclick = () => {
    centerMenu.classList.remove('hide');
    orderList.style.display = "none";
    cancelOrder();
    let ordContainer = document.querySelector('.order-container');
        ordContainer.parentNode.removeChild(ordContainer);
}
btnConfirmOrder.addEventListener('click', function(){

    let div = document.createElement('div');
        div.classList.add('modal-container');
        div.insertAdjacentHTML('afterbegin',`
            <div class="modal-content">
                <div class='modal-header'>
                    <span>Thank You for your Order!</span>
                </div>
                <div class='modal-body'>
                    <p>Our manager will tall you details about delivery.</p>
                    <p>Enjoy your meal and have fun! &#9787;</p>
                </div>
                <div class='modal-footer'>
                    <button id="modal-close">Close</button>
                </div>
            </div>
        `);

   let parentNode = document.querySelector('.center-menu');
        parentNode.append(div);
    
    document.querySelector('#modal-close').addEventListener('click' , function(){
       parentNode.removeChild(div);
    });

    centerMenu.classList.remove('hide');
    orderList.style.display = "none";
    cancelOrder();
    let ordContainer = document.querySelector('.order-container');
        ordContainer.parentNode.removeChild(ordContainer);
});
pizzaPage.addEventListener('click', function(){
    let showPizzaPage = document.querySelector('.pizzas');
        showPizzaPage.style.display = "flex";
        s = document.querySelector('.size'),
        p = document.querySelector('.pizza-adds'),
        d = document.querySelector('.double-adds'),
        dri = document.querySelector('.drinks');
        s.style.display = "none";
        p.style.display = "none";
        d.style.display = "none";
        dri.style.display = "none";
});
constructorPage.addEventListener('click', function(){
    let showPizzaPage = document.querySelector('.pizzas');
        showPizzaPage.style.display = "none";
        s = document.querySelector('.size'),
        p = document.querySelector('.pizza-adds'),
        d = document.querySelector('.double-adds'),
        dri = document.querySelector('.drinks');
        s.style.display = "flex";
        p.style.display = "flex";
        d.style.display = "flex";
        dri.style.display = "block";
});
