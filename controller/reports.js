const Ticket = require('../models/tickets');
const Showtime = require('../models/showtimes');
const Movie = require('../models/movies');

const reportController = {};

reportController.monthReport = async (req, res, next) => {
	res.render('report_month', {
		action: "Thêm suất chiếu"
	});
}

reportController.movieReport = async (req, res, next) => {
	const allmovies = await Movie.find({});
	res.render('report_movie', {
		action: "Thống kê doanh thu phim", movies: allmovies
	});
}

reportController.getMonthReportData = async (req, res, next) => {
	const month = parseInt(req.query.month);
	const year = parseInt(req.query.year);
	const startDate = new Date(year, month, 1);
	const endDate = new Date(year, (month+1), 0);
	const numOfDays = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000) + 1;
	const allTickets = await Ticket.find({});
	let ticketCount = [];
	for (let i=0;i<numOfDays;i++) {
		ticketCount.push(0);
	}
	let monthRevenue = [];
	for (let i=0;i<numOfDays;i++) {
		monthRevenue.push(0);
	}
	for (let i=0;i<allTickets.length;i++) {
		const showtime = await Showtime.findById(allTickets[i].ShowtimeID);
		if ((showtime.Time.getMonth() == month) && (showtime.Time.getFullYear() == year)) {
			const pointer = showtime.Time.getDate() - 1;
			ticketCount[pointer] += 1;
			monthRevenue[pointer] += allTickets[i].Cost;
		}
	}
	const data = {
		ticketCount, monthRevenue
	}
	console.log(data);
	res.send(JSON.stringify(data));
}

reportController.getMovieReportData = async (req, res, next) => {
	const movieId = req.query.movie;
	const allTickets = await Ticket.find({});
	console.log(allTickets);
	let totalRevenue = [];
	let ticketCount = [];
	let time = [];
	let count = 0;
	let check = false;

	for (let i=0;i<allTickets.length;i++) {
		const showtime = await Showtime.findById(allTickets[i].ShowtimeID);
		if(showtime.MovieID == movieId)
		{
			check = false;
			for(let j=0; j<count;j++)
			{
				// console.log("1" + time[j]);
				// console.log("2" + showtime.Time);
				// console.log(Date.parse(time[j]) == Date.parse(showtime.Time));
				if(Date.parse(time[j]) == Date.parse(showtime.Time))
				{
					ticketCount[j] += 1;
					totalRevenue[j] += allTickets[i].Cost;
					check = true;
					break;
				}
			}
			if(!check)
			{
				// console.log("3" + count);
				time.push(showtime.Time);
				//console.log(time[count]);
				ticketCount.push(1);
				totalRevenue.push(allTickets[i].Cost);
				count++;
			}
		}
	}
	const data = {
		time, ticketCount, totalRevenue
	}
	const a = new Date(Date.parse(time[0]));
	console.log(data);
	console.log(a.getDay());
	res.send(JSON.stringify(data));
}

module.exports = reportController;