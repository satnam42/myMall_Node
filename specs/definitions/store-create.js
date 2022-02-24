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
            timing: {
                properties: {
                    to: { type: 'date' },
                    from: { type: 'date' },
                },
            },
            priceRange: {
                properties: {
                    to: { type: 'number' },
                    from: { type: 'number' },
                },
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