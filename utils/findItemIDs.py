# Script to copy only the relavent IDs from itemIDs.json

import json

IDs = [] 
with open("../herbloreIngredientIDs.txt","r") as IngredientIDs:
    IDs = IngredientIDs.read().split("\n")

def find(item,substr):
    return (item.find(substr)!=-1)

filteredItemIDs = dict()
with open("../itemIDs.json","r") as itemIDs:
    data = json.load(itemIDs)
    for key,value in data.items():
        for ID in IDs:
            if ID==key:
                filteredItemIDs.update({key:value})
        if (((find(value,"potion") or find(value,"Super")) and (find(value,"(3)") or find(value,"(4)")))
              or (find(value,"flask") and find(value,"(6)"))
              #add other desired potions/ingredients here if needed
            ) :
            filteredItemIDs.update({key:value})
    json.dump(filteredItemIDs,open("../filteredItemIDs.json","a"))

