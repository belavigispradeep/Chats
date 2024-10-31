// Select all elements with the class "delete_chat"
const deleteButtons = document.querySelectorAll(".delete_chat");

// Add a click event listener to each delete button
deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        // Show confirmation dialog
        const confirmDelete = confirm("Are you sure you want to delete this chat?");
        
        // Prevent form submission if the user clicks "Cancel"
        if (!confirmDelete) {
            event.preventDefault();
        }
    });
});
