import Mock from 'mockjs'

Mock.mock('/api/data', function(args = { body: '' }) {
	let opts = JSON.parse(args.body)
	if (opts.type == 1) {
		return {
			req: opts.type,
			data: 111
		}
	} else {
		return {
			req: opts.type,
			data: 222
		}
	}
})