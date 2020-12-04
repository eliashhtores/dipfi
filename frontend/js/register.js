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
        const form = document.querySelector('#register-error');
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

document.querySelector('#register').addEventListener('click', function (e) {
    const username = document.querySelector('#username').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const confirm_password = document.querySelector('#confirm_password').value;
    const type = 'student';

    const url = `${env}/register`;
    const data = {
        username,
        email,
        password,
        confirm_password
    };
    const ui = new UI();

    if (username !== '' && email !== '' && password !== '' && confirm_password !== '') {
        $.ajax({
            url: url,
            method: "POST",
            data: data,
            dataType: "json",
            success: function (response) {
                createSession(response);
                redirect();
            },
            error: function (err) {
                let errorMessage = '';
                if (err.responseText.includes("confirm")) {
                    errorMessage += 'Las contraseñas no coinciden.';
                }
                if (err.responseText.includes("valid email")) {
                    errorMessage += ' El correo electrónico debe ser válido.';
                }
                if (err.responseText.includes("Duplicate entry")) {
                    errorMessage += ' El número de control ya está registrado en el sistema.';
                }

                console.error(err.responseText);
                toastr.error('Favor de verificar sus datos : ' + errorMessage);
            }
        });
    } else {
        ui.showAlert('Favor de llenar todos los campos', 'alert alert-danger alert-dismissible');
    }

    e.preventDefault();
});