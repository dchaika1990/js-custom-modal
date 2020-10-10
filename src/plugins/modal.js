import {$} from './base';

function noob() {
}

function _createFooter(options = []) {
    if (options.length < 0) return true
    const footer = document.createElement('div')
    footer.classList.add('modalCustom-footer')
    options.forEach(btn => {
        const button = document.createElement('button')
        button.classList.add('btn')
        button.classList.add(`btn-${btn.type}`)
        button.textContent = btn.text
        const handlerFoo = btn.handler ? btn.handler : noob
        button.addEventListener('click', handlerFoo)
        footer.appendChild(button)
    })
    return footer
}

function _createModal(options) {
    const modal = document.createElement('div')
    modal.classList.add('modalCustom')
    const footer = _createFooter(options.footerButtons);
    modal.insertAdjacentHTML('beforeend', `
         <div ${options.closable ? 'data-close="true"' : ''} class="modalCustom-overlay">
            <div data-modal class="modalCustom-modal" style="width: ${options.width || '400px'}">
                ${options.closable ? `<span data-close="true" class="modalCustom-close">x</span>` : ''}
                <div data-title class="modalCustom-title">${options.title || 'Window'}</div>
                <div data-content class="modalCustom-body">${options.content || ''}</div>
            </div>
        </div>
    `)
    modal.querySelector('[data-modal]').appendChild(footer)
    document.body.appendChild(modal);
    return modal
}

$.modal = function (options) {
    const $modal = _createModal(options);
    const modal = {
        open() {
            $modal.classList.add('show')
        },
        close() {
            $modal.classList.remove('show')
            setTimeout(()=> {
                if ( typeof options.onClose() === 'function' ) {
                    options.onClose()
                }
            }, 400)
        }
    }

    const listener = function (event) {
        event.preventDefault();
        event.target.dataset.close && modal.close();
    }

    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        setTitle(content) {
            $modal.querySelector('[data-title]').innerHTML = content
        },
        setContent(content) {
            $modal.querySelector('[data-content]').innerHTML = content
        },
        destroy(){
            $modal.parentNode.removeChild($modal)
        }
    });
}