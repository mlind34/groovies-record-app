let dataTable = document.getElementById('dataTable');
console.log(dataTable);
let buttons = document.querySelectorAll('input');
console.log(buttons);
recordsAdded = [];
for(let i in buttons) {

  if(buttons[i].value == 'Purchases') {
    //   let data = {
    //     id: buttons[i].id
    //   };
      //contextJson = JSON.stringify(context);
      buttons[i].addEventListener("click", (event) => {
        // let subReq = new XMLHttpRequest();
        // subReq.open("POST", "http://flip3.engr.oregonstate.edu:5199/custpurchases", true);
        // subReq.setRequestHeader("content-type", "application/json");
        // subReq.addEventListener("load", () => {
        //     document.querySelector('html').innerHTML = subReq.response;
        // })
        // data = JSON.stringify(data);
        // subReq.send(data);
        // event.preventDefault();
        window.location.href = '/custpurchases/'+buttons[i].id

        // fetch('http://flip3.engr.oregonstate.edu:5199/custpurchases', {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: contextJson,
        // }).then(function (response) {
        //     console.log(response);
        // })
      })
  }
  if(buttons[i].value == 'Add to Order') {
    recordsAdded = [];
    buttons[i].addEventListener("click", (event) => {
      makeConfirm(buttons[i]);
      event.preventDefault;
      recordsAdded.push(buttons[i].id);
      console.log(recordsAdded);
    });
  }
  if(buttons[i].value == 'Submit Records for Order') {
    console.log("Test");
    data = {
      recordIDs: recordsAdded
    };
    buttons[i].addEventListener("click", (event) => {
      let subReq = new XMLHttpRequest();
        subReq.open("POST", "http://flip3.engr.oregonstate.edu:5199/purchases/add-purchase/final", true);
        subReq.setRequestHeader("content-type", "application/json");
        subReq.addEventListener("load", () => {
          // window.location.href = '/purchases/add-purchase/final'
        })
        data = JSON.stringify(data);
        subReq.send(data);
        event.preventDefault();
    });
  }
}

dataTable.addEventListener('click', (event) =>{
    let target = event.target;
    if(target.value == 'Update'){
        var confirm = makeConfirm(target)
        updateRow(target.id);
    }
});



const updateRow = (id) => {
    var rowToUpdate = document.getElementById(id);
    
    dataCell = rowToUpdate.getElementsByClassName('table-input');

    checkCell = rowToUpdate.getElementsByClassName('ui checkbox');

    for(var i = 0; i < dataCell.length; i++){
  
        input = document.createElement('input');

        input.setAttribute('type', 'text');

        input.setAttribute('size', '17');
        
        input.setAttribute('value', dataCell[i].innerText);

        dataCell[i].innerHTML = '';

        dataCell[i].append(input);
       
    }
}

    // checkInput = document.createElement('input');
    // input.setAttribute('type', 'checkbox');
    // console.log(input)
    // if(checkCell.checked == True){
    //     input.setAttribute('checked', 'True')
    // } else {
    //     input.setAttribute('checked', 'False')
    // }
    // checkCell = input



const makeConfirm = (button) => {
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

