import { JTDDataType } from 'ajv/dist/jtd';

const userDTO = {
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
                        sallary: { type: 'uint8' },
                        positionId: { type: 'uint8' },
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

export type TUserDTO = JTDDataType<typeof userDTO>;
export type TUserDAO = JTDDataType<typeof userDAO>;
export default ({ schema }) => ({
    dto: schema.compile(userDTO),
    dao: schema.compile(userDAO),
});
