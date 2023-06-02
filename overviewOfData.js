document.addEventListener('DOMContentLoaded', function () {
    const overviewRaces = document.getElementById('overviewRacesID');
    const overviewBoats = document.getElementById('overviewBoatsID');
    fetchRaces();
    fetchBoats();

    function fetchRaces() {
        fetch('http://localhost:8080/sailingraces')
            .then(response => response.json())
            .then(data => {
                data.forEach(race => {
                    const row = generateRaceRow(race);
                    overviewRaces.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function fetchBoats() {
        fetch('http://localhost:8080/sailingboats')
            .then(response => response.json())
            .then(data => {
                data.forEach(boat => {
                    const row = generateBoatRow(boat);
                    overviewBoats.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function generateRaceRow(race) {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${race.id}</td>
      <td>${race.date}</td>
    `;
        return row;
    }

    function generateBoatRow(boat) {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${boat.id}</td>
      <td>${boat.name}</td>
      <td>${boat.sailingType.name}</td>
    `;
        return row;
    }
});
