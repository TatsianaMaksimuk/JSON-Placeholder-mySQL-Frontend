const apiAlbumBaseUrl = "http://localhost:4500/api/albums";
const apiAllAlbumsUrl = "http://localhost:4500/api/albums/sql/all";
const apiAlbumByIdUrl = "http://localhost:4500/api/albums/sql/id/";

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
    document.getElementById('albumId').value = '';
    document.getElementById('title').value = '';
    document.getElementById('userId').value = '';
}

const allAlbumsMethods = (
    method
) => {

    if (!['GET', 'POST', 'DELETE'].includes(method)) {
        alert('Invalid method used for request all Albums')
        return;
    }

    fetch(apiAllAlbumsUrl, { method: method })
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

const albumByIdMethods = (method) => {
    const albumId = document.getElementById("albumId").value;
    let errorMsg = '';
    if (!['GET', 'DELETE'].includes(method)) {
        alert('Invalid method used for request all Albums')
        return;
    }
    if (isNaN(albumId) || albumId < 1) {
        errorMsg = "Please Enter a Album ID. Must be a number."
    }
    if (errorMsg !== '') {
        document.getElementById('response').innerText = errorMsg;
        return;
    }

    fetch(apiAlbumByIdUrl + albumId, { method: method })
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

const addNewAlbum = () => {
    const title = document.getElementById('title').value;
    const userId = document.getElementById('userId').value;
    const albumBody = {
        title: title,
        userId: userId,
    }
    let errorMsg = [];
    if (title === '') {
        errorMsg.push("Please Enter a valid text." )       
    }
    if (isNaN(userId)||userId < 1) {
        errorMsg.push( "Please Enter an user ID. Must be a number.")
    }
    if (errorMsg.length > 0) {
        console.log(errorMsg);
        document.getElementById('response').innerText = errorMsg.join('\n');
        return;

    }

    fetch(apiAlbumBaseUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(albumBody)
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

const updateExistingAlbum = () => {
    const title = document.getElementById('title').value;
    const userId = document.getElementById('userId').value;
    const albumBody = {
        title: title,
        userId: userId,
    }
    albumBody.id = parseInt(document.getElementById('albumId').value);
    let errorMsg = [];
    if (isNaN(albumBody.id)||albumBody.id < 1) {
        errorMsg.push( "Please Enter an Album ID. Must be a number.")
    }
    if (title === '') {
        errorMsg.push("Please Enter a valid text." )       
    }
    if (isNaN(userId)||userId < 1) {
        errorMsg.push( "Please Enter a User ID. Must be a number.")
    }
    if (errorMsg.length > 0) {
        console.log(errorMsg);
        document.getElementById('response').innerText = errorMsg.join('\n');
        return;

    }

    fetch(apiAlbumByIdUrl + albumBody.id, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(albumBody)
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