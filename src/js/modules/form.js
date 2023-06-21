export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.message = {
            success: 'отправка завершена!',
            loading: 'загрузка',
            failure: 'ошибка отправки данных'
        }
        this.path = '../assets/question.php';
    }

    async postData(url, data) {
        let response = await fetch(url, {
            method: 'POST',
            body: data
        });

        return await response.text();
    }

    init() {
        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let modalStatus = document.createElement('div');
                modalStatus.classList.add('animated', 'fadeIn');

                modalStatus.style.cssText = `
                    width: 200px;
                    height: 200px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #000;
                    color: #fff;
                    border-radius: 10px;
                     
                    display: flex;
                    justify-content: center;
                    align-items: center;
                `;

                modalStatus.textContent = this.message.loading;
                form.append(modalStatus);

                

                const formData = new FormData(form);
                this.postData(this.path, formData)
                    .then(response => {
                        console.log(response);
                        modalStatus.textContent = this.message.success;
                        // if (response.status >= 200 && response.status <= 300) {
                        //     modalStatus.textContent = this.message.success;
                        // } else {
                        //     let err = new Error(response.statusText);
                        //     console.log(err);
                        //     throw err;
                        // }
                    })
                    .catch((error) => {
                        console.log(error);
                        modalStatus.textContent = this.message.failure;
                    })
                    .finally(() => {
                        setTimeout(() => {
                            modalStatus.classList.add('fadeOut');
                            setTimeout(() => modalStatus.remove(), 2000);
                        }, 3000);
                    });
            })
        });
    }
}