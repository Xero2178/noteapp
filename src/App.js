import { useState } from "react";

const noteObject = [
  {
    id: 1,
    title: "Learn HTML",
    description:
      "Start from learning HTML, it's structure, from header to footer, then you move over to tags, adding classes and ids in HTML.",
    background: "orange",
    selected: false,
  },
  {
    id: 2,
    title: "Learn CSS",
    description:
      "After being comfortable with HTML and can proficiently structure a dummy page on your own, you move over to the styling, CSS controls this, it handles how your page looks, the colors, the text and font size, it basically adds beauty to your page.",
    background: "yellow",
    selected: false,
  },
  {
    id: 3,
    title: "Learn Javascript",
    description:
      "When you can confidently build a static page that includes zero reactions, it will be nice to add functionality to your site, the ability to click on a button and have something in the site happen is always a good feeling. Interactivity, the ability of your website to be interactive can now be added to your code.",
    background: "blue",
    selected: false,
  },
  {
    id: 4,
    title: "Learn TailwindCSS",
    description:
      "I'm sorry I'm imposing a framework to you, but I can't gelp it, because absolutely no framework comes close to Tailwind and its functionalities, absolutely everything you can do with vanilla CSS can be done 10X faster with TailwindCSS",
    background: "purple",
    selected: false,
  },
];

export default function App() {
  const [notes, setNotes] = useState(noteObject);
  console.log(notes);

  const [landingActive, setLandingActive] = useState(true)

  function handleSetLandingActive(){
    setLandingActive((value) => !value)
    setNoteListActive((value) => !value)
  }

  function handleSetNoteListActive(){
    setNoteListActive((value) => !value)
    setNoteActive((value) => !value)
  }
  const [notelistActive, setNoteListActive] = useState(false)
  const [noteActive, setNoteActive] = useState(false)

  function handleSetNoteActive(){
    setNoteListActive((value) => !value)
    setNoteActive((value) => !value)
  }

  function handleSetNotes(newNote) {
    setNotes((currNotes) => [...currNotes, newNote]);
  }

  console.log(landingActive);
  return (
    <div className="mx-auto flex flex-col items-center justify-center mt-12">
      {landingActive && <LandingPage notes={notes} onSetLAndingActive={handleSetLandingActive}/>}
      {notelistActive && <NoteList notes={notes} onSetNoteListActive={handleSetNoteListActive}/>}
      {noteActive && <NotePage onSetNotes={handleSetNotes} onSetNoteActive={handleSetNoteActive} notes={notes}/>}
    </div>
  );
}

