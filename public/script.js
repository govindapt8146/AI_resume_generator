// async function generate() {

//    const btn = document.querySelector(".generate-btn");
//   btn.innerText = "Generate";
//   btn.disabled = false;

//   const data = {
//     name: name1.value,
//     email: email.value,
//     phone: phone.value,
//     education: education.value,
//     skills: skills.value,
//     experience: experience.value
//   };

//   const res = await fetch(
//   "https://ai-resume-generator-gf4w.onrender.com/generate",
//   {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   }
// );

//   const result = await res.json();

//   // 👇 Convert Markdown to HTML
//   marked.setOptions({ breaks: true });

//   const html = marked.parse(result.resume);

//   // 👇 Render properly
//   document.getElementById("output").innerHTML = html;
// }






async function generate() {
  const btn = document.querySelector(".generate-btn");

  try {
    btn.innerText = "Generating...";
    btn.disabled = true;

    const data = {
      name: name1.value,
      email: email.value,
      phone: phone.value,
      education: education.value,
      skills: skills.value,
      experience: experience.value
    };

    const res = await fetch("https://ai-resume-generator-gf4w.onrender.com/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Request failed");
    }

    marked.setOptions({ breaks: true });
    document.getElementById("output").innerHTML =
      marked.parse(result.resume);

  } catch (err) {
    alert(err.message);
    console.error(err);
  } finally {
    btn.innerText = "Generate";
    btn.disabled = false;
  }
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


