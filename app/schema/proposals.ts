import { JTDDataType } from 'ajv/dist/jtd';

const proposal = {
    properties: {
        title: { type: 'string' },
        customerId: { type: 'uint8' },
        state: {
            enum: ['pending', 'processing', 'estimating', 'reject'],
        },
        content: { type: 'string' },
    },
    additionalProperties: false,
};

export type TProposal = JTDDataType<typeof proposal>;

export default ({ schema }) => schema.compile(proposal);
