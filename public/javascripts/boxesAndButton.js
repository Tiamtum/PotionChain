const checkBoxes = document.querySelectorAll("input[type='checkbox']")
const button = document.querySelector("#uncheck");
let checkedBoxes = 0;

function setButtonState(checkedBoxes)
{
    if(checkedBoxes===0)
    {
        button.disabled=true;
    }
    else
    {
        button.disabled=false;
    } 
}

checkBoxes.forEach(checkBox => {   
    if(checkBox.checked)
    {
        checkedBoxes+=1;
    }
    checkBox.addEventListener("change",()=>{
        if(checkBox.checked)
        {
            const label = document.querySelector(`label[for='${checkBox.id}']`);
            label.classList.toggle("text-muted");
            checkedBoxes+=1;
            setButtonState(checkedBoxes)
        }
        else
        {
            const label = document.querySelector(`label[for='${checkBox.id}']`);
            label.classList.toggle("text-muted")
            checkedBoxes-=1;
            setButtonState(checkedBoxes)
        }
    })
    setButtonState(checkedBoxes)
})

button.addEventListener("click",()=>{
    const checkBoxes = document.querySelectorAll("input[type='checkbox']")
    checkBoxes.forEach(checkBox =>{
        checkBox.checked=false;
    })
    checkedBoxes=0;
    button.disabled=true;
})