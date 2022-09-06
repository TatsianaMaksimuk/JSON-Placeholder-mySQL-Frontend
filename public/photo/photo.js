const apiPhotoBaseUrl = "http://localhost:4500/api/photos";
const apiAllPhotosUrl = "http://localhost:4500/api/photos/sql/all";
const apiPhotoByIdUrl = "http://localhost:4500/api/photos/sql/id/";

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
    document.getElementById('photoId').value = '';
    document.getElementById('albumId').value = '';
    document.getElementById('title').value = '';
    document.getElementById('url').value = '';
}


const allPhotosMethods = (
    method 
) => {

    if (!['GET', 'POST', 'DELETE'].includes(method)) {
        alert('Invalid method used for request all Photos')
        return;
    }

    fetch(apiAllPhotosUrl, { method: method })
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

const photoByIdMethods = (method) => {
    const photoId = document.getElementById("photoId").value;
    let errorMsg = '';
    if (!['GET', 'DELETE'].includes(method)) {
        alert('Invalid method used for request all Photos')
        return;
    }
    if (isNaN(photoId)) {
        errorMsg = "Please Enter a Photo ID. Must be a number."
    } else if (photoId < 1) {
        errorMsg = "Please Enter a Photo ID. Must be greater than 0."
    }
    if (errorMsg !== '') {
        document.getElementById('response').innerText = errorMsg;
        return;
    }

    fetch(apiPhotoByIdUrl + photoId, { method: method })
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

const addNewPhoto = () => {
    const albumId = document.getElementById('albumId').value;
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const photoBody = {
        albumId: albumId,
        title: title,
        url: url,
    }
    let errorMsg = [];
    if (albumId === '') {
        errorMsg.push("Please Enter a valid ID." )       
    }
    if (isNaN(albumId)||albumId < 1) {
        errorMsg.push( "Please Enter an Album ID. Must be a number.")
    }
    if (title === '') {
        errorMsg.push("Please Enter a valid Name.")
    }
    if (url === '') {
        errorMsg.push("Please Enter a valid url.")
    }
    if (errorMsg.length > 0) {
        console.log(errorMsg);
        document.getElementById('response').innerText = errorMsg.join('\n');
        return;

    }

    fetch(apiPhotoBaseUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(photoBody)
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

const updateExistingPhoto = () => {
    const albumId = document.getElementById('albumId').value;
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const photoBody = {
        albumId: albumId,
        title: title,
        url: url,
    }
    let errorMsg = [];
    if (albumId === '') {
        errorMsg.push("Please Enter a valid ID." )       
    }
    if (isNaN(albumId)||albumId < 1) {
        errorMsg.push( "Please Enter an Album ID. Must be a number.")
    }
    if (title === '') {
        errorMsg.push("Please Enter a valid Name.")
    }
    if (url === '') {
        errorMsg.push("Please Enter a valid url.")
    }

    photoBody.id = parseInt(document.getElementById('photoId').value);

    if (isNaN(photoBody.id)||photoBody.id < 1) {
        errorMsg.push("Please Enter a User ID. Must be a number.")
    }  if (errorMsg.length > 0) {
        console.log(errorMsg);
        document.getElementById('response').innerText = errorMsg.join('\n');
        return;

    }
    fetch(apiPhotoByIdUrl + photoBody.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(photoBody)
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

