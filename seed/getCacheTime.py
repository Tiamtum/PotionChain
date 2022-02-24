import requests
from bs4 import BeautifulSoup

URL = "https://secure.runescape.com/m=itemdb_rs/Super+attack+%283%29/viewitem?obj=145"
page = requests.get(URL)

soup = BeautifulSoup(page.content,"html.parser")

tag = soup.find("div",class_="item-description member").find("img",alt="Super attack (3)")

link = str(tag)

start = link.find("rs/")
end = link.find("_obj_")

cacheTime = link[start+3:end]

print(cacheTime)
