const qrInput = document.getElementById('qrInput');
const generateQr = document.getElementById('generateQr');
const qrCanvas = document.getElementById('qrCanvas');
const downloadQr = document.getElementById('downloadQr');
const footer = document.getElementById('footer');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const dropArea = document.getElementById('dropArea');
const downloadContainer = document.getElementById('downloadContainer');

// Initialize QRious
const qr = new QRious({
    element: qrCanvas,
});

// Generate QR code
generateQr.addEventListener('click', () => {
    qr.value = qrInput.value;
    qrCanvas.style.display = 'block'; // Show the QR code canvas
    downloadContainer.style.display = 'block'; // Show download button
    dropArea.style.display = 'none'; // Hide drop area
    qrInput.style.display = 'none'; // Hide input field
    generateQr.style.display = 'none'; // Hide the Generate button
});

// Download QR code
downloadQr.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = qrCanvas.toDataURL();
    link.click();
});

// Drag and drop functionality
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
});

dropArea.addEventListener('dragleave', () => {
    dropArea.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];

        // Check if the file is a text, PDF, or Word document
        if (file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            // If it's a PDF or Word document, we can create a URL for the file
            qrInput.value = URL.createObjectURL(file);
        } else if (file.type.startsWith("text/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                qrInput.value = e.target.result;
            };
            reader.readAsText(file);
        } else {
            alert("Please drop a valid text, PDF, or Word document.");
        }
    }
});

function showPage(page) {
    const pages = ['qrCodePage', 'aboutPage', 'contactPage'];
    pages.forEach(p => {
        document.getElementById(p).style.display = (p === page) ? 'block' : 'none';
    });
}

// Footer visibility on mouse hover near bottom
window.addEventListener('mousemove', (event) => {
    if (event.clientY > window.innerHeight - 50) {
        footer.classList.add('visible');
    } else {
        footer.classList.remove('visible');
    }
});

// Hamburger menu functionality
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show'); // Toggle visibility of the menu
});
