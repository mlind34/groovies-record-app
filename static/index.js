  recordsAdded = [];
  let buttons2 = document.querySelectorAll('input');

  custPurch(buttons2)
  function custPurch(buttons2){

  for(let i in buttons2) {

      if(buttons2[i].value == 'Purchases') {
      
          buttons2[i].addEventListener("click", (event) => {
          
          event.preventDefault();
          window.location.href = '/custpurchases/'+buttons2[i].id
          
          })
      }
      if(buttons2[i].value == 'Add to Purchase') {
          row = buttons2[i].parentNode.parentNode;
          quantityCell = row.cells[1];
          quantity = parseInt(quantityCell.innerText, 10);
          if(quantity < 1) {
              buttons2[i].disabled = true;
          }
      buttons2[i].addEventListener("click", (event) => {
          event.preventDefault;
          row = buttons2[i].parentNode.parentNode;
          quantityCell = row.cells[1];
          quantity = parseInt(quantityCell.innerText, 10);
          recordsAdded.push(buttons2[i].id);
          //makeConfirm(buttons2[i]);
          quantity--;
          quantityCell.innerText = quantity;
          if(quantity < 1) {
              buttons2[i].disabled = true;
          }
      });
      }
      if(buttons2[i].value == 'Submit Records for Order') {
      buttons2[i].addEventListener("click", (event) => {
          data = {
          recordIDs: recordsAdded,
          };
          if(buttons2[i].hasAttribute('id')) {
            data.id = buttons2[i].id;  
          }
          // function to confirm customer purchase   
          let subReq = new XMLHttpRequest();
          subReq.open("ADD", "/purchases/add-purchase/final", true);
          subReq.setRequestHeader("content-type", "application/json");
          subReq.addEventListener("load", () => {
              data = JSON.parse(data);
              if('id' in data) {
                window.location.href = '/purchases/add-purchase/final/'+data.id;
              } else {
                window.location.href = '/purchases/add-purchase/final'; 
              }
          })
          data = JSON.stringify(data);
          subReq.send(data);
          event.preventDefault();
      });
      }
      if(buttons2[i].value == 'Update') {
          buttons2[i].addEventListener('click', (event) => {
              let target = event.target;
              if(target.value == 'Update'){
                  enableRow(target.id);
                  pageType = target.parentNode.parentNode.getAttribute('name')
                  let confirm = makeConfirm(target)
                  confirm.addEventListener('click', function(){
                      let data = document.getElementsByClassName('update-data')
                      let id = target.id
                      
                      if(pageType == 'customer') {
                          let first = data['firstName'].value
                          let last = data['lastName'].value
                          let str = data['street'].value
                          let c = data['city'].value
                          let st = data['state'].value
                          let z = data['zip'].value
                          let ph = data['phone'].value
                          let em = data['email'].value
                          updateCustomer(pageType, id, first, last, str, c, st, z, ph, em)
                      }
                      if(pageType == 'distributor') {
                          let name = data['name'].value
                          let street = data['street'].value
                          let city = data['city'].value
                          let state = data['state'].value
                          let zip = data['zip'].value
                          let phone = data['phone'].value
                          updateDist(pageType, id, name, street, city, state, zip, phone)
                      }
                  })
              }
              event.preventDefault() 
          });
      }
  }
}



// UPDATE FUNCTION
function updateFunc(updateBtn){
    updateBtn.removeAttribute('onclick')
    pageType = document.getElementById('viewTitle').innerText
  
    // creates confirm button when update button is clicked   
    let confirm = makeConfirm(updateBtn)

    // enables row   
    enableRow(updateBtn.id)
  
    // when confirm is clicked the newly entered data is gathered and sent to the update route depending on page type   
    confirm.addEventListener('click', function(){
        let data = document.getElementsByClassName('update-data')
        let id = updateBtn.id

        // if customers are being updated   
        if(pageType == 'Customers') {
            let first = data['firstName'].value
            let last = data['lastName'].value
            let str = data['street'].value
            let c = data['city'].value
            let st = data['state'].value
            let z = data['zip'].value
            let ph = data['phone'].value
            let em = data['email'].value
            updateCustomer(pageType, id, first, last, str, c, st, z, ph, em)
        }
        // if distributors are being updated   
        if(pageType == 'Distributors') {
            let name = data['name'].value
            let street = data['street'].value
            let city = data['city'].value
            let state = data['state'].value
            let zip = data['zip'].value
            let phone = data['phone'].value
            updateDist(pageType, id, name, street, city, state, zip, phone)
        }
  });
}

