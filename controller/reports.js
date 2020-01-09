const Ticket = require('../models/tickets');
const Showtime = require('../models/showtimes');

const reportController = {};

reportController.monthReport = async (req, res, next) => {
	res.render('report_month', {
		action: "Thêm suất chiếu"
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
	res.send(JSON.stringify(data));
}

module.exports = reportController;