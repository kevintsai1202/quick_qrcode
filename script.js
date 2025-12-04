document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const generateBtn = document.getElementById('generateBtn');
    const qrcodeContainer = document.getElementById('qrcode');
    let qrcodeObj = null;

    generateBtn.addEventListener('click', () => {
        const url = urlInput.value.trim();

        if (!url) {
            alert('請輸入網址！');
            return;
        }

        // Clear previous QR code
        qrcodeContainer.innerHTML = '';

        try {
            // Generate new QR code
            qrcodeObj = new QRCode(qrcodeContainer, {
                text: url,
                width: 256,
                height: 256,
                colorDark : "#000000",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
        } catch (error) {
            console.error("Error generating QR code:", error);
            alert("產生 QR Code 時發生錯誤，請稍後再試。");
        }
    });

    // Generate on Enter key
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });
});
