function checkName() {
    var name = document.getElementById("name");
    var naRegx = /^([a-z A-Z]+)$/;
    if (name.value.trim() == "") {
        document.getElementById("lb1").innerHTML = "Invalid";
        document.getElementById("lb1").style.display = "inline";
        name.style.border = "2px solid red";
        return false;
    }
    else if (naRegx.test(name.value.trim())) {
        name.style.border = "1px solid #e1e1e1";
        document.getElementById("lb1").style.display = "none";
        return true;
    }
    else {
        document.getElementById("lb1").innerHTML = "Invalid";
        document.getElementById("lb1").style.display = "inline";
        name.style.border = "2px solid red";
        return false;
    }
}

function checkWork() {
    var company = document.getElementById("company");
    var caRegx = /^([a-z A-Z 0-9]+)$/;
    if (company.value.trim() == "") {
        document.getElementById("lb2").innerHTML = "Invalid";
        document.getElementById("lb2").style.display = "inline";
        company.style.border = "2px solid red";
        return false;
    }
    else if (caRegx.test(company.value.trim())) {
        company.style.border = "1px solid #e1e1e1";
        document.getElementById("lb2").style.display = "none";
        return true;
    }
    else {
        document.getElementById("lb2").innerHTML = "Invalid";
        document.getElementById("lb2").style.display = "inline";
        company.style.border = "2px solid red";
        return false;
    }
}

function checkItems() {
    var number_of_items = document.getElementById("number_of_items");
    var item_display = document.getElementById("item_display");
    let html = "";
    var checkRegx = /^([0-9]+)$/;
    if (number_of_items.value.trim() == "") {
        document.getElementById("lb3").innerHTML = "Invalid";
        document.getElementById("lb3").style.display = "inline";
        number_of_items.style.border = "2px solid red";
        return false;
    }
    else if (checkRegx.test(number_of_items.value.trim())) {
        number_of_items.style.border = "1px solid #e1e1e1";
        document.getElementById("lb3").style.display = "none";
        return true;
    }
    else {
        document.getElementById("lb3").innerHTML = "Invalid";
        document.getElementById("lb3").style.display = "inline";
        number_of_items.style.border = "2px solid red";
        return false;
    }
}

function show() {
    if (checkItems() == true) {
        var number_of_items = document.getElementById("number_of_items");
        var item_display = document.getElementById("item_display");
        let html = "";
        var no_of_items = parseInt(number_of_items.value);
        let i;
        for (i = 1; i <= no_of_items; i++) {
            html += `<br>
                <label><b>Item ${i}</b></label>
                <br>
                <input type="text" id="item${i}" name="item${i}" class="form-control" placeholder="Item description">
                <br>
                <input type="text" id="quantity${i}" name="quantity${i}" class="form-control" placeholder="Quantity">
                <br>
                <br>`;
        }
        item_display.innerHTML = html;
        item_display.style.display = 'block';
    }
}

window.onload = function () {
    document.getElementById('number_of_items').addEventListener('input', show);
}

function submitData() {
    let name = document.getElementById('name').value;
    let company = document.getElementById('company').value;
    let number_of_items = document.getElementById('number_of_items').value;
    let items = [];
    let i;
    if (checkName() == true && checkWork() == true && checkItems() == true) {
        for (i = 1; i <= parseInt(number_of_items); i++) {

            items.push({
                item: document.getElementById(`item${i}`).value,
                quantity: document.getElementById(`quantity${i}`).value
            });
        }
        fetch('http://localhost:5500/postData',
            {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ name: name, company: company, number_of_items: number_of_items, items: items })
            })
            .then((response) => response.json())
            .then((data) => {
                location.href = "successfull.html";
            });
    }
}