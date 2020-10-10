import {$} from './plugins/base'
import './plugins/confirm'
import './plugins/modal'

// Get users
const users = fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())

// Create html of user
const toHTML = user =>{
    return `
        <div class="col-lg-4 mb-3">
            <div class="card">
                 <div class="card-body">
                      <h5 class="card-title">${user.name}</h5>
                      <p class="card-text">${user.phone}</p>
                      <p class="card-text">${user.email}</p>
                      <p>
                          <a href="#" data-type="info" data-id="${user.id}" class="btn btn-primary">Show more info</a>
                          <a href="#" data-type="remove" data-id="${user.id}" class="btn btn-danger">Delete</a>
                      </p>
                 </div>
            </div>
        </div>
    `
}

function render(json) {
    const html = json.map(toHTML).join('')
    document.querySelector('.users-wrap').innerHTML = html;
}

// Render users
users.then(render)

// Add modal to user card
document.addEventListener('click', event => {
    event.preventDefault()
    const type = event.target.dataset.type;
    const id = +event.target.dataset.id;
    if ( type === 'info' ) {
        users.then(json => {
            const $user = json.filter( user => user.id === id )[0]
            modalTest.setTitle(`<h5>User info</h5>`)
            modalTest.setContent(`
                <h5 class="card-title">${$user.name}</h5>
                <p class="card-text">${$user.phone}</p>
                <p class="card-text">${$user.email}</p>
            `)
            modalTest.open()
        })
    } else if (type === 'remove') {
        users.then(json => {
            const $user = json.filter( user => user.id === id )[0]
            $.confirm({
                title: 'Remove Modal',
                content: `
                    <p>Do wont to delete card <strong>${$user.name}</strong></p>
                `
            })
                .then(()=>{
                    let users = json.filter( user => user.id !== id )
                    render(users)
                })
                .catch((error)=>{
                    console.log(error)
                })
        })

    }
})


const modalTest = $.modal({
    title: 'Test title',
    width: '500px',
    closable: true,
    footerButtons: [
        {
            text: 'Ok', type: 'primary', handler() {
                modalTest.close()
            }
        },
    ]
})