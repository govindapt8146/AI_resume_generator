async function generate() {

   const btn = document.querySelector(".generate-btn");
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

async function downloadResume() {

  const { jsPDF } = window.jspdf;
  const resumeElement = document.getElementById("output");

  const canvas = await html2canvas(resumeElement, {
    scale: 2,
    useCORS:true,
    backgroundColor:"#ffffff"
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

const pdfWidth = pdf.internal.pageSize.getWidth();

const margin = 10;

const usableWidth = pdfWidth - margin * 2;

const pdfHeight = (canvas.height * usableWidth) / canvas.width;

pdf.addImage(
  imgData,
  "PNG",
  margin,
  margin,
  usableWidth,
  pdfHeight
);

  pdf.save("Resume.pdf");

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


