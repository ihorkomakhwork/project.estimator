import { JTDDataType } from 'ajv/dist/jtd';

const customer = {
    properties: {
        userId: { type: 'uint8' },
        type: { type: 'string' },
        iban: { type: 'string' },
        license: {
            enum: ['pe', 'le'],
        },
    },
    additionalProperties: false,
};

export type TCustomer = JTDDataType<typeof customer>;

export default ({ schema }) => schema.compile(customer);
