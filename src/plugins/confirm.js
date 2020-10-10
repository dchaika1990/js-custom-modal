import {$} from "./base";

$.confirm = function (options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            content: options.content,
            closable: false,
            width: '500px',
            onClose(){
                modal.destroy()
            },
            footerButtons: [
                {
                    text: 'Ok', type: 'primary', handler() {
                        modal.close()
                        resolve()
                    }
                },
                {
                    text: 'Cancel', type: 'danger', handler() {
                        modal.close()
                        reject()
                    }
                },
            ]
        })
        setTimeout(() => modal.open(), 150)
    })
}