// Get references to the DOM elements
const generateResumeButton = document.getElementById("generateResume") as HTMLButtonElement;
const downloadCvButton = document.getElementById("downloadCv") as HTMLButtonElement;
const shareResumeButton = document.getElementById("shareResume") as HTMLButtonElement;

// Reference to the form fields
const nameInput = document.getElementById("Name") as HTMLInputElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const telInput = document.getElementById("Tel") as HTMLInputElement;
const educationInput = document.querySelector('textarea[name="Education"]') as HTMLTextAreaElement;
const experienceInput = document.querySelector('textarea[name="Experiance"]') as HTMLTextAreaElement;
const skillsInput = document.querySelector('textarea[name="Skills"]') as HTMLTextAreaElement;
const profilePictureInput = document.querySelector('input[type="file"]') as HTMLInputElement;
const resumeDisplay = document.querySelector(".resume-display") as HTMLDivElement;

generateResumeButton.addEventListener("click", (event) => {
    event.preventDefault(); // 

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
            profilePicUrl = e.target?.result as string;
            displayResume(name, email, phone, education, experience, skills, profilePicUrl);
        };
        reader.readAsDataURL(profilePictureInput.files[0]);
    } else {
        displayResume(name, email, phone, education, experience, skills, profilePicUrl);
    }
});

function displayResume(name: string, email: string, phone: string, education: string, experience: string, skills: string, profilePicUrl: string) {
    resumeDisplay.innerHTML = `
        <h2>${name}'s Resume</h2>
        <img src="${profilePicUrl}" alt="Profile Picture" style="max-width: 150px;">
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Education:</strong> ${education}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        <p><strong>Skills:</strong> ${skills}</p>
    `;
}

downloadCvButton.addEventListener("click", (event) => {
    event.preventDefault();

    const doc = new jsPDF(""); 

    const name = nameInput.value;
    const email = emailInput.value;
    const phone = telInput.value;
    const education = educationInput.value;
    const experience = experienceInput.value;
    const skills = skillsInput.value;

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

    // Create an email body
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
