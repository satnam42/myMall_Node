module.exports = [{
    name: "updateUser",
    properties: {
        name: {
            type: "string"
        },
        dob: {
            type: "string"
        },

        sex: {
            type: "string"
        },

        status: {
            type: "string"
        },

        loc: {
            properties: {
                type: { type: 'string' },
                coordinates: {
                    type: 'array',
                    items: {
                        type: "number",
                    }
                },
            },
        },

    }
}];