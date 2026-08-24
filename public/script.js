let profilePhotoData = "";
let signatureData = "";


// =====================================================
// IMAGE COMPRESSION
// =====================================================

function compressImage(file, maxWidth, maxHeight, quality = 0.8) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = function(event) {

            const img = new Image();

            img.onload = function() {

                let width = img.width;
                let height = img.height;


                // Maintain aspect ratio

                if (width > maxWidth) {

                    height = height * (maxWidth / width);
                    width = maxWidth;

                }


                if (height > maxHeight) {

                    width = width * (maxHeight / height);
                    height = maxHeight;

                }


                const canvas = document.createElement("canvas");

                canvas.width = Math.round(width);
                canvas.height = Math.round(height);


                const ctx = canvas.getContext("2d");

                ctx.drawImage(
                    img,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );


                const compressedImage =
                    canvas.toDataURL(
                        "image/jpeg",
                        quality
                    );


                resolve(compressedImage);

            };


            img.onerror = reject;

            img.src = event.target.result;

        };


        reader.onerror = reject;

        reader.readAsDataURL(file);

    });

}



// =====================================================
// PROFILE PHOTO
// =====================================================

document
    .getElementById("photoInput1")
    .addEventListener("change", async function(event) {

        const file = event.target.files[0];

        if (!file) return;


        try {

            profilePhotoData = await compressImage(
                file,
                600,
                700,
                0.8
            );


            // Preview in form

            document
                .getElementById("profilePhotoPreview")
                .src = profilePhotoData;


            // Photo inside resume

            document
                .getElementById("resumeProfilePhoto")
                .src = profilePhotoData;


            document
                .getElementById("resumeProfilePhoto")
                .style.display = "block";


        } catch (error) {

            console.error(error);

            alert("Unable to load profile photo.");

        }

    });



// =====================================================
// SIGNATURE
// =====================================================

document
    .getElementById("photoInput2")
    .addEventListener("change", async function(event) {

        const file = event.target.files[0];

        if (!file) return;


        try {

            signatureData = await compressImage(
                file,
                800,
                250,
                0.8
            );


            // Preview in form

            document
                .getElementById("signaturePreview")
                .src = signatureData;


            // Signature inside resume

            document
                .getElementById("resumeSignature")
                .src = signatureData;


            document
                .getElementById("resumeSignature")
                .style.display = "block";


        } catch (error) {

            console.error(error);

            alert("Unable to load signature.");

        }

    });



    // =====================================================
// CURRENT DATE
// =====================================================

function setCurrentDate() {

    const dateElement = document.getElementById("currentDate");

    if (!dateElement) {
        return;
    }

    const today = new Date();

    const day = String(today.getDate()).padStart(2, "0");

    const month = today.toLocaleString("en-IN", {
        month: "long"
    });

    const year = today.getFullYear();

    dateElement.textContent =
        `Date: ${day} ${month} ${year}`;
}


// Set date when page loads
setCurrentDate();

// =====================================================
// GENERATE RESUME
// =====================================================

async function generate() {

    const btn =
        document.querySelector(".generate-btn");


    try {

        btn.innerText = "Generating...";
        btn.disabled = true;


        const data = {

            name:
                document.getElementById("name1").value,

            email:
                document.getElementById("email").value,

            phone:
                document.getElementById("phone").value,

            education:
                document.getElementById("education").value,

            skills:
                document.getElementById("skills").value,

            experience:
                document.getElementById("experience").value,

            certifications:
                document.getElementById("certifications").value,

            career:
                document.getElementById("career").value,

            references:
                document.getElementById("references").value,


            // Keep photo and signature

            // profilePhoto:
            //     profilePhotoData,

            // signature:
            //     signatureData

        };


        const res = await fetch(
            "https://ai-resume-generator-gf4w.onrender.com/generate",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );


        const responseText =
            await res.text();


        console.log(
            "Server Status:",
            res.status
        );


        console.log(
            "Server Response:",
            responseText
        );


        let result;


        try {

            result =
                JSON.parse(responseText);

        } catch (error) {

            throw new Error(
                "Server did not return valid JSON: " +
                responseText.substring(0, 200)
            );

        }


        if (!res.ok) {

            throw new Error(
                result.error?.message ||
                result.error ||
                "Request failed"
            );

        }


        if (!result.resume) {

            throw new Error(
                "Resume was not returned by the server."
            );

        }


        // Convert Markdown to HTML

        marked.setOptions({
            breaks: true
        });


        document
            .getElementById("output")
            .innerHTML =
            marked.parse(result.resume);


        // Make sure images remain in resume

        if (profilePhotoData) {

            document
                .getElementById("resumeProfilePhoto")
                .src =
                profilePhotoData;

        }


        if (signatureData) {

            document
                .getElementById("resumeSignature")
                .src =
                signatureData;

        }


    } catch (err) {

        alert(err.message);

        console.error(err);

    } finally {

        btn.innerText = "Generate";

        btn.disabled = false;

    }

}



// =====================================================
// DOWNLOAD / PRINT RESUME
// =====================================================

function downloadResume() {

    window.print();

}



// =====================================================
// PREMIUM / REMOVE WATERMARK
// =====================================================

function activatePremium() {

    const btn =
        document.querySelector(".premium-btn");


    btn.innerText = "Processing...";

    btn.disabled = true;


    setTimeout(() => {

        document
            .getElementById("Watermark")
            .style.display = "none";


        btn.innerText =
            "Premium Activated ✓";


    }, 1500);

}