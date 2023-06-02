document.addEventListener('DOMContentLoaded', function() {
    function createSailingBoatRow(sailingBoat) {
        var row = document.createElement('tr');
        var idCell = document.createElement('td');
        idCell.textContent = sailingBoat.id;
        row.appendChild(idCell);
        var nameCell = document.createElement('td');
        nameCell.textContent = sailingBoat.name;
        row.appendChild(nameCell);
        var pointsCell = document.createElement('td');
        pointsCell.textContent = sailingBoat.points;
        row.appendChild(pointsCell);
        var sailingTypeCell = document.createElement('td');
        sailingTypeCell.textContent = sailingBoat.sailingType.name;
        row.appendChild(sailingTypeCell);
        var sailingRaceCell = document.createElement('td');
        sailingRaceCell.textContent = sailingBoat.sailingRace ? sailingBoat.sailingRace.date : 'N/A'; // Check if sailingRace is null
        row.appendChild(sailingRaceCell);
        var actionCell = document.createElement('td');
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function() {
            openEditDialog(sailingBoat);
        });
        actionCell.appendChild(editButton);
        row.appendChild(actionCell);
        return row;
    }

    function openEditDialog(sailingBoat) {
        var dialog = document.createElement('div');
        dialog.classList.add('edit-dialog');
        dialog.innerHTML = '<h3>Edit Sailing Boat</h3>' +
            '<label>Name:</label>' +
            '<input type="text" value="' + sailingBoat.name + '">' +
            '<label>Points:</label>' +
            '<input type="number" value="' + sailingBoat.points + '">' +
            '<label>Sailing Race:</label>' +
            '<select id="sailingRaceSelect"></select>' +
            '<button>Save</button>';

        var saveButton = dialog.querySelector('button');
        saveButton.addEventListener('click', function() {
            var nameInput = dialog.querySelector('input[type="text"]');
            var pointsInput = dialog.querySelector('input[type="number"]');
            var raceSelect = dialog.querySelector('#sailingRaceSelect');

            var updatedBoat = {
                id: sailingBoat.id,
                name: nameInput.value,
                points: parseInt(pointsInput.value),
                sailingType: sailingBoat.sailingType,
                sailingRace: { id: raceSelect.value } // Create a sailingRace object with the selected ID
            };

            updateSailingBoat(updatedBoat);
            dialog.remove();
        });

        document.body.appendChild(dialog);

        var raceSelect = dialog.querySelector('#sailingRaceSelect');
        fetch('http://localhost:8080/sailingraces')
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch sailing races.');
                }
            })
            .then(function(races) {
                races.forEach(function(race) {
                    var option = document.createElement('option');
                    option.value = race.id;
                    option.textContent = race.date;
                    raceSelect.appendChild(option);
                });

                // Set the selected value based on the current sailing boat's race
                if (sailingBoat.sailingRace) {
                    raceSelect.value = sailingBoat.sailingRace.id;
                } else {
                    raceSelect.value = ''; // Set to empty value if sailingRace is null
                }
            })
            .catch(function(error) {
                alert(error.message);
            });

        document.body.appendChild(dialog);
    }

    function updateSailingBoat(boat) {
        fetch('http://localhost:8080/sailingboats/' + boat.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(boat)
        })
            .then(function(response) {
                if (response.ok) {
                    alert('Sailing boat updated successfully!');
                    loadSailingBoats();
                } else {
                    throw new Error('Failed to update sailing boat.');
                }
            })
            .catch(function(error) {
                alert(error.message);
            });
    }

    function loadSailingBoats() {
        fetch('http://localhost:8080/sailingboats')
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch sailing boats.');
                }
            })
            .then(function(data) {
                var sailingBoatTable = document.getElementById('sailingBoatTable');
                var tbody = sailingBoatTable.getElementsByTagName('tbody')[0];
                tbody.innerHTML = ''; // Clear the existing rows
                data.forEach(function(sailingBoat) {
                    tbody.appendChild(createSailingBoatRow(sailingBoat));
                });
            })
            .catch(function(error) {
                alert(error.message);
            });
    }

    loadSailingBoats();
});
