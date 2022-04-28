module.exports = [
    {
        url: "/createCategory",
        post: {
            summary: "add category",
            description: "add category",
            parameters: [{
                in: "formData",
                name: "name",
                type: "string",
                description: "Category Name",
                required: true
            },
            {
                in: "formData",
                name: "file",
                type: "file",
                description: "The Category file to upload.",
                required: true
            },],
            responses: {
                default: {
                    description: "Unexpected error",
                    schema: {
                        $ref: "#/definitions/Error"
                    }
                }
            }
        }
    },

    {
        url: "/getCategories",
        get: {
            summary: "Get Categories ",
            description: "Get Categories",
            parameters: [],
            responses: {
                default: {
                    description: "Unexpected error",
                    schema: {
                        $ref: "#/definitions/Error"
                    }
                }
            }
        }
    },
    // {
    //     url: "/delete/{id}",
    //     delete: {
    //         summary: "delete",
    //         description: "delete Category Or Subcategory by id",
    //         parameters: [
    //             {
    //                 in: "path",
    //                 name: "id",
    //                 description: "Category Or Subcategory Id",
    //                 required: true,
    //                 type: "string"
    //             }
    //         ],
    //         responses: {
    //             default: {
    //                 description: "Unexpected error",
    //                 schema: {
    //                     $ref: "#/definitions/Error"
    //                 }
    //             }
    //         }
    //     }
    // }
]