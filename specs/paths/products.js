module.exports = [{
    url: "/add",
    post: {
        summary: "add",
        description: "add product",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            },
            {
                in: "body",
                name: "body",
                description: "add product model",
                required: true,
                schema: {
                    $ref: "#/definitions/productCreate"
                }
            }],
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
    url: "/update/{id}",
    put: {
        summary: "update",
        description: "update",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            },
            {
                in: "path",
                type: "string",
                name: "id",
                description: "product id",
                required: true
            },
            {
                in: "body",
                name: "body",
                description: "Model of product update",
                required: true,
                schema: {
                    $ref: "#/definitions/productCreate"
                }
            }
        ],
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
    url: "/getProductById/{id}",
    get: {
        summary: "getProductById",
        description: "getProductById",
        parameters: [
            // {
            //     in: "header",
            //     name: "x-access-token",
            //     description: "token to access api",
            //     required: true,
            //     type: "string"
            // },
            {
                in: "path",
                type: "string",
                name: "id",
                description: "product id",
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
    url: "/getProducts",
    get: {
        summary: "getProducts",
        description: "getProducts",
        parameters: [
            // {
            //     in: "header",
            //     name: "x-access-token",
            //     description: "token to access api",
            //     required: true,
            //     type: "string"
            // },
            // {
            //     in: "path",
            //     type: "string",
            //     name: "id",
            //     description: "product id",
            //     required: true
            // },
        ],
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
    url: "/search",
    get: {
        summary: "search",
        description: "search product by name ",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            },
            {
                in: "query",
                type: "string",
                name: "name",
                description: "product name",
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
    url: "/imageUpload/{productId}/{type}",
    put: {
        summary: "upload images",
        description: "upload images",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            },
            {
                in: "formData",
                name: "image",
                type: "file",
                description: "The file to upload.",
                required: true,
            },
            {
                in: "path",
                type: "string",
                name: "productId",
                description: "product id",
                required: true
            },
            {
                in: "path",
                type: "string",
                name: "type",
                description: "type is banner or gallery",
                required: true
            }
        ],
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
    url: "/makeFavOrUnfav",
    post: {
        summary: "makeFavOrUnfav",
        description: "makeFavOrUnfav",
        parameters: [{
            in: "body",
            name: "body",
            description: "model of makeFavOrUnfav",
            required: true,
            schema: {
                $ref: "#/definitions/favOrUnFav"
            }
        }],
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
    url: "/favList/{id}",
    get: {
        summary: "fav product List",
        description: "fav product List",
        parameters: [
            // {
            //     in: "header",
            //     name: "x-access-token",
            //     description: "token to access api",
            //     required: true,
            //     type: "string"
            // },
            {
                in: "path",
                type: "string",
                name: "id",
                description: "user id",
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
    url: "/byStoreId/{id}",
    get: {
        summary: "product List",
        description: "product List",
        parameters: [
            // {
            //     in: "header",
            //     name: "x-access-token",
            //     description: "token to access api",
            //     required: true,
            //     type: "string"
            // },
            {
                in: "path",
                type: "string",
                name: "id",
                description: "store id",
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
];