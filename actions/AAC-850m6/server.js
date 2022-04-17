function(properties, context) {

	const fetch = require('node-fetch');
    
    if(!context.keys["API URL"]){
        return "API URL is missing in the plugin configuration.";
    }
    
    if(!context.keys["SECRET KEY"]){
        return "SECRET KEY is missing in the plugin configuration.";
    }
    
    const body = properties.form_fields.reduce((prev, current) => {
        prev[current.key] = current.value;
        return prev;
    }, {});

    if(!body.email) {
        return "email key is required.";
    }
    

    return context.async(cb => {
        fetch(context.keys["API URL"], {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "apikey": context.keys["SECRET KEY"],
            }
        }).then(res => {
            return res.json();
        }).then(response => {
            if(response.status === "success") {
                return cb(undefined, response);
            } else {
                return cb(response.error);
            }
        }).catch(err => {
            return cb(err);
        });
    });

}