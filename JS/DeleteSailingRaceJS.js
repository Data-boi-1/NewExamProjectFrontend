$(document).ready(function() {
    function createSailingRaceRow(sailingRace) {
        var row = $("<tr>");
        row.append($("<td>").text(sailingRace.id));
        row.append($("<td>").text(sailingRace.date));
        var deleteButton = $("<button>").text("Delete");
        deleteButton.click(function() {
            deleteSailingRace(sailingRace.id);
        });
        row.append($("<td>").append(deleteButton));
        return row;
    }

    function deleteSailingRace(id) {
        fetch('http://localhost:8080/sailingraces/' + id, {
            method: 'DELETE'
        })
            .then(function(response) {
                if (response.ok) {
                    alert('Sailing race deleted successfully!');
                    loadSailingRaces();
                } else {
                    throw new Error('Failed to delete sailing race.');
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
                var sailingRaceTable = $("#sailingRaceTable tbody");
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
