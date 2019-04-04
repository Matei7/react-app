export const request = (path, opts = {}) => {
    const data = Object.assign({method: 'POST'}, opts);
    return fetch(
        path,
        data
    );
};
