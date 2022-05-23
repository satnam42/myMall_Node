module.exports = [
    {
        name: "productCreate",
        properties: {
            description: {
                type: "string"
            },
            name: {
                type: "string"
            },
            masterPrice: {
                type: "number"
            },
            productUrl: {
                type: "string"
            },
            offerTime: {
                type: "date"
            },
            storeId: {
                type: "string"
            },
            discount: {
                type: "string"
            },
            categoryId: {
                type: "string"
            },
            brand: {
                type: "string"
            },
            isOnDiscount: {
                type: "boolean",
                default: false
            },
            // deviceToken: {
            //     type: "string"
            // },
            size: {
                // properties: {
                type: 'array',
                items: {
                    properties: {
                        value: { type: 'string' },
                        price: { type: 'number' }
                    },
                }
                // }
            },
            colors: {
                // properties: {
                type: 'array',
                items: {
                    properties: {
                        name: { type: 'string' },
                        price: { type: 'number' }
                    },
                }
                // }
            },
            feature: {
                // properties: {
                type: 'array',
                items: {
                    properties: {
                        key: { type: 'string' },
                        value: { type: 'string' }
                    },
                }
                // }
            }
        },
    }
];