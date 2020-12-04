class UI {
    showAlert(message, className) {
        // Create div
        const div = document.createElement('div');
        // Add class
        div.className = `alert ${className}`;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('#container');
        // Get form
        const form = document.querySelector('#login-error');
        // Insert alert
        container.insertBefore(div, form);
        // Timeout after 5 sec
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 5000);
    }
}

function createSession(response) {
    const storage = localStorage;
    let session = [];
    session.push(response);
    storage.setItem("session", JSON.stringify(session));
}

function redirect() {
    window.location.replace("general_data.html");
}

document.querySelector('#login').addEventListener('click', (e) => {
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    const url = `${env}/users/checkUser`;
    const data = {
        "username": username.value,
        "password": password.value
    };
    const ui = new UI();

    if (username.value !== '' && password.value !== '') {
        $.ajax({
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            data: data,
            dataType: "json",
            success: (response) => {
                if (response.status === 401) {
                    ui.showAlert('¡Error! Favor de verificar su usuario, contraseña y que su cuenta esté activa en el sistema', 'alert alert-danger alert-dismissible');
                } else {
                    createSession(response);
                    redirect();
                }
            },
            error: (err) => {
                console.log(err.responseText);
            }
        });
    } else {
        ui.showAlert('El usuario y la contraseña son campos requeridos', 'alert alert-danger alert-dismissible');
    }

    e.preventDefault();
});