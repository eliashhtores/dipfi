loadEventListeners();
const state = document.querySelector('#state');
const validSession = getSessionData();
let id;

if (validSession) {
    id = session[0].user.id;
}

document.addEventListener("DOMContentLoaded", () => {
    const url = `${env}/userDetail/${id}`;

    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function (response) {
            if (response !== null) {
                document.querySelector('#firstName').value = response.userDetail.firstName;
                document.querySelector('#lastName').value = response.userDetail.lastName;
                document.querySelector('#address1').value = response.userDetail.address1;
                document.querySelector('#address2').value = response.userDetail.address2;
                document.querySelector('#street_num').value = response.userDetail.street_num;
                document.querySelector('#apartment_num').value = response.userDetail.apartment_num;
                document.querySelector('#zipCode').value = response.userDetail.zipCode;
                document.querySelector('#city').value = response.userDetail.city;
                document.querySelector('#state').value = response.userDetail.state;
                document.querySelector('#country').value = response.userDetail.country;
                document.querySelector('#scholarshipHolder').value = response.userDetail.scholarshipHolder;
                document.querySelector('#workplace').value = response.userDetail.workplace;
                document.querySelector('#semester').value = response.userDetail.semester;
                document.querySelector('#phone').value = response.userDetail.phone;
                document.querySelector('#cellphone').value = response.userDetail.cellphone;

                if (response.userDetail.country === 'México') {
                    state.disabled = false
                    document.querySelector('#state').value = response.userDetail.state;
                }
            }
        },
        error: function (err) {
            console.log(err.responseText.errors);
            toastr.error('Ocurrió un error, favor de intentar más tarde');
        }
    });

    loadCountries();
    loadMexicanStates();
});

document.querySelector('#country').addEventListener('change', (e) => {
    if (e.target.value === 'México') {
        state.disabled = false
    } else {
        state.disabled = true;
        state.value = "";
    }
});

document.querySelector('form').addEventListener('submit', function (e) {
    let data = {};
    const user_id = id;
    const url = `${env}/userDetail`;
    const form = $(this).serializeArray();

    data['user_id'] = user_id;
    form.map((element => {
        data[element.name] = element.value;
    }));
    $.ajax({
        url: url,
        data: data,
        method: "POST",
        dataType: "json",
        success: function (response) {
            console.log(response);
            window.location.replace("report.html");
        },
        error: function (err) {
            console.error(err);
            toastr.error('Ocurrió un error, favor de intentar más tarde');
        }
    });

    e.preventDefault();
});

function loadMexicanStates() {
    const mexicanStates = ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Ciudad de México', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'];

    for (let state in mexicanStates) {
        let option = document.createElement("option");

        option.setAttribute('value', mexicanStates[state]);
        option.innerHTML = mexicanStates[state];
        document.querySelector('#state').appendChild(option);
    }
}

function loadCountries() {
    const countries = ['Afganistán', 'Albania', 'Alemania', 'Andorra', 'Angola', 'Antigua y Barbuda', 'Arabia Saudita', 'Argelia', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaiyán', 'Bahamas', 'Bangladés', 'Barbados', 'Baréin', 'Bélgica', 'Belice', 'Benín', 'Bielorrusia', 'Birmania', 'Bolivia', 'Bosnia y Herzegovina', 'Botsuana', 'Brasil', 'Brunéi', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Bután', 'Cabo Verde', 'Camboya', 'Camerún', 'Canadá', 'Catar', 'Chad', 'Chequia', 'Chile', 'China', 'Chipre', 'Ciudad del Vaticano', 'Colombia', 'Comoras', 'Corea del Norte', 'Corea del Sur', 'Costa de Marfil', 'Costa Rica', 'Croacia', 'Cuba', 'Dinamarca', 'Dominica', 'Ecuador', 'Egipto', 'El Salvador', 'Emiratos Árabes Unidos', 'Eritrea', 'Eslovaquia', 'Eslovenia', 'España', 'Estados Unidos', 'Estonia', 'Etiopía', 'Filipinas', 'Finlandia', 'Fiyi', 'Francia', 'Gabón', 'Gambia', 'Georgia', 'Ghana', 'Granada', 'Grecia', 'Guatemala', 'Guyana', 'Guinea', 'Guinea ecuatorial', 'Guinea-Bisáu', 'Haití', 'Honduras', 'Hungría', 'India', 'Indonesia', 'Irak', 'Irán', 'Irlanda', 'Islandia', 'Islas Marshall', 'Islas Salomón', 'Israel', 'Italia', 'Jamaica', 'Japón', 'Jordania', 'Kazajistán', 'Kenia', 'Kirguistán', 'Kiribati', 'Kuwait', 'Laos', 'Lesoto', 'Letonia', 'Líbano', 'Liberia', 'Libia', 'Liechtenstein', 'Lituania', 'Luxemburgo', 'Macedonia del Norte', 'Madagascar', 'Malasia', 'Malaui', 'Maldivas', 'Malí', 'Malta', 'Marruecos', 'Mauricio', 'Mauritania', 'México', 'Micronesia', 'Moldavia', 'Mónaco', 'Mongolia', 'Montenegro', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Nicaragua', 'Níger', 'Nigeria', 'Noruega', 'Nueva Zelanda', 'Omán', 'Países Bajos', 'Pakistán', 'Palaos', 'Panamá', 'Papúa Nueva Guinea', 'Paraguay', 'Perú', 'Polonia', 'Portugal', 'Reino Unido', 'República Centroafricana', 'República del Congo', 'República Democrática del Congo', 'República Dominicana', 'Ruanda', 'Rumanía', 'Rusia', 'Samoa', 'San Cristóbal y Nieves', 'San Marino', 'San Vicente y las Granadinas', 'Santa Lucía', 'Santo Tomé y Príncipe', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leona', 'Singapur', 'Siria', 'Somalia', 'Sri Lanka', 'Suazilandia', 'Sudáfrica', 'Sudán', 'Sudán del Sur', 'Suecia', 'Suiza', 'Surinam', 'Tailandia', 'Tanzania', 'Tayikistán', 'Timor Oriental', 'Togo', 'Tonga', 'Trinidad y Tobago', 'Túnez', 'Turkmenistán', 'Turquía', 'Tuvalu', 'Ucrania', 'Uganda', 'Uruguay', 'Uzbekistán', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Yibuti', 'Zambia', 'Zimbabue'];

    for (let country in countries) {
        let option = document.createElement("option");

        option.setAttribute('value', countries[country]);
        option.innerHTML = countries[country];
        document.querySelector('#country').appendChild(option);
    }
}
