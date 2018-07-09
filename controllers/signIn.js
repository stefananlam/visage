const handleSignIn = (db, bcrypt) => (req, res) => {
	db.select('email', 'hash').from('login')
		.where('email', '=', req.body.email)
		.then(data => {
			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
			if (isValid) {
				db.select('*').from('users')
					.where('email', '=', req.body.email)
					.then(user => {
						res.json(user[0])
					})
					.catch(err => res.status(400).json('Unable to retrieve user'))
			} else {
				res.status(400).json('Wrong login credentials');
			}
		})
		.catch(err => res.status(400).json('Wrong login credentials'))
}

module.exports = {
	handleSignIn: handleSignIn
}