// function to enable a row to be updated
function enableRow(id) {
    let row = document.getElementById(id);
    let cells = row.getElementsByClassName('table-input')
    for(let i = 0; i < cells.length; i++){
        let name = cells[i].getAttribute('name')
        let value = cells[i].innerHTML
        createInput(cells[i], name, value)
    }
}


// creates a new input for new information to be entered
function createInput(cell, name, value) {
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('size', '8%')
    input.setAttribute('class', 'update-data')
    input.setAttribute('name', name);
    input.setAttribute('value', value);
    cell.innerText =''
    cell.append(input)
}

// function to create new confirm button
function makeConfirm(button) {
    if(button.value == 'Update') {
        button.setAttribute('value', 'Confirm');
        button.style.backgroundColor = 'rgb(100, 150, 240)'
        return button;
    } else if (button.value == 'Add to Order') {
        button.setAttribute('value', 'Added');
        button.style.backgroundColor = 'rgb(100, 150, 240)'
        button.disabled = true;
        return button;
    }
}

// function to wrap customer form data in an object and send to request
function updateCustomer(pageType, id, first, last, str, c, st, z, ph, em) {
    let customerData = {pageType: null, id: null, firstName: null, lastName: null, street: null, city: null, state: null, zip: null, phone: null, email: null}
    customerData.pageType = pageType
    customerData.id = id
    customerData.firstName = first
    customerData.lastName = last
    customerData.street = str
    customerData.city = c
    customerData.state = st
    customerData.zip = z
    customerData.phone = ph
    customerData.email = em
    updateRequest(customerData)
}
  
// function to wrap distributor form data in an object and send to request
function updateDist(pageType, id, name, street, city, state, zip, phone) {
    let distData = {pageType: null, id: null, name: null, street: null, city: null, state: null, zip: null, phone: null}
    distData.pageType = pageType
    distData.id = id
    distData.name = name
    distData.street = street
    distData.city = city
    distData.state = state
    distData.zip = zip
    distData.phone = phone
    updateRequest(distData)
}

// update request function
function updateRequest(postData){
    let req = new XMLHttpRequest()
    
    req.open("POST", "/update", true);
        req.setRequestHeader("content-type", "application/json");
        req.addEventListener("load", () => {
            if (req.status >= 200 && req.status < 400){
                if (postData['pageType'] == 'Customers'){
                window.location.href = '/customers'
                } 
                if (postData['pageType'] == 'Distributors') {
                    window.location.href = '/distributors'
                }
                
            } else {
                console.log('error in network request' + req.statusText)
            }
        });
        req.send(JSON.stringify(postData))
        event.preventDefault()
}


// CREATE ORDER FUNCTIONS
    orderTable = document.getElementById('orderTable');
    albumCards = document.getElementsByClassName('ui link cards');
    orderTotal = document.getElementById('orderTotal');
  
    let total = 0
    if(albumCards[0] != null){
    albumCards[0].addEventListener('click', (event) => {
        let target = event.target; 
        
        if(target.id == 'addAlbum'){
            if (target.dataset.quantity == 0){
                return
            }
            // get item info to use to create a new row 
            itemQuantity  = target.closest('div').getElementsByClassName('ui dropdown selection')[0].innerText
            let product_id = target.dataset.id;
            let dist_id = target.dataset.dist_id;
            let price = target.dataset.price;
            
            let img = target.dataset.img;
            let artist = target.dataset.artist;
            let name = target.dataset.name;
            
            
            total += Number(price * itemQuantity);
            total = Number(total.toFixed(2));
            orderTotal.innerText = `Total Price: $${total}`; 
            createRow(artist, name, product_id, dist_id, img, itemQuantity);
        }
    });
}

  // Adds album info to "My Order" rail
  function createRow(artist, name, product_id, dist_id, img, itemQuantity) {
      // IMAGE
      orderRow = document.createElement('div');
      orderRow.setAttribute('class', 'order-item');
      orderRow.setAttribute('data-product_id', `${product_id}`);
      orderRow.setAttribute('data-dist_id', `${dist_id}`);
      orderRow.setAttribute('data-quantity', `${itemQuantity}`);
      imgCell = document.createElement('span');
      imgCell.setAttribute('id', 'imageData');
      imgCell.innerHTML = `<img src=${img}>`;
      orderRow.append(imgCell);

      // TITLE
      orderTitle = document.createElement('div');
      orderTitle.setAttribute('class', 'order-title');
      orderTitle.innerText = `${artist} - ${name}`
      imgCell.append(orderTitle);

      orderQuantity = document.createElement('div');
      orderQuantity.setAttribute('class', 'order-quantity');
      orderQuantity.innerText = ` - ${itemQuantity}`;
      orderTitle.append(orderQuantity);

      orderTable.append(orderRow);
  }



