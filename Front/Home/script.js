const form_inp = document.querySelector("form input")
const form_btn = document.querySelector("form > button")
const span = document.querySelector("#container > span")
const container = document.querySelector("#container")
const a = document.createElement("a");

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

form_inp.onchange = () => {
    span.innerText = ""
    a.remove()
}

form_btn.onclick = async (e) => {
    e.preventDefault()

    if(!form_inp.value) {
        span.innerText = "Please Enter a Url"
        a.remove()
        return
    } 

    if(!isValidUrl(form_inp.value)) {
        span.innerText = "Please Enter a Valid Url"
        return
    }

    const postdata = {
        url: form_inp.value
    } 

    const res = await fetch('/shorten', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postdata)
    })

    const data = await res.json()

    span.innerText = `${data}`;

    a.href = `${data}`;
    a.target ="_blank";
    a.innerText = 'Click';
    container.appendChild(a);
}