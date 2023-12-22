const seatContainer = document.querySelector('.seat-container');

seatContainer.addEventListener('click', function(e) {
    if(e.target.classList.contains('seat') && !(e.target.classList.contains('reserved')))
    {
        e.target.classList.toggle('selected');

        let selectedSeatCount = seatContainer.querySelectorAll('.seat.selected').length;
        console.log('selectedSeatCount');
    }
});