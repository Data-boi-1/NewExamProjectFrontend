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
        var actionCell = document.createElement('td');
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            deleteSailingBoat(sailingBoat.id);
        });
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        return row;
    }

    function deleteSailingBoat(id) {
        fetch('http://localhost:8080/sailingboats/' + id, {
            method: 'DELETE'
        })
            .then(function(response) {
                if (response.ok) {
                    alert('Sailing boat deleted successfully!');
                    loadSailingBoats();
                } else {
                    throw new Error('Failed to delete sailing boat.');
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
