module.exports = [{
    url: "/create",
    post: {
        summary: "create",
        description: "create",
        parameters: [{
            in: "body",
            name: "body",
            description: "register user model",
            required: true,
            schema: {
                $ref: "#/definitions/userCreate"
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
    url: "/login",
    post: {
        summary: "login",
        description: "login",
        parameters: [{
            in: "body",
            name: "body",
            description: "Model of user login",
            required: true,
            schema: {
                $ref: "#/definitions/login"
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
    url: "/resetPassword/{id}",
    put: {
        summary: "reset Password ",
        description: "reset Password",
        parameters: [{
            in: "header",
            name: "x-access-token",
            description: "token to access api",
            required: true,
            type: "string"
        },
        {
            in: "path",
            name: "id",
            description: "user id",
            required: true,
            type: "string"
        },

        {
            in: "body",
            name: "body",
            description: "Model of resetPassword ",
            required: true,
            schema: {
                $ref: "#/definitions/resetPassword"
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
    },
},
{
    url: "/update/{id}",
    put: {
        summary: "update",
        description: "update",
        parameters: [{
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
            description: "user id",
            required: true
        },
        {
            in: "body",
            name: "body",
            description: "Model of user update",
            required: true,
            schema: {
                $ref: "#/definitions/updateUser"
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
    url: "/forgotPassword",
    post: {
        summary: "forgotPassword",
        description: "forgotPassword",
        parameters: [{
            in: "body",
            name: "body",
            description: "Model of forgotPassword",
            required: true,
            schema: {
                $ref: "#/definitions/forgotPassword"
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
    url: "/otpVerify",
    post: {
        summary: "otpVerify",
        description: "otpVerify",
        parameters: [{
            in: "header",
            name: "x-access-token",
            description: "token to access api",
            required: true,
            type: "string"
        },
        {
            in: "body",
            name: "body",
            description: "Model of otpVerify",
            required: true,
            schema: {
                $ref: "#/definitions/otpVerify"
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
    url: "/changePassword",
    post: {
        summary: "change Password",
        description: "change Password",
        parameters: [{
            in: "header",
            name: "x-access-token",
            description: "token to access api",
            required: true,
            type: "string"
        },
        {
            in: "body",
            name: "body",
            description: "Model of change Password",
            required: true,
            schema: {
                $ref: "#/definitions/changePassword"
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
    url: "/profileImageUpload/{id}",
    put: {
        summary: "upload Profile Pic ",
        description: "upload Profile Pic ",
        parameters: [{
            in: "formData",
            name: "image",
            type: "file",
            description: "The file to upload.",
            required: true,
        },
        {
            in: "path",
            type: "string",
            name: "id",
            description: "user id",
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
    url: "/getUserById/{id}",
    get: {
        summary: "getUserById",
        description: "getUserById",
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
    url: "/search",
    get: {
        summary: "search",
        description: "serch user by name ",
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
                description: "user name",
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