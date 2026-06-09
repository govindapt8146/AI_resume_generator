async function generate() {

   const btn = document.querySelector(".generate-btn");
  btn.innerText = "Generate";
  btn.disabled = false;

  const data = {
    name: name1.value,
    email: email.value,
    phone: phone.value,
    education: education.value,
    skills: skills.value,
    experience: experience.value
  };

  const res = await fetch("http://localhost:3000/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }); 

  const result = await res.json();

  // 👇 Convert Markdown to HTML
  marked.setOptions({ breaks: true });

  const html = marked.parse(result.resume);

  // 👇 Render properly
  document.getElementById("output").innerHTML = html;
}



function downloadResume() { 
    window.print();
}


function activatePremium() {
  const btn = document.querySelector(".premium-btn");

  btn.innerText = "Processing...";
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById("Watermark").style.display = "none";
    btn.innerText = "Premium Activated ✓";
  }, 1500);
}


