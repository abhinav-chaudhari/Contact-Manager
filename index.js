document.addEventListener("DOMContentLoaded", function(){
    loadContacts()
})

function addContact(){
    const name = document.getElementById('name').value
    const phone = document.getElementById('phone').value
    if(name&& phone){
        const contact = {
            name: name,
            phone: phone
        }
    
    if(localStorage.getItem("contacts")){
        let contacts = JSON.parse(localStorage.getItem("contacts"));
        contacts.push(contact)
        localStorage.setItem("contacts", JSON.stringify(contacts))

    }else {
        localStorage.setItem("contacts", JSON.stringify(contact))
    }

    document.getElementById('name').value = ""
    document.getElementById('phone').value = ""

    loadContacts()
}else {
    alert("please Enter both name and phone")
}
}

function loadContacts(){
    const contactList = document.getElementById('contactList')
    contactList.innerHTML = ""

    if(localStorage.getItem("contacts")){
        const contacts = JSON.parse(localStorage.getItem("contacts"));

        contacts.forEach(function(contact, index){
            const li = document.createElement("li");
            li.textContent = contact.name + " " + contact.phone

            const deleteBtn = document.createElement("button")
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", function(){
                deleteContact(index)
            })
            li.appendChild(deleteBtn)

            const updateBtn = document.createElement("button")
            updateBtn.textContent = "Update"
            updateBtn.addEventListener("click", function(){
                updateContact(index)
            })
            li.appendChild(updateBtn)
            contactList.append(li)
            
        })
    }
}

function deleteContact(index){
    const contacts = JSON.parse(localStorage.getItem("contacts"))
    contacts.splice(index, 1)
    localStorage.setItem("contacts", JSON.stringify(contacts))
    loadContacts();
}

function updateContact(index){
    const newName = prompt("Enter new Name ")
    const newPhone = prompt("Enter new Phone")

    if(newName && newPhone){
        const contacts= JSON.parse(localStorage.getItem("contacts"))
        contacts[index].name = newName;
        contacts[index].phone = newPhone;
        localStorage.setItem("contacts", JSON.stringify(contacts))
        loadContacts()
    }else{
        alert("please Enter both name and number")
    }
}