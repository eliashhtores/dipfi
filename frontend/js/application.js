const env = "http://localhost:3000";

let session = {};

function getSessionData() {
    const storage = localStorage;
    if (storage.getItem("session")) {
        session = JSON.parse(storage.getItem("session"));
        // document.querySelector('#user').innerHTML = session[0].name;
        // setAdminLink(session);
        return true;
    } else {
        console.log('Session not found, redirecting...');
        window.location.replace("index.html");
        return false;
    }
}

function loadEventListeners() {
    document.querySelector('#exit').addEventListener('click', () => {
        console.log('Deleting session...');
        localStorage.clear();
        window.location.replace("index.html");
    });
}

// function setAdminLink(session) {
//     if (session[0].role_id == 1) {
//         document.querySelector('#dashboard').setAttribute("href", "dashboard.php");
//     }
// }