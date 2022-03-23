module.exports = [

    {
        name: "storeCreate",
        properties: {
            description: {
                type: "string"
            },
            userId: {
                type: "string"
            },
            name: {
                type: "string"
            },
            slogan: {
                type: "string"
            },
            webSiteUrl: {
                type: "string"
            },
            timing: {
                properties: {
                    to: { type: 'string' },
                    from: { type: 'string' },
                },
            },
            priceRange: {
                properties: {
                    to: { type: 'number' },
                    from: { type: 'number' },
                },
            },
            city: {
                type: "string"
            },
            scotNo: {
                type: "string"
            },
            state: {
                type: "string"
            },
            landmark: {
                type: "string"
            },
            zipCode: {
                type: "string"
            },
            contactNo: {
                type: "string"
            },
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