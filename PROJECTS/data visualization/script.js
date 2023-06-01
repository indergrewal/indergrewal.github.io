const dataTable = document.querySelector('.dataTable');
var rowCount=5;
var idCount=5;
document.querySelector('.addNew').addEventListener('click',()=>{

if (rowCount<10) {
    var newRow = document.createElement("tr");
    rowCount++;
    newRow.innerHTML= `<td><input type="text" class="itemName" id="i${idCount}" value="New Item ${idCount-4}"></td>
    <td><input type="number" class="valueNumber" id="v${idCount}" value="${rowCount}"></td>
    <td><button class="deleteButton" onclick="deleteRow(this)">X</button></td>
    `;
    dataTable.appendChild(newRow);
    idCount++;
    if(rowCount===10)
    {
        document.querySelector('.addNew').style.opacity="0";
    }
}



    // deleteRow();


});


function deleteRow(b) {

    b.parentElement.parentElement.remove();
    rowCount--;
    document.querySelector('.addNew').style.opacity="0.25";

}

document.querySelector('.visualize').addEventListener('click',()=>{
    visualize();
})


visualize();

function visualize() {
    var rows = Array.from(document.querySelectorAll('.itemName'),element=> element.value);
    var value = Array.from(document.querySelectorAll('.valueNumber'),element=> element.value);
    // var colorBlock = Array.from(document.querySelectorAll('.colorBlock'));
    // var nameBlock = Array.from(document.querySelectorAll('.nameBlock'));
    var legend = document.querySelector('.legend');
    legend.innerHTML= ``;
    legend.textContent="Legend";
    var sum = value.map(Number).reduce((a,b)=> a+b,0);
    console.log("SUM = "+(sum/value[0]));
    var map = document.querySelector('.mappingArea');
    var names = document.querySelector('.names');
    map.innerHTML=``;
    names.innerHTML=``;
    document.querySelector('.labelY').textContent= document.querySelector('.nameY').value;
    document.querySelector('.labelX').textContent= document.querySelector('.nameX').value;

    var canvas = document.querySelector('.canvas');
    var ctx= canvas.getContext('2d');
    var x= canvas.width/2;
    var y= canvas.height/2;

console.log("w "+ canvas.width +" h "+ canvas.height);

    var radius= canvas.height/2.5;
    var startAngle= 0;

    var  pieColors=['crimson',
    'darkcyan',
    'yellow',
    'seagreen',
    'rgb(212, 92, 0)',
    'cyan',
    'darkgoldenrod',
    'brown',
    'turquoise',
    'rgb(164, 55, 113)',
    'darkcyan',
    'crimson',
    'seagreen',
    'rgb(212, 92, 0)',
    'darkgoldenrod'];

    // console.log("rdtfhyjk");
    var max = Math.max(...value);
    // console.log("max "+max);
    // console.log("uuuuuu");
    var top= (Math.ceil(max/25))*25;
    readings(top);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.imageSmoothingEnabled= true;
    for (let i = 0; i < rowCount; i++) {

        var bar = document.createElement("div");
        bar.id= "bar"+(i+1);
        bar.className="bar";
        bar.style.height=(value[i]/top)*100+"%";
        // console.log(value[i]);
        map.appendChild(bar);
        var n= document.createElement("div");
        n.className= "barName";
        n.textContent=rows[i];
        names.appendChild(n);

    let percentage = (value[i]/sum);
    let sliceAngle= 2*Math.PI* percentage;
    console.log("st "+ startAngle +" sc "+ sliceAngle +" p "+percentage);
    ctx.beginPath();
    ctx.moveTo(x,y);

    ctx.arc(x, y, radius, startAngle, startAngle + sliceAngle);
    // ctx.arc(x,y, 50, 0, percentage*2*Math.PI );
    ctx.lineTo(x,y);
    ctx.closePath();
    ctx.fillStyle= pieColors[i];
    // ctx.lineWidth=5;
    ctx.fill();
    startAngle+=sliceAngle;

    var lChild = document.createElement('div');
    lChild.className = "lChild";
    legend.appendChild(lChild);

    var colorBlock = document.createElement('div');
    colorBlock.className = "colorBlock";
    lChild.appendChild(colorBlock);

    var nameBlock = document.createElement('div');
    nameBlock.className = "nameBlock";
    lChild.appendChild(nameBlock);

    colorBlock.style.backgroundColor = pieColors[i];
    nameBlock.textContent = rows[i];

    }

}

function readings(m) {
    var readingElements= document.querySelectorAll('.scale');

// console.log("TOP "+m);

    var multiplier=m/5;
    var j=1;
    for (let i = 4; i>=0; i--) {

        readingElements[i].textContent=multiplier*j;
        j++;

    }
}

