$(document).ready(function() {
    var addRaceForm = document.getElementById('addRaceForm');
    addRaceForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var race = {
            date: document.getElementById('date').value
        };

        fetch('http://localhost:8080/sailingraces', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(race)
        })
            .then(function(response) {
                if (response.ok) {
                    alert('Sailing race added successfully!');
                    // Perform any additional actions on success
                } else {
                    throw new Error('Failed to add sailing race.');
                }
            })
            .catch(function(error) {
                alert(error.message);
            });
    });
});
