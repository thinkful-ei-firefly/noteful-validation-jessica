import React from 'react';
import config from '../config';
import ApiContext from '../ApiContext'

class AddFolder extends React.Component {

    static contextType = ApiContext;

    handleSubmitAddFolder = event => {
        event.preventDefault()
        
        fetch (`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: event.target.folderName.value})
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json();
        })
        .then(newFolder => {
            this.context.addFolder(newFolder)
            //TODO: navigate back to previous page
        })

    }

    render () {
        return (
            <form onSubmit={event => this.handleSubmitAddFolder(event)}>
                <legend>Add a New Folder</legend>
                <label htmlFor="folderName">Name:</label>
                <input id="folderName" type="text" required></input>
                <button type="submit">Submit</button>

            </form>
        );        
    }
}

export default AddFolder