const app = new Vue({
    el: "#app",
    data: {
    	trains: [],
    	departure: '',
    	duration: '',
    	name: '',
    	price: '',
	},
  	mounted() {
	    if (localStorage.trains) {
	    	this.trains = JSON.parse(localStorage.trains);
	    }
  	},
  	watch:{
	    trains(newlist) {
	      	localStorage.trains = JSON.stringify(newlist);
	    }
  	}
})

function addNewRoute() {

	// Validate inputs 
	// Price is not validated as a number, because it can be equal to 45.9 
	// Departure should match the format 9:00 or 12:00
	// Duration should only be a number

	if (
		app.departure == '' || 
		app.duration == '' ||
		app.name == '' || 
		app.price == '' || 
		isNaN(app.duration) || 
		(
			app.departure.match(/\d{1}:\d{2}$/) == null && 
			app.departure.match(/\d{2}:\d{2}$/) == null 
		)
	)
		alert('Please fill in the right information');
	
	else {
	    
	    // Get departure hour and minute
	    hours = Math.floor(app.duration / 60);
	    minutes = app.duration % 60;

	    // Calculate arrival hour and minute
	    arrival_h = parseInt(app.departure.split(':')[0]) + hours;
	    arrival_m = parseInt(app.departure.split(':')[1]) + minutes;

	    // Apply right styling for calculated arrival time
	    arrival_h = arrival_h < 10 ? '0' + arrival_h : arrival_h;
	    arrival_m = arrival_m < 10 ? '0' + arrival_m : arrival_m;

	    arrival = arrival_h + ":" + arrival_m;
	    
	    // Add a Route
	    app.trains.push(
	    	{
	    		departure: app.departure,
	    		arrival: arrival,
	    		name: app.name,
	    		price: app.price
	    	}
    	);

    	// Reset input info
    	app.departure = app.duration = app.name = app.price = '';
	}
}