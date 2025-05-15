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
            const nameInputs = document.querySelectorAll('.name');
            const names = Array.from(nameInputs).map(input => input.value.trim()).filter(Boolean);
            const moneyLimit = document.getElementById('moneyLimit').value;

            if (names.length < 2) {
                alert('Enter at least two names!');
                return;
            }

            let shuffled;
            let attempts = 0;
            const maxAttempts = 1000;
            do {
                shuffled = names.slice();
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                attempts++;
                
            } while (names.some((name, i) => name === shuffled[i]) && attempts < maxAttempts);

            if (attempts === maxAttempts) {
                alert('Could not generate valid assignments. Please try again.');
                return;
            }

            const pairs = names.map((name, i) => `${name} → ${shuffled[i]}`);
            document.getElementById('result').innerHTML = `
                ${pairs.join('<br>')}<br><br>
                <strong>Gift Limit:</strong> ${moneyLimit}
            `;
        }