import { JTDDataType } from 'ajv/dist/jtd';

const createPositionDTO = {
    properties: {
        area: {
            enum: ['manager', 'developer'],
        },
        level: {
            enum: ['trainee', 'junior', 'middle', 'senior', 'lead', 'c-level'],
        },
        specialization: {
            enum: [
                'frontend',
                'backend',
                'full-stack',
                'qa',
                'devops',
                'designer',
                'project-manager',
                'cto',
                'ceo',
            ],
        },
    },
    additionalProperties: false,
};

const updatePositionDTO = {
    optionalProperties: {
        area: {
            enum: ['manager', 'developer'],
        },
        level: {
            enum: ['trainee', 'junior', 'middle', 'senior', 'lead', 'c-level'],
        },
        specialization: {
            enum: [
                'frontend',
                'backend',
                'full-stack',
                'qa',
                'devops',
                'designer',
                'project-manager',
                'cto',
                'ceo',
            ],
        },
    },
    additionalProperties: false,
};

export type TCreatePositionDTO = JTDDataType<typeof createPositionDTO>;
export type TUpdatePositionDTO = JTDDataType<typeof updatePositionDTO>;
export type TPositionDAO = TCreatePositionDTO;

export default ({ schema }) => ({
    dao: schema.compile(createPositionDTO),
    createDTO: schema.compile(createPositionDTO),
    updateDTO: schema.compile(updatePositionDTO),
});
