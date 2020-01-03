const admins = require('../models/admins');


exports.loadAll = () => {
	// var sql=`select email from adminUsers`;
	// return db.load(sql);
}

exports.add = async (user, next) => {
    const admin = await admins.create(user);
    next(admin);
}

exports.login = user => {
	// var sql=`select * from adminUsers where email='${user.email}' and password='${user.password}';`;
	// return db.load(sql);
}

exports.update = user => {
	// var sql=`update adminUsers set name='${user.name}' where id=${user.id};`;
	// return db.save(sql);
}

exports.singleId = (id) => {
    return admin = admins.findOne({_id:id});
}

exports.singleUsername = async (usrname, next) => {
    const admin = await admins.findOne({ Username: usrname});
    next(admin);     
}