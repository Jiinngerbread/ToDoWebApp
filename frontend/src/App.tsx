import React, { ChangeEventHandler, useState, useEffect } from "react";
import "./index.css";
import NoteItem from "./components/NoteItem";
import axios from 'axios';

type NoteType = {
  id: string, 
  title: string, 
  description?: string 
};

const App = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [values, setValues] = useState<NoteType>({ id: "", title: "",description: ""});
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [noteToView, setNoteToView] = useState< NoteType>();

  useEffect(() => {
    // here we can call our api to get all notes
    const fetchNotes = async () => {
      const { data } = await axios("http://localhost:8000/note");
      setNotes(data.notes);
    }
    fetchNotes();
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({target}) => {
    const { name, value } = target;
    setValues({
      ...values, 
      [name]: value
    });
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <form
        onSubmit={async (evt) => {
          evt.preventDefault();
          if (selectedNoteId) {
            // then we want to update
            const { data } = await axios.patch(
              "http://localhost:8000/note/" + selectedNoteId,
              {
                title: values.title,
                description: values.description,
              }
            );
            // we are updating the notes array with the new note
            console.log(data.note);

            // we are updating the notes array with the new note
            const updatedNotes = notes.map((note) => { 
              if (note.id === selectedNoteId) {
                note.title = data.note.title;
                note.description = data.note.description;
              }
              return note;
            })

            // Here we are resetting the selected note id to null
            setNotes([...updatedNotes]);
            setValues({ id: "", title: "", description: "" });
            return;
          }
          
          // We are submitting the form here 
          const { data } = await axios.post(
            "http://localhost:8000/note/create",
            {
              title: values.title,
              description: values.description,
            }
          );
          setNotes([data.note, ...notes]); 
          setValues({id:"", title: "", description: "" }); //this resets/clears the form to ''
          // we are getting data back from the api here 
          //   console.log(values);
        }}
        className="space-y-6 bg-white shadow-md rounded p-5"
      >
        <h1 className="font-semibold text-2xl text-center">
          Note Application
        </h1>
        <div>
          {/* {title.trim() && title.length < 3 ? ( <p className="text-red-500">Title too short! </p> ) : null }  */}
          <input 
            className="w-full border-b-2 border-gray-700 outline-none" 
            type="text" 
            placeholder="Title"
            // onChange={(e) => setTitle(e.target.value)}
            // value={title}
            onChange={handleChange}
            name="title"
            value = {values.title}
          />
        </div>
        <div>
          <textarea 
            className="w-full border-b-2 border-gray-700 outline-none resize-none h-36" 
            placeholder="Description"
            // onChange={(ev) => setDescription(ev.target.value)}
            // value={description}
            onChange={handleChange}
            name="description"
            value={values.description}
          ></textarea>
        </div>
        <div className="text-center">
          <button 
            className="bg-sky-400 text-white px-5 py-2 rounded"
            onClick={() => console.log(values)}
          >
            Submit
          </button>
        </div>
      </form>

      {/* Note Items */}
      {notes.map((note) => {
        // the key is needed because react needs to be able to keep track of each child in the virtual DOM
        return ( 
          <NoteItem 
            key={note.title}  
            title={note.title} 
            description={noteToView?.id === note.id ? noteToView?.description : ""}
            onViewClick={() => {
              noteToView ? setNoteToView( undefined) : setNoteToView(note);
            }}
            onEditClick={() => {
              setSelectedNoteId(note.id);
              // Adding set values here allows the input fields to be populated with the note data
              setValues({ 
                id: note.id,
                title: note.title, 
                description: note.description || ''
              }) 
            }}

            onDeleteClick={async () => {
              const result = confirm("Are you sure you want to delete this note?") 
              if (result) {
                // we are deleting the note from the database
                await axios.delete("http://localhost:8000/note/" + note.id)
                const updatedNotes = notes.filter(({id}) => id !== note.id);
                setNotes([...updatedNotes]);
              }
            }} 
          />
        )
      })}
    </div>
)}

export default App
