document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('certificate-form');
    const previewBtn = document.getElementById('preview-btn');
    const downloadBtn = document.getElementById('download-btn');

    // Form elements
    const nameInput = document.getElementById('name');
    const eventInput = document.getElementById('event');
    const dateInput = document.getElementById('date');
    const instructorInput = document.getElementById('instructor');
    const organizerInput = document.getElementById('organizer');

    // Certificate elements
    const certificateName = document.getElementById('certificate-name');
    const certificateEvent = document.getElementById('certificate-event');
    const certificateDate = document.getElementById('certificate-date');
    const certificateId = document.getElementById('certificate-id');

    // Load user name from localStorage
    const storedName = localStorage.getItem('name');
    if (storedName) {
        nameInput.value = storedName;
        certificateName.textContent = storedName;
    }

    // Generate a unique certificate ID
    function generateCertificateId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `CH${timestamp}-${random}`;
    }

    // Format date to a readable string
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Update certificate preview
    function updatePreview() {
        certificateName.textContent = nameInput.value || 'John Doe';
        certificateEvent.textContent = eventInput.value || 'Web Development Workshop';
        certificateDate.textContent = dateInput.value ? formatDate(dateInput.value) : 'March 15, 2024';
        certificateId.textContent = generateCertificateId();
    }

    // Handle preview button click
    previewBtn.addEventListener('click', () => {
        if (form.checkValidity()) {
            updatePreview();
        } else {
            form.reportValidity();
        }
    });

    // Handle download button click
    downloadBtn.addEventListener('click', () => {
        if (form.checkValidity()) {
            updatePreview();
            downloadCertificate();
        } else {
            form.reportValidity();
        }
    });

    // Download certificate as PDF
    function downloadCertificate() {
        const certificate = document.querySelector('.certificate-template');

        html2canvas(certificate, {
            scale: 2,
            logging: false,
            useCORS: true
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 297;
            const imgHeight = canvas.height * imgWidth / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`certificate-${certificateId.textContent}.pdf`);
        });
    }

    // Initialize preview with defaults
    updatePreview();
});
