$(document).ready(function() {
    var editRaceDialog = $('#editRaceDialog');
    var editDateInput = $('#editDate');
    var saveRaceButton = $('#saveRaceButton');
    var currentRaceId = null;

    function createSailingRaceRow(sailingRace) {
        var row = $('<tr>');
        row.append($('<td>').text(sailingRace.id));
        row.append($('<td>').text(sailingRace.date));
        var editButton = $('<button>').text('Edit');
        editButton.click(function() {
            openEditDialog(sailingRace);
        });
        row.append($('<td>').append(editButton));
        return row;
    }

    function openEditDialog(sailingRace) {
        currentRaceId = sailingRace.id;
        editDateInput.val(sailingRace.date);
        editRaceDialog.show();
    }

    function closeEditDialog() {
        currentRaceId = null;
        editDateInput.val('');
        editRaceDialog.hide();
    }

    saveRaceButton.click(function() {
        var updatedRace = {
            id: currentRaceId,
            date: editDateInput.val()
        };
        updateSailingRace(updatedRace);
        closeEditDialog();
    });

    function updateSailingRace(race) {
        fetch('http://localhost:8080/sailingraces/' + race.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(race)
        })
            .then(function(response) {
                if (response.ok) {
                    alert('Sailing race updated successfully!');
                    loadSailingRaces();
                } else {
                    throw new Error('Failed to update sailing race.');
                }
            })
            .catch(function(error) {
                alert(error.message);
            });
    }

    function loadSailingRaces() {
        fetch('http://localhost:8080/sailingraces')
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch sailing races.');
                }
            })
            .then(function(data) {
                var sailingRaceTable = $('#sailingRaceTable tbody');
                sailingRaceTable.empty();
                data.forEach(function(sailingRace) {
                    sailingRaceTable.append(createSailingRaceRow(sailingRace));
                });
            })
            .catch(function(error) {
                alert(error.message);
            });
    }

    loadSailingRaces();
});
