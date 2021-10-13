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
            //TODO: when you click on a parent ingredient, all the children ingredient should also be checked.
            //Idea: suppose a tab3 ingredient was clicked. then, check all boxes up to the next tab3 ingredient, etc.  
            let tabDepth = getTabDepth(checkBox);
            if(tabDepth)
            {            
                console.log("tabDepth = ", tabDepth);
                for(let i = idx; i<checkBoxes.length-1; i++)
                {
                    const depth = getTabDepth(checkBoxes[i+1]);
                    console.log("depth: ",depth)
                    if(checkBoxes[i+1].checked === true)
                    {
                        break;
                    }
                    if(depth > tabDepth)
                    {
                        console.log("depth !== tabDepth", depth !== tabDepth)
                        const label = document.querySelector(`label[for='${checkBoxes[i+1].id}']`);
                        console.log("label.innerText",label.innerText );                  

                        checkBoxes[i+1].checked = true;
                        label.classList.toggle("text-muted");
                        checkedBoxes+=1;
                        setButtonState(checkedBoxes)

                    }
                    else
                    {
                        break;
                    }
                }
            }

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


