export const request = (path, opts = {}) => {
    const headers = Object.assign({},
        opts.headers || {},
        {
            'Content-Type': 'application/json'
        }
    );

    const data = Object.assign({method: 'POST'}, opts, {headers});
    console.log(data);
    return fetch(
        path,
        data
    );
};
