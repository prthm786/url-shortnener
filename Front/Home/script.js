const form_inp = document.querySelector("form input");
const form_btn = document.querySelector("form > button");
const container = document.querySelector("#container");
const span = document.createElement("span");
const a = document.createElement("a");
const btn = document.createElement("button");
const div = document.createElement("div");

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

form_inp.onchange = () => {
    span.innerText = "";
    a.remove();
    div.remove();
}

form_btn.onclick = async (e) => {
    e.preventDefault();

    if(!form_inp.value) {
        span.innerText = "Please Enter a Url";
        a.remove();
        return;
    } 

    if(!isValidUrl(form_inp.value)) {
        span.innerText = "Please Enter a Valid Url";
        return;
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

    const data = await res.json();

    span.innerText = `${data}`;
    div.appendChild(span);

    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"></path></svg>';
    div.appendChild(btn);

    container.appendChild(div);

    a.href = `${data}`;
    a.target ="_blank";
    a.innerText = 'Click';
    container.appendChild(a);

    btn.onclick = () => {
        function copyToClipboard(text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';
            
            document.body.appendChild(textarea);            
            textarea.select();
            document.execCommand('copy');            
            document.body.removeChild(textarea);
          }
          
          copyToClipboard(`${data}`);
          
          btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>';

          setTimeout(() => {
                btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512"><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"></path></svg>';
          },2000)
    }
}