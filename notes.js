const fs = require('fs')
const chalk = require('chalk')

// Function for adding notes

const addNotes = function(title, body){
    const notes = loadNotes()

    let flag = false

    for(let idx = 0; idx < notes.length; idx++){
        if(notes[idx].title===title){
            flag= true;
            break;
        }
    }

    if(flag){
        // Printing title taken! 
        console.log(chalk.red.inverse("Title taken!"))
    }else{
        // Pushing data to the notes.json
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse("Note added!"))
    }  
}

// Function to Remove a Note

const removeNote = function(title){

    const notes = loadNotes()
    let flag = false
    
    for(let idx = 0; idx<notes.length; idx++){
        if(notes[idx].title===title){
            notes.splice(idx,1)
            flag = true
            break
        }
    }

    if(flag){
        saveNotes(notes)
        console.log(chalk.green.inverse("Note deleted successfully"))
    }else{
        console.log(chalk.red.inverse("Title not present!"))
    }
}

// List notes 

const listNotes = function(){
    const notes = loadNotes()
    console.log(chalk.inverse("Your notes: "))
    //Added forEach() method: 
    notes.forEach((note)=>{
        console.log(note.title)
    })
    // for(let idx=0; idx<notes.length; idx++){
    //     console.log(notes[idx].title)
    // }
}


// Function for getting Note

const getNotes = function(title){
    const notes = loadNotes()
    let flag = false
    for(let idx=0; idx<notes.length; idx++){
        if(notes[idx].title==title){
            console.log(chalk.green(notes[idx].title)+" : "+ notes[idx].body)
            flag = true
            break
        }
    }
    if(!flag){
        console.log(chalk.inverse("Note not found!"))
    }
    
    // return "Your Notes..."
}


// Helper function to load Notes 

const loadNotes = function(){
    try{
        const notesBuffer = fs.readFileSync('./notes.json')
        const notesJSON = notesBuffer.toString()
        return JSON.parse(notesJSON)
    }
    catch(e){
        return []
    }
}

// Helper save updated notes to Notes.json

const saveNotes = function(notes){
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('./notes.json',notesJSON)
}




module.exports = {
    addNotes: addNotes,
    getNotes: getNotes,
    removeNote : removeNote,
    listNotes: listNotes
}