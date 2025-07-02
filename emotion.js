// 🎵 Background music for each mood
const musicFiles = {
  happy: "music/happy.mp3",
  sad: "music/sad.mp3",
  romantic: "music/romantic.mp3",
  fear: "music/fear.mp3",
  lost: "music/lost.mp3"
};

// 💬 Mood messages
const moodMessages = {
  happy: "Keep smiling, the world needs your light 🌞",
  sad: "It's okay to feel down. Take your time 💙",
  romantic: "Love is in the air – breathe it in 💖",
  fear: "You're stronger than your fears 💪",
  lost: "Even when you're lost, your heart knows the way 🧭"
};

// 📝 Mood quotes
const quotes = {
  happy: "Happiness is a direction, not a place.",
  sad: "Tears come from the heart and not from the brain.",
  romantic: "To love and be loved is to feel the sun from both sides.",
  fear: "Do one thing every day that scares you.",
  lost: "Not all who wander are lost."
};

// 🌈 Mood change handler
function handleMoodChange(mood) {
  // Update body class for theme
  document.body.className = mood;

  // Update message and quote
  document.getElementById("messageBox").textContent = moodMessages[mood];
  document.getElementById("quoteBox").textContent = quotes[mood];

  // Update and play background music
  const audio = document.getElementById("bgMusic");
  audio.src = musicFiles[mood];
  audio.loop = true;
  audio.play().catch(() => {
    console.log("Auto-play may be blocked by browser.");
  });

  // Save mood for persistence
  localStorage.setItem("currentMood", mood);

  // Show saved notes for this mood
  displayNotes();
}

// 💾 Save note per mood
function saveNote() {
  const mood = localStorage.getItem("currentMood") || "general";
  const note = document.getElementById("noteInput").value.trim();
  if (note === "") return;

  let allNotes = JSON.parse(localStorage.getItem("notes") || "{}");
  if (!allNotes[mood]) allNotes[mood] = [];
  allNotes[mood].push(note);

  localStorage.setItem("notes", JSON.stringify(allNotes));
  document.getElementById("noteInput").value = "";
  displayNotes(); // refresh notes after saving
}

// 📜 Display saved notes per mood
function displayNotes() {
  const mood = localStorage.getItem("currentMood") || "general";
  const allNotes = JSON.parse(localStorage.getItem("notes") || "{}");
  const moodNotes = allNotes[mood] || [];

  const noteBox = document.getElementById("noteBox");
  noteBox.innerHTML = ""; // Clear previous content

  if (moodNotes.length === 0) {
    noteBox.innerHTML = "<p style='text-align:center;'>No notes yet for this mood.</p>";
  } else {
    moodNotes.forEach((note, index) => {
      const noteItem = document.createElement("div");
      noteItem.classList.add("note-item");
      noteItem.innerHTML = `
        <p>${note}</p>
        <button onclick="deleteNote(${index})">🗑 Delete</button>
      `;
      noteBox.appendChild(noteItem);
    });
  }
}

// 🗑 Delete note
function deleteNote(index) {
  const mood = localStorage.getItem("currentMood") || "general";
  let allNotes = JSON.parse(localStorage.getItem("notes") || "{}");
  if (!allNotes[mood]) return;

  allNotes[mood].splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(allNotes));
  displayNotes();
}

// 🔓 Logout function
function logout() {
  localStorage.removeItem("userLoggedIn");
  window.location.href = "login.html";
}

// 🔁 Load saved mood & notes on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedMood = localStorage.getItem("currentMood");
  if (savedMood) {
    handleMoodChange(savedMood);
  }
});