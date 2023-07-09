const myExpense = document.querySelector('#my-Expense');
const item_Id = document.getElementById("listOfExpenses");

//to add event listeners
myExpense.addEventListener('submit', onSubmit);
item_Id.addEventListener('click', removeItem);

//assigning variables to the values
const Exp_Amt = document.getElementById('ExpAmt');
const Exp_des = document.getElementById('Dsp');
const Exp_categ = document.getElementById('Category');

function onSubmit(e) {
  e.preventDefault();
  console.log(Exp_Amt.value);
  console.log(Exp_des.value);
  console.log(Exp_categ.value);
  let myobj = { my_amt: Exp_Amt.value, my_des: Exp_des.value, my_categ: Exp_categ.value };
  let MyObj = JSON.stringify(myobj);
  localStorage.setItem(Exp_des.value, MyObj);
  showOnScreen(myobj);
  axios.post("https://crudcrud.com/api/3b2c6ad801d94e1286a220bd17944246/appointData", myobj)
  .then((response) => {
   console.log(response)
  })
   .catch((err) =>{
    console.log(err)
    }) 
}

window.addEventListener("DOMContentLoaded", ()=> {
    axios.get("https://crudcrud.com/api/4b9d1231ab5e41229abd24f29b4afd5a/appointData")
    .then((res) => {
        console.log(res)

        for(var i=0;i<res.data.length;i++)
        {
            showOnScreen(response.data[i])
        }

    })
    .catch( (err) => {
        console.log(err)
    })

})

function showOnScreen(myobj) {
  const parentElement = document.getElementById("listOfExpenses");
  const childElement = document.createElement('li');
  childElement.textContent = myobj.my_amt + ' - ' + myobj.my_des + ' - ' + myobj.my_categ;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'btn btn-danger btn-sm float-right delete';
  deleteButton.appendChild(document.createTextNode('Delete Expense'));
  
  const editButton = document.createElement('button');
  editButton.className = 'btn btn-primary btn-sm float-right edit';
  editButton.appendChild(document.createTextNode('Edit'));
  
  childElement.appendChild(editButton);
  childElement.appendChild(deleteButton);

  parentElement.appendChild(childElement);

  editButton.addEventListener('click', function () {
    localStorage.removeItem(myobj.my_des);
    parentElement.removeChild(childElement);
    document.getElementById('ExpAmt').value = myobj.my_amt;
    document.getElementById('Dsp').value = myobj.my_des;
    document.getElementById('Category').value = myobj.my_categ;
  });
}

function removeItem(e) {
  if (e.target.classList.contains('delete')) {
    if (confirm('Sure man?')) {
      var li = e.target.parentElement;
      item_Id.removeChild(li);
      localStorage.removeItem(Exp_des.value);
    }
  }
}