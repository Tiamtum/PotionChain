const button = document.querySelector("#submitButton");
const spinner = document.querySelector("#spinner");

const submitText = document.createElement("span");
submitText.id = "submitText";
submitText.append(document.createTextNode("Submit"));
button.appendChild(submitText);
let defaultText = true;

const loadingText = document.createElement("span");
loadingText.id = "loadingText";
loadingText.append(document.createTextNode("Querying Database, please wait..."))

const buttonSpan = document.querySelector("#submitText");
const potionInput = document.querySelector("input[type='text']");
const numberInput = document.querySelector("input[type='number']");

button.addEventListener("click",()=>
{
    if(!potionInput.matches(".form-control:invalid") && !numberInput.matches(".form-control:invalid"))
    {
        spinner.hidden = false;
        button.disabled = true;
        button.replaceChild(loadingText,submitText);  
        defaultText=false;
    }
})

window.addEventListener("pageshow",(evt)=>{
    spinner.hidden = true;
    button.disabled = false;
    if(!defaultText)
    {
        button.replaceChild(submitText,loadingText);  
    }

})