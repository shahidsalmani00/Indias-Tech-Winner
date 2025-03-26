let url = 'https://script.google.com/macros/s/AKfycbwZSMrHPHI-Fng4_UOtpamq3x4BUsqDCEYKfJb9Dh3urK80_hGqkwxAK2tuOdfD0dQqQg/exec';
let form = document.querySelector('#contact-form');

form.addEventListener("submit", (e) => {
    let d = new FormData(form);
    fetch(url, {
        method: "POST",
        body: d
    })
    .then((res) => res.text())
    .then((finalRes) => console.log(finalRes));

    e.preventDefault();
});
 


// For the Subscribe the mails 

const scriptURL = 'https://script.google.com/macros/s/AKfycbwpyTZVwdP2rHhl_SzvbY2mNL8QobF7I-CEmKQ24K0/dev'
// const form1 = document.forms['submit-to-google-sheet']

// form.addEventListener('submit', e => {
//   e.preventDefault()
//   fetch(scriptURL, { method: 'POST', body: new FormData(form)})
//     .then(response => console.log('Success!', response))
//     .catch(error => console.error('Error!', error.message))
// });

let form1 = document.querySelector('#newsletter-form');

form1.addEventListener("submit", (g) => {
    let f = new FormData(form);
    fetch(url, {
        method: "POST",
        body: f
    })
    .then((res) => res.text())
    .then((finalRes) => console.log(finalRes));

    g.preventDefault();
});

