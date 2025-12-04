document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
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
        downloadBtn.style.display = 'none'; // Hide download button initially

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
            
            // Show download button after a short delay to ensure QR code is rendered
            // Although QRCode.js is synchronous, giving it a tick helps with DOM updates
            setTimeout(() => {
                if (qrcodeContainer.querySelector('img') || qrcodeContainer.querySelector('canvas')) {
                    downloadBtn.style.display = 'block';
                }
            }, 100);

        } catch (error) {
            console.error("Error generating QR code:", error);
            alert("產生 QR Code 時發生錯誤，請稍後再試。");
        }
    });

    downloadBtn.addEventListener('click', () => {
        const img = qrcodeContainer.querySelector('img');
        const canvas = qrcodeContainer.querySelector('canvas');
        
        let url = '';
        
        if (img && img.src) {
            url = img.src;
        } else if (canvas) {
            url = canvas.toDataURL("image/png");
        }

        if (url) {
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = url;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('無法下載 QR Code，請稍後再試。');
        }
    });

    // Generate on Enter key
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });
});