// notes.js
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "notes.json");

// Ensure notes file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

// Load notes
function loadNotes() {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// Save notes
function saveNotes(notes) {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}

// Add a new note
function addNote(title, body) {
  const notes = loadNotes();
  notes.push({ title, body });
  saveNotes(notes);
  console.log(`📝 Note added: "${title}"`);
}

// List all notes
function listNotes() {
  const notes = loadNotes();
  if (notes.length === 0) {
    console.log("📭 No notes found.");
    return;
  }
  console.log("\n📚 Your Notes:");
  notes.forEach((n, i) => console.log(`${i + 1}. ${n.title}`));
}

// Delete a note
function deleteNote(title) {
  const notes = loadNotes();
  const filtered = notes.filter(n => n.title !== title);
  if (filtered.length === notes.length) {
    console.log(`⚠️ Note not found: "${title}"`);
  } else {
    saveNotes(filtered);
    console.log(`🗑️ Deleted note: "${title}"`);
  }
}

// CLI handling
const [,, command, ...args] = process.argv;

switch (command) {
  case "add":
    const title = args[0];
    const body = args.slice(1).join(" ");
    if (!title || !body) {
      console.log("Usage: node notes.js add <title> <body>");
      break;
    }
    addNote(title, body);
    break;
  case "list":
    listNotes();
    break;
  case "delete":
    if (!args[0]) {
      console.log("Usage: node notes.js delete <title>");
      break;
    }
    deleteNote(args[0]);
    break;
  default:
    console.log("\nUsage:");
    console.log("  node notes.js add <title> <body>");
    console.log("  node notes.js list");
    console.log("  node notes.js delete <title>");
}
