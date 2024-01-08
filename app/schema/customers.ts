import { JTDDataType } from 'ajv/dist/jtd';

const createCustomerDTO = {
    properties: {
        userId: { type: 'uint32' },
        type: { type: 'string' },
        iban: { type: 'string' },
        license: {
            enum: ['pe', 'le'],
        },
    },
    additionalProperties: false,
};
const updateCustomerDTO = {
    optionalProperties: {
        userId: { type: 'uint32' },
        type: { type: 'string' },
        iban: { type: 'string' },
        license: {
            enum: ['pe', 'le'],
        },
    },
    additionalProperties: false,
};

export type TCreateCustomerDTO = JTDDataType<typeof createCustomerDTO>;
export type TUpdateCustomerDTO = JTDDataType<typeof updateCustomerDTO>;
export type TCustomerDAO = TCreateCustomerDTO;

export default ({ schema }) => ({
    dao: schema.compile(createCustomerDTO),
    createDTO: schema.compile(createCustomerDTO),
    updateDTO: schema.compile(updateCustomerDTO),
});
