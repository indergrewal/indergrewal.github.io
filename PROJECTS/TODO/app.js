

let val;
const submit = document.querySelector('.tick');
var inputField= document.querySelector('.new-task');
var fullList= document.querySelectorAll('.cross');
for (let i=0; i<fullList.length;i++)
{
    fullList[i].addEventListener('click',delEl);
}

submit.addEventListener('click', newTask);

function newTask(e)
{

    var inputValue = inputField.value;
    if(inputValue===''|| fullList.length>=9)
    return;
    console.log('VALUE: '+inputValue);
   // document.querySelector('.container').firstElementChild.firstElementChild.firstElementChild.textContent='abcd';
    const item= document.createElement('div');
    item.className='item';
    const task= document.createElement('div');
    task.className='task';
    const details =document.createElement('div');
    details.className= 'details';
    const dlt = document.createElement('div');
    dlt.className= 'delete';
    const cross = document.createElement('button');
    cross.className = 'cross';
    const mis = document.createElement('div');
    mis.textContent='X';
    details.textContent= inputValue;
    item.appendChild(task);
    task.appendChild(details);
    document.querySelector('.container').insertBefore(item, document.querySelector('.container').lastElementChild);
    item.appendChild(dlt);
    dlt.appendChild(cross);
    cross.appendChild(mis);
    inputField.value ='';
    fullList= document.querySelectorAll('.cross');

    for (let i=0; i<fullList.length;i++)
    {
        fullList[i].addEventListener('click',delEl);
    }
}
function delEl(event){
    toRemove= event.target.parentElement.parentElement.parentElement;
    if(toRemove.className==='item')
    {

        toRemove.remove();
    }
        console.log('clicked!!!! ' +toRemove.className);
}