function Button({
  children,
  bgColor = "bg-blue-500/80",
  width = "w-2/3",
  marginTop = "mt-12,",
  onClick,
}) {
  return (
    <button
      className={`text-white ${bgColor} ${marginTop} py-3 text-2xl rounded-2xl ${width} font-bold`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function LandingPage({onSetLAndingActive}) {
  
  return (
    <div className="max-w-4xl w-[500px] border border-black rounded-md h-[600px] bg-gradient-to-br from-teal-800 via-black to-purple-950 flex flex-col items-center">
      <p className="text-white text-3xl shadow-2xl shadow-neutral-100 font-bold mt-52">
        XERO'S NOTEBOOK
      </p>
      <Button bgColor={"bg-blue-700"} marginTop="mt-60" onClick={onSetLAndingActive}>
        Continue
      </Button>
    </div>
  );
}

function NoteList({ notes, onSetNoteListActive }) {
  return (
    <div className="max-w-4xl w-[500px] border border-black rounded-md h-[600px] flex flex-col items-center bg-amber-600/30">
      <p className="text-3xl mt-5 font-semibold mb-4">Your Notes 📝</p>
      <button className="border px-4 py-2 border-dashed border-black w-1/2" onClick={onSetNoteListActive}>
        Add New Note +
      </button>
      <div className="overflow-hidden overflow-y-scroll my-2">
        <div className="mt-5">
          {notes.map((note) => (
            <NoteComp note={note} key={note.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NotePage({ onSetNotes, onSetNoteActive, notes }) {
  const [newTitle, setNewTitle] = useState(null);
  const [newDesc, setNewDesc] = useState(null);
  const [bgColor, setBgColor] = useState("white")

  function handleSetBgColor(color){
    setBgColor(() => color)
  }

  function handleSetNewTitle(e) {
    setNewTitle(() => e.target.value);
  }
  function handleSetNewDesc(e) {
    setNewDesc(() => e.target.value);
  }

  function handleAddNotes() {
    if(!newTitle || !newDesc) return ;
    setNewTitle("")
    setNewDesc("")
    const newNote = {
      id: notes.length + 1,
      title: newTitle,
      description: newDesc,
      background: `${bgColor}`,
      selected: false,
    };
    console.log(newNote);
    onSetNotes(newNote);
    
  }

  

  return (
    <div className={`max-w-4xl w-[500px] border border-black rounded-md  flex flex-col items-center ${bgColor === "white" ? 'bg-slate-200' : `bg-${bgColor}-700/80`} py-4 relative`}>
      <div className="absolute top-3 left-10  text-slate-700 cursor-pointer" onClick={onSetNoteActive}>
      <span class="material-symbols-outlined text-4xl">
arrow_back
</span>

      </div>
      <div className="absolute top-3 right-10 cursro-pointer flex space-x-1">
      <CircleComp color={"white"} onSetColor={handleSetBgColor}/>
      <CircleComp color={"red"} onSetColor={handleSetBgColor}/>
      <CircleComp color={"orange"} onSetColor={handleSetBgColor}/>
      <CircleComp color={"yellow"} onSetColor={handleSetBgColor}/>
      <CircleComp color={"green"} onSetColor={handleSetBgColor}/>
      <CircleComp color={"blue"} onSetColor={handleSetBgColor}/>
      <CircleComp color={"indigo"} onSetColor={handleSetBgColor}/>
      <CircleComp color={"violet"} onSetColor={handleSetBgColor}/>
      </div>
      <input
        type="text"
        className={`w-5/6 mt-12 h-12 border-b-4 bg-transparent  focus:border-black border-slate-500 text-4xl focus:outline-none mb-12 border-${bgColor}`}
        placeholder="Title"
        value={newTitle}
        onChange={(e) => handleSetNewTitle(e)}
      />
      <textarea
        cols="30"
        rows="10"
        value={newDesc}
        onChange={(e) => handleSetNewDesc(e)}
        className="h-[360px] w-5/6 rounded-md text-lg p-2 focus:outline-none border border-black bg-inherit"
        placeholder="Description"
      ></textarea>
      <Button
        bgColor="bg-green-400"
        width="w-5/6"
        marginTop="mt-12"
        onClick={handleAddNotes}
      >
        Add Note
      </Button>
    </div>
  );
}

function CircleComp({color, onSetColor}){
  
  return(
    <div className={`w-6 h-6 border border-black rounded-full ${color === "white" ? 'bg-white' : `bg-${color}-700`} cursor-pointer `} onClick={() => onSetColor(color)}></div>
  )
}

function NoteComp({ note }) {
  console.log(note.background);
  return (
    <div
      
      className={`w-[450px] border bg-${note.background}-700/80 border-black py-3 rounded-lg mb-5 cursor-pointer`}
    >
      <div className="flex justify-between items-center">
        <p className="px-2 text-xl font-semibold py-1">{note.title}</p>
        <NoteSettings />
      </div>
      <p className=" line-clamp-1 px-2">{note.description}</p>
    </div>
  );
}

function NoteSettings() {
  return (
    <div className="space-x-4 pr-4">
      <span class="material-symbols-outlined cursor-pointer">edit_note</span>
      <span class="material-symbols-outlined cursor-pointer">delete</span>
    </div>
  );
}
