const seatContainer = document.querySelector('.seat-container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const movies = document.querySelectorAll('.movie');
const hours = document.querySelectorAll('.hour');

let selectedMoviePrice = 0;

movies.forEach(movie => {
    movie.addEventListener('click', function() {
        selectedMoviePrice = parseInt(movie.getAttribute('value'));
        updateTotal();

        movies.forEach(m => m.classList.remove('selected'));
        movie.classList.add('selected');
    });
});

seatContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('seat') && !(e.target.classList.contains('reserved'))) {
        e.target.classList.toggle('selected');
        updateTotal();
    }
});

hours.forEach(hour => {
    hour.addEventListener('click', function() {
        hours.forEach(h => h.classList.remove('selected'));
        hour.classList.add('selected');
    });
});

function updateTotal() {
    let selectedSeatCount = seatContainer.querySelectorAll('.seat.selected').length;
    let totalPrice = selectedSeatCount * selectedMoviePrice;
    count.innerText = selectedSeatCount;
    amount.innerText = totalPrice;
}

function saveSelections() {
    const selectedSeats = [...seatContainer.querySelectorAll('.seat.selected')]
        .map(seat => [...seatContainer.querySelectorAll('.seat')].indexOf(seat));

    const selectedMovieIndex = [...movies].indexOf(document.querySelector('.movie.selected'));

    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    localStorage.setItem('selectedMovieIndex', selectedMovieIndex);
}

function loadSelections() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seatContainer.querySelectorAll('.seat').forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    if (selectedMovieIndex !== null) {
        const selectedMovie = movies[selectedMovieIndex];
        selectedMovie.classList.add('selected');
        selectedMoviePrice = parseInt(selectedMovie.getAttribute('value'));
    }

    updateTotal();
}

movies.forEach(movie => {
    movie.addEventListener('click', function() {
        saveSelections();
    });
});

seatContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('seat') && !(e.target.classList.contains('reserved'))) {
        saveSelections();
    }
});

document.addEventListener('DOMContentLoaded', loadSelections);
