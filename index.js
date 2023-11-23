import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseUrl: "https://we-are-the-champions-5f672-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDb = ref(database, "endorsementList")

const textAreaEl = document.getElementById("text-area")
const publishButtonEl = document.getElementById("publish-btn")
const endorsementListEl = document.getElementById("endorsement-list");


publishButtonEl.addEventListener("click", function() {
    let textAreaValue = textAreaEl.value
    
    push(endorsementListInDb, textAreaValue)

    clearTextAreaEl()

})

    function clearTextAreaEl(){

    textAreaEl.value = ""
}

onValue(endorsementListInDb, function(snapshot) {
    if (snapshot.exists()){
    let itemsArray = Object.entries(snapshot.val())
    
    clearEndorsementListEl()
    
    for (let i = 0; i < itemsArray.length; i++) {
        
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
       
        appendItemToEndorsementListEl(currentItem)
        }
    } else {
        endorsementListEl.innerHTML = "<li>No items here yet...</li>"
    }
})

function clearEndorsementListEl(){
    endorsementListEl.innerHTML = ""
}

function appendItemToEndorsementListEl(item) {

    let itemId = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")

    newEl.textContent = "itemValue"
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDb = ref(database, `endorsementList/${itemId}`)
        remove(exactLocationOfItemInDb)
    })
 

    endorsementListEl.append(newEl)
}

