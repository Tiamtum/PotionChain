const checkBoxes = document.querySelectorAll("input[type='checkbox']")
const button = document.querySelector("#uncheck");
let checkedBoxes = 0;

//clear all selected checkboxes and text-muted classes
window.onload = function() {
    for(const checkBox of checkBoxes)
    {
        checkBox.checked = false;
        const label = document.querySelector(`label[for='${checkBox.id}']`);
        if(label)
        {
            label.classList.remove("text-muted"); 
        }
    }
    checkedBoxes=0;
    button.disabled=true;
  };

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

function getTabDepth(checkBox)
{
    const tabDepthRaw = checkBox.nextElementSibling.classList[1];
    if(tabDepthRaw!==undefined)
    {
        const tabDepthInt =  parseInt(tabDepthRaw.slice(3));
        return tabDepthInt;
    }
    else
    {
        return false;
    }
    
}

checkBoxes.forEach((checkBox,idx) => {   
    if(checkBox.checked)
    {
        checkedBoxes+=1;
    }
    checkBox.addEventListener("change",()=>{
        if(checkBox.checked)
        {
            //handle the initially clicked box
            console.log(checkBox.id);
            const label = document.querySelector(`label[for='${checkBox.id}']`);
            label.classList.toggle("text-muted")
            checkedBoxes+=1;
            setButtonState(checkedBoxes)
            
            let tabDepth = getTabDepth(checkBox);
            if(tabDepth)
            {            
                //handle all the 'children' boxes
                for(let i = idx; i<checkBoxes.length-1; i++)
                {
                    if(checkBoxes[i+1] === checkBoxes[checkBoxes.length-1])
                    {
                        const label = document.querySelector(`label[for='${checkBoxes[i+1].id}']`);
                        label.classList.toggle("text-muted");
                        checkBoxes[i+1].checked = true;
                        checkedBoxes+=1;
                        setButtonState(checkedBoxes)
                    }
                    
                    const depth = getTabDepth(checkBoxes[i+1]);
                    if(checkBoxes[i+1].checked === true)
                    {
                        break;
                    }
                    if(depth > tabDepth)
                    {
                        const label = document.querySelector(`label[for='${checkBoxes[i+1].id}']`);
                        label.classList.toggle("text-muted");
                        checkBoxes[i+1].checked = true;
                        checkedBoxes+=1;
                        setButtonState(checkedBoxes)
                    }
                    else
                    {
                        break;
                    }
                }
            }
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

//clear all selected checkboxes and text-muted classes
button.addEventListener("click",()=>{
    checkBoxes.forEach((checkBox,idx) =>{
        if(checkBox.checked)
        {
            const label = document.querySelector(`label[for='${checkBox.id}']`);
            label.classList.toggle("text-muted");
        }
        checkBox.checked=false;
    })
    checkedBoxes=0;
    button.disabled=true;
})


