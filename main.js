
const generateResumeButton = document.querySelectorAll('button')[0];
const downloadCvButton = document.querySelectorAll('button')[1];
const shareResumeButton = document.querySelectorAll('button')[2];

// Get the form inputs
const nameInput = document.getElementById("Name");
const emailInput = document.getElementById("email");
const telInput = document.getElementById("Tel");
const educationInput = document.querySelector('textarea[name="Education"]');
const experienceInput = document.querySelector('textarea[name="Experiance"]');
const skillsInput = document.querySelector('textarea[name="Skills"]');
const profilePictureInput = document.querySelector('input[type="file"]');
const resumeDisplay = document.querySelector(".resume-display");

generateResumeButton.addEventListener("click", (event) => {
    event.preventDefault(); 

    const name = nameInput.value;
    const email = emailInput.value;
    const phone = telInput.value;
    const education = educationInput.value;
    const experience = experienceInput.value;
    const skills = skillsInput.value;
    
    let profilePicUrl = "";
    if (profilePictureInput.files && profilePictureInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profilePicUrl = e.target.result;
            displayResume(name, email, phone, education, experience, skills, profilePicUrl);
        };
        reader.readAsDataURL(profilePictureInput.files[0]);
    } else {
        displayResume(name, email, phone, education, experience, skills, profilePicUrl);
    }
});

function displayResume(name, email, phone, education, experience, skills, profilePicUrl) {
    resumeDisplay.innerHTML = `
        <h2>${name}'s Resume</h2>
        <img src="${profilePicUrl}" alt="Profile Picture" style="max-width: 150px; border-radius: 50%;">
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Education:</strong> ${education}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Skills:</strong> ${skills}</p>
    `;
}

downloadCvButton.addEventListener("click", (event) => {
    event.preventDefault(); 

    const doc = new jsPDF(); 

    const name = nameInput.value;
    const email = emailInput.value;
    const phone = telInput.value;
    const education = educationInput.value;
    const experience = experienceInput.value;
    const skills = skillsInput.value;

    // Add content to PDF
    doc.text("Resume", 20, 10);
    doc.text(`Name: ${name}`, 20, 20);
    doc.text(`Email: ${email}`, 20, 30);
    doc.text(`Phone: ${phone}`, 20, 40);
    doc.text(`Education: ${education}`, 20, 50);
    doc.text(`Experience: ${experience}`, 20, 60);
    doc.text(`Skills: ${skills}`, 20, 70);

    doc.save('resume.pdf');
});

shareResumeButton.addEventListener("click", (event) => {
    event.preventDefault(); 

    const name = nameInput.value;
    const email = emailInput.value;
    const phone = telInput.value;
    const education = educationInput.value;
    const experience = experienceInput.value;
    const skills = skillsInput.value;

    const emailBody = `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Education: ${education}
        Experience: ${experience}
        Skills: ${skills}
    `;

    const mailtoLink = `mailto:?subject=My Resume&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
});
