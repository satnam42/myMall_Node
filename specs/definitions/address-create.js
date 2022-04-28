module.exports = [
    {
        name: "addressCreate",
        properties: {
            userId: {
                type: "string"
            },
            fullName: {
                type: "string"
            },
            area: {
                type: "string"
            },
            buildingNo: {
                type: "string"
            },
            city: {
                type: "string"
            },
            country: {
                type: "string"
            },
            state: {
                type: "string"
            },
            pinCode: {
                type: "string"
            },
            street: {
                type: "string"
            },
            isDefault: {
                type: "boolean",
                default: false
            }
        }
    }
];
