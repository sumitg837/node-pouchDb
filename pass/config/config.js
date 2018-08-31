module.exports = {
	'env': 'dev',
	'dev':{
		'passport' :{
			'secret': 'passport node',
			'maxAge': 60000
		},
		'db':{
			'client': 'mysql',
			'host': '127.0.0.1',
			'port': '3306',
			'user': 'root',
			'password': 'hestabit',
			'database': 'start',
			'charset': 'utf8',
			'timezone': 'UTC',
			'pool':{
					'min': 1,
					'max':10
				},
		}
	}
}