// ORDER CONFIRM
ordConfirm = document.getElementById('orderConfirm');

document.addEventListener('DOMContentLoaded', function(){
    if(ordConfirm != null){
    // when order confirmed is clicked, order data is gathered and sent to orderRequest function   
    ordConfirm.addEventListener('click', function(){
        let orderItems = document.getElementsByClassName('order-item');
        let items = [];
        for(let i = 0; i < orderItems.length; i++){
                item = {
                    'quantity': orderItems[i].dataset.quantity,
                    'id': orderItems[i].dataset.product_id
                }
                items.push(item);
            }
            let dist_id = orderItems[0].dataset.dist_id;
            orderData = {
                dist_id: null,
                filled: null,
                total: null,
                items: null
            }
            orderData.dist_id = dist_id;
            orderData.filled = false;
            orderData.total = total;
            orderData.items = items;
            orderRequest(orderData);
        })
    }
})


// function to confirm order and send order data to server
function orderRequest (orderData) {
    let req = new XMLHttpRequest()
    
    req.open("POST", "/orders/add-order/confirm-order", true);
        req.setRequestHeader("content-type", "application/json");
        req.addEventListener("load", () => {
            if (req.status >= 200 && req.status < 400){
                window.location.href = '/orders'
                
            } else {
                console.log('error in network request' + req.statusText);
            }
        });

        req.send(JSON.stringify(orderData));
        event.preventDefault();
}


// ORDERS FILLED FUNCTION
distOrderTable = document.getElementById('distOrderTable')
if(distOrderTable != null){
    orders = [];
    distOrderTable.addEventListener('change', (event) => {
    let checkbox = event.target;
    order_info = {
        order_id: checkbox.dataset.id,
        distributor_id: checkbox.dataset.dist
    }
    // gathers all orders being selected
    orders.push(order_info);
    addOrders = {
        orders: null
    }
    addOrders.orders = orders;
    fillOrder(addOrders);
    });
}

// function to fill orders
function fillOrder(addOrders){
let fillOrder = document.getElementById('fillOrder');
fillOrder.addEventListener('click', function(){
    addInventory(addOrders);
});
}

// post request to add all order items to records table
function addInventory(addorders){
  let req = new XMLHttpRequest();
 
  req.open("POST", "/orders/fill-orders", true);
      req.setRequestHeader("content-type", "application/json");
      req.addEventListener("load", () => {
          if (req.status >= 200 && req.status < 400){
              window.location.href = '/records'
              
          } else {
              console.log('error in network request' + req.statusText)
          }
      });

      req.send(JSON.stringify(addorders));
      event.preventDefault();
}


// Javascript search functionality for records page
function filterRecords(){
  let searchBar = document.getElementById("searchbar");
  if(searchBar) {
    searchBar.addEventListener('keyup', (event) => {
        let curRows = document.querySelectorAll('tr');
        searchBarText = searchBar.value.toUpperCase();
        for (let i = 1; i < curRows.length; i++) {
            
            if(curRows[i].cells[3].innerText.toUpperCase().includes(searchBarText)) {
              curRows[i].style.display = "table-row";
            } else if (curRows[i].cells[4].innerText.toUpperCase().includes(searchBarText)) {
                curRows[i].style.display = "table-row";  
            } else {
                curRows[i].style.display = "none";  
            }
       }
    });
   }
}
filterRecords();