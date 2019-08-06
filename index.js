const input = document.querySelector(".form-control");
const submit = document.querySelector(".btn-primary");
const list = document.querySelector(".list");
const reset = document.querySelector(".btn-primary");
submit.addEventListener('click', function() {
    const listNew = document.createElement("li");
    const NewListContent= document.createTextNode(input.value);
    listNew.appendChild(NewListContent);
    list.appendChild(listNew);
})
/*
reset.addEventListener('click',function() {
    const RemoveList= document.querySelectorAll(".list");
    
       
}
*/