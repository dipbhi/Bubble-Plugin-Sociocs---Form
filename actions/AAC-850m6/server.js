function(properties, context) {

	const fetch = require('node-fetch');

    return context.async(cb => {
        return cb(null, {status: true, result: ""});
    });

}