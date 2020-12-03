loadEventListeners();
// const validSession = getSessionData();
// let id;

// if (validSession) {
//     id = session[0].user.id;
// }

document.addEventListener("DOMContentLoaded", () => {
    loadSubjects('first');
    loadActivities('first');
    loadSubjects('second');
    loadActivities('second');
});


document.querySelector('#yesThesis').addEventListener('click', () => {
    document.querySelector('#thesisPercentage').disabled = false;
});

document.querySelector('#noThesis').addEventListener('click', () => {
    document.querySelector('#thesisPercentage').disabled = true;
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
    console.log(data);

    e.preventDefault();
});

function loadSubjects(semester) {
    const url = `${env}/subjects`;
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function (response) {
            let htmlFirst = '';
            let htmlSecond = '';
            let htmlThird = '';
            let htmlFourth = '';
            let htmlFifth = '';
            let htmlSixth = '';
            let row = '';
            response.map((subject) => {
                let firstSemesterSubjects, secondSemesterSubjects, thirdSemesterSubjects,
                    fourthSemesterSubjects, fifthSemesterSubjects, sixthSemesterSubjects;

                switch (subject.semester) {
                    case 1:
                        semester == 'first' ? firstSemesterSubjects = 'firstSemesterSubjects' : firstSemesterSubjects = 'firstSemesterSubjectsNext';
                        row = document.querySelector('#' + firstSemesterSubjects);
                        htmlFirst += `
                        <div class="form-group form-row">
                            <div class="col offset-3">
                                ${subject.name}
                            </div>
                            <div class="col text-center">
                                <input type="checkbox" class="form-check-input" name="subject-${subject.id}" id="subject-${subject.id}">
                            </div>
                            <div class="col">
                                ${subject.credits}
                            </div>
                        </div>
                    `;
                        row.innerHTML = htmlFirst;
                        break;
                    case 2:
                        semester == 'first' ? secondSemesterSubjects = 'secondSemesterSubjects' : secondSemesterSubjects = 'secondSemesterSubjectsNext';
                        row = document.querySelector('#' + secondSemesterSubjects);
                        htmlSecond += `
                                <div class="form-group form-row">
                                    <div class="col offset-3">
                                        ${subject.name}
                                    </div>
                                    <div class="col text-center">
                                        <input type="checkbox" class="form-check-input" name="subject-${subject.id}" id="subject-${subject.id}">
                                    </div>
                                    <div class="col">
                                        ${subject.credits}
                                    </div>
                                </div>
                            `;
                        row.innerHTML = htmlSecond;
                        break;
                    case 3:
                        semester == 'first' ? thirdSemesterSubjects = 'thirdSemesterSubjects' : thirdSemesterSubjects = 'thirdSemesterSubjectsNext';
                        row = document.querySelector('#' + thirdSemesterSubjects);
                        htmlThird += `
                                <div class="form-group form-row">
                                    <div class="col offset-3">
                                        ${subject.name}
                                    </div>
                                    <div class="col text-center">
                                        <input type="checkbox" class="form-check-input" name="subject-${subject.id}" id="subject-${subject.id}">
                                    </div>
                                    <div class="col">
                                        ${subject.credits}
                                    </div>
                                </div>
                            `;
                        row.innerHTML = htmlThird;
                        break;
                    case 4:
                        semester == 'first' ? fourthSemesterSubjects = 'fourthSemesterSubjects' : fourthSemesterSubjects = 'fourthSemesterSubjectsNext';
                        row = document.querySelector('#' + fourthSemesterSubjects);
                        htmlFourth += `
                                    <div class="form-group form-row">
                                        <div class="col offset-3">
                                            ${subject.name}
                                        </div>
                                        <div class="col text-center">
                                            <input type="checkbox" class="form-check-input" name="subject-${subject.id}" id="subject-${subject.id}">
                                        </div>
                                        <div class="col">
                                            ${subject.credits}
                                        </div>
                                    </div>
                                `;
                        row.innerHTML = htmlFourth;
                        break;
                    case 5:
                        semester == 'first' ? fifthSemesterSubjects = 'fifthSemesterSubjects' : fifthSemesterSubjects = 'fifthSemesterSubjectsNext';
                        row = document.querySelector('#' + fifthSemesterSubjects);
                        htmlFifth += `
                                    <div class="form-group form-row">
                                        <div class="col offset-3">
                                            ${subject.name}
                                        </div>
                                        <div class="col text-center">
                                            <input type="checkbox" class="form-check-input" name="subject-${subject.id}" id="subject-${subject.id}">
                                        </div>
                                        <div class="col">
                                            ${subject.credits}
                                        </div>
                                    </div>
                                `;
                        row.innerHTML = htmlFifth;
                        break;
                    default:
                        semester == 'first' ? sixthSemesterSubjects = 'sixthSemesterSubjects' : sixthSemesterSubjects = 'sixthSemesterSubjectsNext';
                        row = document.querySelector('#' + sixthSemesterSubjects);
                        htmlSixth += `
                                    <div class="form-group form-row">
                                        <div class="col offset-3">
                                            ${subject.name}
                                        </div>
                                        <div class="col text-center">
                                            <input type="checkbox" class="form-check-input" name="subject-${subject.id}" id="subject-${subject.id}">
                                        </div>
                                        <div class="col">
                                            ${subject.credits}
                                        </div>
                                    </div>
                                `;
                        row.innerHTML = htmlSixth;
                        break;
                }
            });
        },
        error: function (err) {
            console.log(err.responseText.errors);
            toastr.error('Ocurrió un error, favor de intentar más tarde');
        }
    });
}

function loadActivities(semester) {
    const url = `${env}/activities`;
    const activities = semester == 'first' ? 'firstActivities' : 'secondActivities';
    let html = '';
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function (response) {
            response.data.forEach(activity => {
                row = document.querySelector('#' + activities);
                html += `
                            <div class="form-group form-row">
                                <div class="col offset-3">
                                    ${activity.name}
                                </div>
                                <div class="col mr-3">
                                    <input type="checkbox" class="form-check-input" name="activity-${activity.id}" id="activity-${activity.id}">
                                </div>
                            </div>
                        `;
                row.innerHTML = html;
            });
        },
        error: function (err) {
            console.log(err.responseText.errors);
            toastr.error('Ocurrió un error, favor de intentar más tarde');
        }
    });
}