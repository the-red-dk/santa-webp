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

// Add a new participant row
function addParticipant() {
  const div = document.createElement('div');
  div.className = 'participant';
  div.innerHTML = `
    <input type="text" class="name" placeholder="Name" required>
    <input type="email" class="email" placeholder="Email" required>
  `;
  document.getElementById('participants').appendChild(div);
}

// Shuffle helper
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Main function: assign and send emails
function generateAndSend() {
  const names = Array.from(document.querySelectorAll('.name')).map(i => i.value.trim());
  const emails = Array.from(document.querySelectorAll('.email')).map(i => i.value.trim());
  const giftLimit = document.getElementById('giftLimit').value.trim() || "No limit specified";
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = "";

  // Validation
  if (names.length < 2 || names.some(n => !n) || emails.some(e => !e)) {
    resultDiv.innerHTML = '<span style="color:red;">Please enter at least two participants with valid names and emails.</span>';
    return;
  }

  // Assignment (no self-assignments)
  let assigned, attempts = 0, maxTries = 1000;
  do {
    assigned = shuffle([...names]);
    attempts++;
  } while (names.some((n, i) => n === assigned[i]) && attempts < maxTries);

  if (attempts === maxTries) {
    resultDiv.innerHTML = '<span style="color:red;">Could not generate valid assignments. Try again.</span>';
    return;
  }

  // Send emails via EmailJS
  let sentCount = 0, failed = [];
  names.forEach((name, i) => {
    const email = emails[i];
    const assignedName = assigned[i];
    emailjs.send("service_bany6nu", "template_d9zs7hq", {
      to_name: name,
      to_email: email,
      assigned_name: assignedName,
      gift_limit: giftLimit
    }).then(() => {
      sentCount++;
      if (sentCount === names.length) {
        resultDiv.innerHTML = `<span style="color:limegreen;">All emails sent!</span>`;
      }
    }, (err) => {
      failed.push(name);
      resultDiv.innerHTML = `<span style="color:red;">Failed to send to: ${failed.join(', ')}</span>`;
    });
  });
}

// Load EmailJS library
const script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js";
script.onload = function() {
    emailjs.init("7IcsCVI4aLQ6kFrPK");
};
document.head.appendChild(script);