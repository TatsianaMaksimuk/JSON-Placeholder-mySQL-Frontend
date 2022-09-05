const apiBaseUrl = "http://localhost:4500/api/users";
const apiAllUsersUrl = "http://localhost:4500/api/users/sql/all";
const apiUserByIdUrl = "http://localhost:4500/api/users/sql/id/";

const clearResponseText = () => {
    document.getElementById('response').innerText = '';
}

const isValidJSON = (str) => {
    try {
        JSON.parse(str);
        return true
    } catch (e) {
        return false;
    }
}

const clearAllInputs = () => {
    document.getElementById('name').value = '';
    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('userId').value = '';
    document.getElementById('website').value = '';
    document.getElementById('phone').value = '';

}

const allUsersMethods = (
    method //Get, post,delete
) => {

    //check if method provided is valid
    if (!['GET', 'POST', 'DELETE'].includes(method)) {
        alert('Invalid method used for request all Users')
        return;
    }

    fetch(apiAllUsersUrl, { method: method })
        .then(response => response.text())
        .then(data => {

            if (isValidJSON(data)) {
                const parseJSON = JSON.parse(data);
                document.getElementById("response").innerText = JSON.stringify(parseJSON, null, '\t');
            } else {
                document.getElementById('response').innerText = data;
            }

        })
        .catch(error => console.log(error));
}

// const allUsersMethods = async (method) => {
//     if (!['GET', 'POST', 'DELETE'].includes(method)) {
//         alert('Invalid method used for request all Users')
//         return;
//     }

//     try {
//         const response = await fetch(apiAllUsersUrl, { method: method })
//         const data = await response.text();
//         if (isValidJSON(data)) {
//             const parseJSON = JSON.parse(data);
//             document.getElementById("response").innerText = JSON.stringify(parseJSON, null, '\t');
//         } else {
//             document.getElementById('response').innerText = data;
//         }
//     }
//     catch (error) { console.log(error) };
// }

const userByIdMethods = (method) => {
    const userId = document.getElementById("userId").value;
    let errorMsg = '';
    if (!['GET', 'POST', 'DELETE'].includes(method)) {
        alert('Invalid method used for request all Users')
        return;
    }
    if (isNaN(userId)) {
        errorMsg = "Please Enter a User ID. Must be a number."
    } else if (userId < 1) {
        errorMsg = "Please Enter a User ID. Must be greater than 0."
    }
    if (errorMsg !== '') {
        document.getElementById('response').innerText = errorMsg;
        return;
    }

    fetch(apiUserByIdUrl + userId, { method: method })
        .then(response => response.text())
        .then(data => {
            if (isValidJSON(data)) {
                const parseJSON = JSON.parse(data);
                document.getElementById("response").innerText = JSON.stringify(parseJSON, null, '\t');
            } else {
                document.getElementById('response').innerText = data;
            }
        })
        .catch(error => {
            console.log(error)
            document.getElementById('response').innerText = error
        })

}

const addNewUser = () => {
    const name = document.getElementById('name').value;
    const userName = document.getElementById('username').value;
    const userEmail = document.getElementById('email').value;
    const userPhone = document.getElementById('phone').value;
    const userWebsite = document.getElementById('website').value;
    const userBody = {
        name: name,
        username: userName,
        email: userEmail,
        phone: userPhone,
        website: userWebsite,
    }
    let errorMsg = [];
    if (name === '') {
        errorMsg = "Please Enter a valid Name."
    }
    if (userName === '') {
        errorMsg = "Please Enter a valid Name."
    }
    if (userEmail === '') {
        errorMsg = "Please Enter a valid Email."
    }
    if (userPhone === '') {
        errorMsg = "Please Enter a valid Phone Number."
    }
    if (userWebsite === '') {
        errorMsg = "Please Enter a valid Website."
    }

    fetch(apiBaseUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userBody)
    })
        .then(response => response.text())
        .then(data => {
            if (isValidJSON(data)) {
                const parseJSON = JSON.parse(data);
                document.getElementById('response').innerText = JSON.stringify(parseJSON, null, '\t');
            } else {
                document.getElementById('response').innerText = data;
            }
        })
        .catch(error => {
            console.log(error)
            document.getElementById('response').innerText = error;
        })


}

const updateExistingUser = () => {
    const name = document.getElementById('name').value;
    const userName = document.getElementById('username').value;
    const userEmail = document.getElementById('email').value;
    const userPhone = document.getElementById('phone').value;
    const userWebsite = document.getElementById('website').value;
    const userBody = {
        name: name,
        username: userName,
        email: userEmail,
        phone: userPhone,
        website: userWebsite,
    }
    let errorMsg = [];
    if (name === '') {
        errorMsg = "Please Enter a valid Name."
    }
    if (userName === '') {
        errorMsg = "Please Enter a valid Name."
    }
    if (userEmail === '') {
        errorMsg = "Please Enter a valid Email."
    }
    if (userPhone === '') {
        errorMsg = "Please Enter a valid Phone Number."
    }
    if (userWebsite === '') {
        errorMsg = "Please Enter a valid Website."
    }

    userBody.id = parseInt(document.getElementById('userId').value);

    if (isNaN(userBody.id)) {
        errorMsg.push("Please Enter a User ID. Must be a number.")
    } else if (userBody.id < 1) {
        errorMsg.push("Please Enter a User ID. Must be greater than 0.")
    }
    if (errorMsg.length > 0) {
        console.log(errorMsg);
        document.getElementById('response').innerText = errorMsg.join('\n');
        return;

    }
    fetch(apiUserByIdUrl + userBody.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userBody)
    })
        .then(response => response.text())
        .then(data => {
            if (isValidJSON(data)) {
                const parseJSON = JSON.parse(data);
                document.getElementById('response').innerText = JSON.stringify(parseJSON, null, '\t');
            } else {
                document.getElementById('response').innerText = data;
            }
        })
        .catch(error => {
            console.log(error)
            document.getElementById('response').innerText = error;
        })
}

