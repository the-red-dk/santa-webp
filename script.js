function addName() {
        const nameInputs = document.getElementById('nameInputs');
        const input = document.createElement('input');
        input.type = 'text';
        input.classList.add('name');
        input.placeholder = 'Enter Player name: ';
        const br = document.createElement('br');
        nameInputs.appendChild(br);
        nameInputs.appendChild(input);
    }

function generateSecretSanta() {
    const defaultNames = [
        "Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Heidi"
    ];
    const nameInputs = document.querySelectorAll('.name');
    let userNames = Array.from(nameInputs).map(input => input.value.trim()).filter(Boolean);

    let names;
    if (userNames.length === 0) {
        // Pick 5 random unique names from defaultNames
        let shuffledDefaults = defaultNames.slice();
        for (let i = shuffledDefaults.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDefaults[i], shuffledDefaults[j]] = [shuffledDefaults[j], shuffledDefaults[i]];
        }
        names = shuffledDefaults.slice(0, 5);
    } else {
        names = userNames;
    }

    if (names.length < 2) {
        document.getElementById('result').innerHTML = `<span style="color:red;">Please enter at least two names or try again.</span>`;
        return;
    }

    const moneyLimit = document.getElementById('moneyLimit').value || "No limit specified";

    let shuffled, attempts = 0, maxAttempts = 1000;
    do {
        shuffled = names.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        attempts++;
    } while (names.some((name, i) => name === shuffled[i]) && attempts < maxAttempts);

    if (attempts === maxAttempts) {
        document.getElementById('result').innerHTML = `<span style="color:red;">Could not generate valid assignments. Please try again.</span>`;
        return;
    }

    // Output in a clear, readable format
    let output = `<strong>Secret Santa Assignments:</strong><ul style="margin:8px 0 0 16px;">`;
    names.forEach((name, i) => {
        // Encode assigned name in base64 for the link
        const assigned = shuffled[i];
        const code = btoa(unescape(encodeURIComponent(assigned)));
        const limitParam = encodeURIComponent(moneyLimit);
        const nameParam = encodeURIComponent(name);
        output += `<li><b>${name}</b> ➔ <span style="color:#0ff;font-weight:bold">${assigned}</span>
        <br><a href="view.html?name=${nameParam}&code=${code}&limit=${limitParam}" target="_blank" style="color:#32eaf3;">View your assignment</a></li>`;
    });
    output += `</ul><div style="margin-top:8px;"><strong>Gift Limit:</strong> ${moneyLimit}</div>`;
    document.getElementById('result').innerHTML = output;
}