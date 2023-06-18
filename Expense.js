const myExpense=document.querySelector('#my-Expense');
const item_Id=document.getElementById("listOfExpenses"); 

//to add event listeners
myExpense.addEventListener('submit',onSubmit);
item_Id.addEventListener('click', removeItem);

//assiging variables to the values
const Exp_Amt=document.getElementById('ExpAmt');
const Exp_des=document.getElementById('Dsp');
const Exp_categ=document.getElementById('Category');  

    function onSubmit(e)
      {
        
        e.preventDefault();
        console.log(Exp_Amt.value);
        console.log(Exp_des.value);
        console.log(Exp_categ.value);
        let myobj={my_amt: Exp_Amt.value, my_des:Exp_des.value, my_categ:Exp_categ.value};
        let MyObj=JSON.stringify(myobj);
        localStorage.setItem(Exp_des.value, MyObj);
        showOnScreen(myobj);
      }
      function showOnScreen(myobj)
      {
        //e.preventDefault();
        console.log(myobj.my_amt);
        const parentElement=document.getElementById("listOfExpenses");
        const childElement=document.createElement('li');
        //create a delete button
        var DeleteBtn= document.createElement('button');
        DeleteBtn.className='btn btn-danger btn-sm float-right delete';
        DeleteBtn.appendChild(document.createTextNode(' Delete Expense '));

        childElement.textContent=myobj.my_amt+' - '+myobj.my_des+' - '+myobj.my_categ;
        childElement.appendChild(DeleteBtn);
        parentElement.appendChild(childElement);

        //edit
        //edit button
        const editButton=document.createElement('input');
        editButton.type="button";
        editButton.value="Edit";
        editButton.onclick=()=>{
        localStorage.removeItem(Exp_des.value);
        parentElement.removeChild(childElement);
        document.getElementById('ExpAmt').value=Exp_Amt.value;
        document.getElementById('Dsp').value=Exp_des.value;
        document.getElementById('Category').value=Exp_categ.value;
      }
    childElement.appendChild(DeleteBtn);
    childElement.appendChild(editButton);
    parentElement.appendChild(childElement);

        
      }

      function removeItem(e)
     {
    e.preventDefault();
      if(e.target.classList.contains('delete'))
       {
          if(confirm('Sure man?'))
          {
            var li=e.target.parentElement;
            item_Id.removeChild(li);
            
            localStorage.removeItem(Exp_des.value);
          }
        }
       }