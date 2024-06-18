// script.js
document.getElementById('blogForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    let formData = new FormData(this);
    
    // You can handle the form data submission via AJAX to a server here
    // Example:
    // fetch('your-upload-endpoint', {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Success:', data);
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });

    // For demonstration, just log the form data
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }

    // Optionally, reset the form after submission
    this.reset();
});
