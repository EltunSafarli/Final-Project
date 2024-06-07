document.getElementById('send-button').addEventListener('click', () => {
    const comment = document.getElementById('comment-input').value;
    const email = document.getElementById('email-input').value;
    if (email.includes('@')) {
      if (comment.trim() !== '' && email.trim() !== '') {
        const newComment = `<li><p><b>Şərh:</b> ${comment}</p><p><b>İstifadəçi:</b> ${email}</p></li>`;
        document.getElementById('comments-list').innerHTML += newComment;
        document.getElementById('comment-input').value = '';
        document.getElementById('email-input').value = '';
      }
    } else {
      alert('Zəhmət olmazsa məlumatların doğruluğunu yoxlayın, hər hansısa problem yarandığı təqdirdə bizimlə əlaqə saxlayın');
    }
  });




  
// -------------------------;

fetch('https://freetestapi.com/api/v1/poets')
  .then(response => response.json())
  .then(data => {
   
    window.poetsData = data;

    populateTable(data);
    
    populateNationalityFilter(data);
    populateGenreFilter(data);
  });


function populateNationalityFilter(data) {
  const nationalityFilter = document.getElementById('nationalityFilter');
  const nationalities = [...new Set(data.map(poet => poet.nationality))];
  nationalities.forEach(nationality => {
      const option = document.createElement('option');
      option.value = nationality;
      option.textContent = nationality;
      nationalityFilter.appendChild(option);
  });
}

function filterTableByNationality() {
  const selectedNationality = document.getElementById('nationalityFilter').value;
  if (selectedNationality === 'all') {
      populateTable(window.poetsData);
  } else {
      const filteredData = window.poetsData.filter(poet => poet.nationality === selectedNationality);
      populateTable(filteredData);
  }
}
function populateTable(data) {
    const poetsTbody = document.getElementById('poets-tbody');
    const noDataMessage = document.getElementById('no-data-message');
    poetsTbody.innerHTML = '';

    if (data.length === 0) {
        noDataMessage.style.display = 'block';
    } else {
        noDataMessage.style.display = 'none';
        data.forEach(poet => {
            const poetRow = document.createElement('tr');
            poetRow.innerHTML = `
                <td>${poet.name}</td>
                <td>${poet.biography}</td>
                <td>${poet.nationality}</td>
                <td>${poet.birth_year} - ${poet.death_year}</td>
                <td>${poet.genre.join(', ')}</td>
                <td>${poet.notable_works.join(', ')}</td>
                <td>${poet.award}</td>
            `;
            poetsTbody.appendChild(poetRow);
        });
    }
}


function populateNationalityFilter(data) {
    const nationalityFilter = document.getElementById('nationalityFilter');
    const nationalities = [...new Set(data.map(poet => poet.nationality))];
    nationalities.forEach(nationality => {
        const option = document.createElement('option');
        option.value = nationality;
        option.textContent = nationality;
        nationalityFilter.appendChild(option);
    });
}


function populateGenreFilter(data) {
    const genreFilter = document.getElementById('genreFilter');
    const genres = [...new Set(data.flatMap(poet => poet.genre))];
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}


function filterTable() {
    const selectedNationality = document.getElementById('nationalityFilter').value;
    const selectedGenre = document.getElementById('genreFilter').value;

    let filteredData = window.poetsData;

    if (selectedNationality !== 'all') {
        filteredData = filteredData.filter(poet => poet.nationality === selectedNationality);
    }

    if (selectedGenre !== 'all') {
        filteredData = filteredData.filter(poet => poet.genre.includes(selectedGenre));
    }

    populateTable(filteredData);
}

// Function to sort table based on name
function sortTable() {
  const sortOrder = document.getElementById('sortOrder').value;
  const sortedData = [...window.poetsData];

  if (sortOrder === 'a-z') {
      sortedData.sort((a, b) => (a.name > b.name) ? 1 : -1);
  } else if (sortOrder === 'z-a') {
      sortedData.sort((a, b) => (a.name < b.name) ? 1 : -1);
  }

  populateTable(sortedData);
}







