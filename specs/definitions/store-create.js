module.exports = [

    {
        name: "storeCreate",
        properties: {
            description: {
                type: "string"
            },
            name: {
                type: "string"
            },
            slogan: {
                type: "date"
            },
            webSiteUrl: {
                type: "string"
            },
            // deviceToken: {
            //     type: "string"
            // },
            location: {
                properties: {
                    type: 'array',
                    // items: {
                    properties: {
                        coordinates: { type: 'number' }
                    },

                }
            }

        },
    }

];