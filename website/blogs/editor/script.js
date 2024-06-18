// script.js
document.getElementById('blogForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    let formData = new FormData(this);

    // Get today's date to create directory path
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    let date = String(today.getDate()).padStart(2, '0');
    let directoryPath = `../${year}/${month}-${date}`; // Replace with your directory path

    // Check if directory exists, create if it doesn't
    checkOrCreateDirectory(directoryPath)
        .then(() => {
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
        })
        .catch(error => {
            console.error('Error checking/creating directory:', error);
            alert('Failed to create directory for the blog. Please try again later.');
        });
});

// Function to check if directory exists, create if not
function checkOrCreateDirectory(directoryPath) {
    return new Promise((resolve, reject) => {
        // Check if directory exists
        let xhr = new XMLHttpRequest();
        xhr.open('HEAD', directoryPath);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 404) {
                    // Directory does not exist, create it
                    createDirectory(directoryPath)
                        .then(resolve)
                        .catch(reject);
                } else if (xhr.status === 200) {
                    // Directory exists
                    resolve();
                } else {
                    reject(new Error(`Failed to check directory existence. Status: ${xhr.status}`));
                }
            }
        };
        xhr.send();
    });
}

// Function to create directory
function createDirectory(directoryPath) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', directoryPath, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 201 || xhr.status === 200) {
                    resolve();
                } else {
                    reject(new Error(`Failed to create directory. Status: ${xhr.status}`));
                }
            }
        };
        xhr.send();
    });
}
