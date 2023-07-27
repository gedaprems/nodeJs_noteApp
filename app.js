const fs = require('fs');
const notes = require('./notes.js')

const yargs = require('yargs')

// Add command 
yargs.command({
    command: 'add',
    describe: 'Add a new note!',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of Notes',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNotes(argv.title,argv.body)
    }
})

// Remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a new note!',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title)
    }
})

// List notes

yargs.command({
    command: 'listnotes',
    describe: 'Listing the notes title',
    handler: function (){
        notes.listNotes()
    }
})


yargs.command({
    command : 'readnote',
    describe: 'Reading a specific note',
    builder: {
        title: {
            describe: 'Title of note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        notes.getNotes(argv.title)
    }
})

// console.log(yargvs.argv) => 
yargs.parse()
