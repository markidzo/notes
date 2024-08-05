$(document).ready(function() {
    const notesKey = 'notes';
    const archiveKey = 'archive';

    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem(notesKey)) || [];
        $('#notesList').empty();
        notes.forEach(note => {
            $('#notesList').append(createNoteElement(note, false));
        });
    }

    function loadArchivedNotes() {
        const archivedNotes = JSON.parse(localStorage.getItem(archiveKey)) || [];
        $('#archivedNotes').empty();
        archivedNotes.forEach(note => {
            $('#archivedNotes').append(createNoteElement(note, true));
        });
    }

    function createNoteElement(note, isArchived) {
        const noteElement = $(`
            <li class="note">
                <strong>${note.title}</strong> (${note.date})
                <p contenteditable="${!isArchived}" class="editable">${note.content}</p>
                ${isArchived ? 
                    '<button class="restoreNote"><img src="img/ic_baseline-restore.png" alt="" class="imgrem"></button><button class="removeNote"><img src="img/ic_outline-delete.png" alt="" class="imgdel"></button>' : 
                    '<button class="deleteNote"><img src="img/ic_outline-delete.png" alt="" class="imgdel"></button>'}
            </li>
        `);
        noteElement.find('.deleteNote').click(() => {
            archiveNote(note);
        });
        noteElement.find('.restoreNote').click(() => {
            restoreNoteFromArchive(note);
        });
        noteElement.find('.removeNote').click(() => {
            removeNoteCompletely(note);
        });
        noteElement.find('.editable').on('input', function() {
            saveNoteChanges(note, $(this).text());
        });
        return noteElement;
    }

    function saveNotes(notes) {
        localStorage.setItem(notesKey, JSON.stringify(notes));
    }

    function saveArchivedNotes(archivedNotes) {
        localStorage.setItem(archiveKey, JSON.stringify(archivedNotes));
    }

    function archiveNote(note) {
        let notes = JSON.parse(localStorage.getItem(notesKey)) || [];
        notes = notes.filter(n => n.title !== note.title || n.date !== note.date);
        saveNotes(notes);
        
        const archivedNotes = JSON.parse(localStorage.getItem(archiveKey)) || [];
        archivedNotes.push(note);
        saveArchivedNotes(archivedNotes);
        
        loadNotes();
        loadArchivedNotes();
    }

    function restoreNoteFromArchive(note) {
        let archivedNotes = JSON.parse(localStorage.getItem(archiveKey)) || [];
        archivedNotes = archivedNotes.filter(n => n.title !== note.title || n.date !== note.date);
        saveArchivedNotes(archivedNotes);

        const notes = JSON.parse(localStorage.getItem(notesKey)) || [];
        notes.push(note);
        saveNotes(notes);

        loadNotes();
        loadArchivedNotes();
    }

    function removeNoteCompletely(note) {
        let archivedNotes = JSON.parse(localStorage.getItem(archiveKey)) || [];
        archivedNotes = archivedNotes.filter(n => n.title !== note.title || n.date !== note.date);
        saveArchivedNotes(archivedNotes);

        loadArchivedNotes();
    }

    function saveNoteChanges(note, newContent) {
        note.content = newContent;

        const notes = JSON.parse(localStorage.getItem(notesKey)) || [];
        const updatedNotes = notes.map(n => {
            if (n.title === note.title && n.date === note.date) {
                return note;
            }
            return n;
        });
        saveNotes(updatedNotes);
    }

    $('#addNote').click(function() {
        const title = $('#noteTitle').val().trim();
        const content = $('#noteContent').val().trim();

        if (title && content) {
            const note = {
                title: title,
                content: content,
                date: new Date().toLocaleDateString()
            };

            const notes = JSON.parse(localStorage.getItem(notesKey)) || [];
            notes.push(note);
            saveNotes(notes);

            $('#noteTitle').val('');
            $('#noteContent').val('');

            loadNotes();
        }
    });

    loadNotes();
    loadArchivedNotes();



    $('#addNote').click(function() {
        const title = $('#noteTitle').val().trim();
        const content = $('#noteContent').val().trim();

        if (title && content) {
            const note = {
                title: title,
                content: content,
                date: new Date().toLocaleDateString()
            };

            const notes = JSON.parse(localStorage.getItem(notesKey)) || [];
            notes.push(note);
            saveNotes(notes);

            $('#noteTitle').val('');
            $('#noteContent').val('');

            loadNotes();
        }
    });

    loadNotes();
    loadArchivedNotes();
});



$(document).ready(function(){
    $("a[href*='#']").on("click", function(e){
      var anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $(anchor.attr('href')).offset().top
      }, 777);
      e.preventDefault();
      return false;
    });
  });




$(document).ready(function(){
    $('#im1').click(function(){
        $('#t1').toggle(300);
    });

    $('#im2').click(function(){
        $('#t2').toggle(300);
    });

    $('#im3').click(function(){
        $('#t3').toggle(300);
    });
});


