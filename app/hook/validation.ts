export default ({ lib }) => ({
    hook1: (payload) => {
        if (!payload.p) throw new lib.error.api.BadRequest();
    },

    hook2: (payload) => {
        if (payload.hello !== 'string') throw new Error('Invalid payload');
    },
});
