document.addEventListener('DOMContentLoaded', function() {
    var addBoatForm = document.getElementById('addBoatForm');
    var sailingTypeSelect = document.getElementById('sailingType');
    var sailingRaceSelect = document.getElementById('sailingRace');

    addBoatForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var boat = {
            name: document.getElementById('name').value,
            points: parseInt(document.getElementById('points').value),
            sailingType: {
                id: parseInt(sailingTypeSelect.value)
            },
            sailingRace: {
                id: parseInt(sailingRaceSelect.value)
            }
        };

        fetch('http://localhost:8080/sailingboats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(boat)
        })
            .then(function(response) {
                if (response.ok) {
                    alert('Sailing boat added successfully!');
                    // Perform any additional actions on success
                } else {
                    throw new Error('Failed to add sailing boat.');
                }
            })
            .catch(function(error) {
                alert(error.message);
            });
    });

    fetch('http://localhost:8080/sailingboats/sailingtypes')
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch sailing types.');
            }
        })
        .then(function(types) {
            console.log(types); // Log the retrieved sailing types for debugging

            types.forEach(function(type) {
                var option = document.createElement('option');
                option.value = type.id;
                option.textContent = type.name;
                sailingTypeSelect.appendChild(option);
            });
        })
        .catch(function(error) {
            alert(error.message);
        });

    fetch('http://localhost:8080/sailingboats/sailingraces')
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch sailing races.');
            }
        })
        .then(function(races) {
            console.log(races); // Log the retrieved sailing races for debugging

            races.forEach(function(race) {
                var option = document.createElement('option');
                option.value = race.id;
                option.textContent = race.date;
                sailingRaceSelect.appendChild(option);
            });
        })
        .catch(function(error) {
            alert(error.message);
        });
});
