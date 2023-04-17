"use strict";


(function() {

    const output = document.getElementById("output");
    const address = "http://localhost:8080";

    // Get all
    async function getPeople(){
        try {
            // clear
            output.innerHTML = "";
            const res = await axios.get(`${address}/getAll`);
            res.data.forEach(person => renderPerson(person));
        } catch(e) {
            console.error(e);
        }
    }

    // Render person
    function renderPerson({fullName, oldNess, occupation}){
        const person = document.createElement("div");
        person.classList.add("col");
        const personCard = document.createElement("div");
        personCard.classList.add("card");

        const personBody = document.createElement("div");
        personBody.classList.add("card-body");

        // Adding full name
        const personName = document.createElement("p");
        personName.innerText = `Name: ${fullName}`;
        personName.classList.add("card-text");
        personBody.appendChild(personName);

        // Adding oldNess
        const personAge = document.createElement("p");
        personAge.innerText = `Oldness: ${oldNess}`;
        personAge.classList.add("card-text");
        personBody.appendChild(personAge);

        // Adding occupation
        const personOccupation = document.createElement("p");
        personOccupation.innerText = `Occupation: ${occupation}`;
        personOccupation.classList.add("card-text");
        personBody.appendChild(personOccupation);

        // Adding delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = 'DELETE';
        deleteBtn.classList.add("btn", "btn-danger");
        deleteBtn.addEventListener('click', () => deletePerson(id));
        personBody.appendChild(deleteBtn);
        personCard.appendChild(personBody);
        person.appendChild(personCard);

        // Adding it to the page
        output.appendChild(person);
    }

    async function deletePerson(id) {
        const res = await axios.delete(`${address}/remove/${id}`);
        getPeople();
    }


    // Create person
    document.getElementById("personForm").addEventListener("submit", async function(e) {
        e.preventDefault();
        const {fullName, oldNess, occupation, notNiNumber} = this;
        
        const newPerson = {
            fullName: fullName.value,
            oldNess: oldNess.value,
            occupation: occupation.value,
            notNiNumber: notNiNumber.value
        }
        this.reset();
        fullName.focus();
        try {
            const res = await axios.post(`${address}/create`, newPerson);
            getPeople();
        } catch(error) {
            console.error(error);
        }
    });

    getPeople();


})();