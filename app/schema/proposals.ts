import { JTDDataType } from 'ajv/dist/jtd';

const createProposalDTO = {
    properties: {
        title: { type: 'string' },
        customerId: { type: 'uint32' },
        state: {
            enum: ['pending', 'processing', 'estimating', 'reject'],
        },
        content: { type: 'string' },
        budget: { type: 'uint32' },
    },
    additionalProperties: false,
};

const updateProposalDTO = {
    optionalProperties: {
        title: { type: 'string' },
        customerId: { type: 'uint32' },
        state: {
            enum: ['pending', 'processing', 'estimating', 'reject'],
        },
        content: { type: 'string' },
        budget: { type: 'uint32' },
    },
    additionalProperties: false,
};

export type TCreateProposalDTO = JTDDataType<typeof createProposalDTO>;
export type TUpdateProposalDTO = JTDDataType<typeof updateProposalDTO>;
export type TProposalDAO = TCreateProposalDTO;

export default ({ schema }) => ({
    dao: schema.compile(createProposalDTO),
    createDTO: schema.compile(createProposalDTO),
    updateDTO: schema.compile(updateProposalDTO),
});
