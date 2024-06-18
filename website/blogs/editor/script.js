// script.js
document.getElementById('blogForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    let formData = new FormData(this);

    // Construct the HTML content
    let htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${formData.get('title')}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f0f0f0;
                }

                header {
                    background-color: #333;
                    color: #fff;
                    text-align: center;
                    padding: 10px 0;
                }

                main {
                    max-width: 800px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }

                form {
                    display: flex;
                    flex-direction: column;
                }

                label {
                    margin-bottom: 8px;
                }

                input, textarea {
                    padding: 8px;
                    margin-bottom: 12px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 16px;
                    width: 100%;
                    box-sizing: border-box; /* Ensure padding is included in the width */
                }

                button {
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    font-size: 16px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #0056b3;
                }

                @media (max-width: 600px) {
                    form {
                        width: 100%;
                    }
                }
            </style>
        </head>
        <body>
            <header>
                <h1>${formData.get('title')}</h1>
            </header>
            <main>
                <p>${formData.get('content')}</p>
                <img src="${formData.get('image')}" alt="Uploaded Image" style="max-width: 100%;">
            </main>
        </body>
        </html>
    `;

    // Create a Blob from the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.get('title').replace(/ /g, '_').toLowerCase()}.html`; // Adjust filename if needed
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Optionally, reset the form after submission
    this.reset();
});
