import type { IEntity } from '../../lib/contract';

export default ({ authService }): IEntity => ({
    create: {
        hooks: {
            prev: [],
            after: [],
        },
        method(payload) {
            const message = authService.register(payload);
            return { message, code: 201 };
        },
    },
});
