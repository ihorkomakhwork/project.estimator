import { JTDDataType } from 'ajv/dist/jtd';

const createUserDTO = {
    properties: {
        name: { type: 'string' },
        lastName: { type: 'string' },
        middleName: { type: 'string' },
        password: { type: 'string' },
        phone: { type: 'string', metadata: { format: 'phone' } },
        email: { type: 'string', metadata: { format: 'email' } },
        country: { type: 'string' },
        city: { type: 'string' },
        address: { type: 'string' },
        role: {
            discriminator: 'type',
            mapping: {
                employee: {
                    properties: {
                        sallary: { type: 'uint32' },
                        positionId: { type: 'uint32' },
                    },
                },
                customer: {
                    properties: {
                        license: {
                            enum: ['pe', 'le'],
                        },
                        iban: {
                            type: 'string',
                        },
                    },
                },
                admin: {
                    properties: {},
                },
            },
        },
    },
    additionalProperties: false,
} as const;

const updateUserDTO = {
    optionalProperties: {
        name: { type: 'string' },
        lastName: { type: 'string' },
        middleName: { type: 'string' },
        password: { type: 'string' },
        phone: { type: 'string', metadata: { format: 'phone' } },
        email: { type: 'string', metadata: { format: 'email' } },
        country: { type: 'string' },
        city: { type: 'string' },
        address: { type: 'string' },
        role: {
            discriminator: 'type',
            mapping: {
                employee: {
                    properties: {
                        sallary: { type: 'uint32' },
                        positionId: { type: 'uint32' },
                    },
                },
                customer: {
                    properties: {
                        license: {
                            enum: ['pe', 'le'],
                        },
                        iban: {
                            type: 'string',
                        },
                    },
                },
                admin: {
                    properties: {},
                },
            },
        },
    },
    additionalProperties: false,
} as const;

const userDAO = {
    properties: {
        name: { type: 'string' },
        lastName: { type: 'string' },
        middleName: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string', metadata: { format: 'email' } },
        country: { type: 'string' },
        city: { type: 'string' },
        address: { type: 'string' },
        role: {
            enum: ['employee', 'customer', 'admin'],
        },
    },
    additionalProperties: false,
} as const;

export type TCreateUserDTO = JTDDataType<typeof createUserDTO>;
export type TUserDAO = JTDDataType<typeof userDAO>;
export type TUpdateUserDTO = JTDDataType<typeof updateUserDTO>;
export default ({ schema }) => ({
    createDTO: schema.compile(createUserDTO),
    updateDTO: schema.compile(updateUserDTO),
    dao: schema.compile(userDAO),
});
