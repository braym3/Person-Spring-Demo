"use strict";


(function() {

    const output = document.getElementById("output");
    const address = "http://localhost:8080";
    // create modal
    let editModal = new bootstrap.Modal(document.getElementById('editModal'));
    let currentId;

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
    function renderPerson({fullName, oldNess, occupation, id}){
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
        deleteBtn.innerHTML = '<i class="fa fa-trash inBtn"></i>';
        deleteBtn.classList.add("btn", "btn-danger", "card-btn");
        deleteBtn.addEventListener('click', () => deletePerson(id));
        personBody.appendChild(deleteBtn);

        // Adding edit button
        const editBtn = document.createElement("button");
        editBtn.innerHTML = '<i class="fa fa-pencil inBtn" style="color: #0d6efc;"></i>';
        editBtn.classList.add("btn", "btn-outline-primary", "card-btn");
        editBtn.addEventListener('click', () => updateModal(id));
        personBody.appendChild(editBtn);

        // Adding it to the page
        personCard.appendChild(personBody);
        person.appendChild(personCard);
        output.appendChild(person);
    }

    async function deletePerson(id) {
        const res = await axios.delete(`${address}/remove/${id}`);
        getPeople();
    }

    async function updateModal(id){
        currentId = id;
        try{
            const personData = await getPerson(id);
            // add event listener to 'save' update button
            const saveBtn = document.getElementById("saveBtn");
            saveBtn.addEventListener('click', () => updatePerson(id));

            editModal.toggle();

            // Set name input value placeholder text
            document.getElementById("updateName").value = personData.fullName;
            // Set age input value placeholder text
            document.getElementById("updateAge").value = personData.oldNess;
            // Set occupation input value placeholder text
            document.getElementById("updateJob").value = personData.occupation;
        } catch (e) {
            console.error(e);
        }
    }

    async function updatePerson(){
        console.log(`selected id = ${currentId}`);

        // get updated input values
        let updatedName = document.getElementById("updateName").value;
        let updatedAge = document.getElementById("updateAge").value;
        let updatedJob = document.getElementById("updateJob").value;
        
        
        const res = await axios.patch(`${address}/update/${currentId}/?name=${updatedName}&age=${updatedAge}&job=${updatedJob}`);
        console.log(`done`);
        window.location.reload();
        getPeople();
    }

    // Get by id
    async function getPerson(id){
        try {
            const res = await axios.get(`${address}/get/${id}`);
            return res.data;
        } catch(e) {
            console.error(e);
        }
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
        };
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