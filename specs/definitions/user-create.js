module.exports = [

    {
        name: "userCreate",
        properties: {

            email: {
                type: "string"
            },
            name: {
                type: "string"
            },
            dob: {
                type: "date"
            },
            password: {
                type: "string"
            },
            fcmToken: {
                type: "string"
            },
            // deviceToken: {
            //     type: "string"
            // },
            // loc: {
            //     properties: {
            //         type: 'array',
            //         // items: {
            //         properties: {
            //             coordinates: { type: 'number' }
            //         },

            //     }
            // }

        },
    }

];