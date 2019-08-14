import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';


class AddNote extends React.Component {
  
    static contextType = ApiContext;

    handleSubmitAddNote = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const folderId = event.target.folderId.value;
        const content = event.target.content.value;
        const modified = new Date (Date.now()).toISOString();
        
        fetch (`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, folderId, content, modified})
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json();
        })
        .then(newNote => {
            this.context.addNote(newNote)
            //TODO: navigate back to previous page
        })

    }

    render() {        

        return (
            <form onSubmit={event => this.handleSubmitAddNote(event)}>
                <legend>Add a New Note</legend>
                <label htmlFor="name">Name:</label>
                <input id="name" type="text" required></input>
                <label htmlFor="folderId">Folder:</label>
                <select id="folderId">
                    {this.context.folders.map(folder => <option key={folder.id} value={folder.id}>{folder.name}</option>)}
                </select>
                <label htmlFor="content">Content:</label>
                <textarea id="content" required></textarea>
                <button type="submit">Submit</button>
            </form>
        );
    }

}

export default AddNote