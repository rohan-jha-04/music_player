document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const language = document.getElementById('language').value;
    localStorage.setItem('userName', name);
    localStorage.setItem('language', language);
    window.location.href = `player.html?lang=${language}`;
});