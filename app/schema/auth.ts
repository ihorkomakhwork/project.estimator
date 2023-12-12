import { JTDDataType } from 'ajv/dist/jtd';

const loginDTO = {
    properties: {
        email: { type: 'string', metadata: { format: 'email' } },
        password: { type: 'string' },
    },
    additionalProperties: false,
};

export type TLoginDTO = JTDDataType<typeof loginDTO>;

export default ({ schema }) => ({
    login: schema.compile(loginDTO),
});
