export const request = (path, opts = {})=> {
    const headers = Object.assign({},
                        opts.headers || {},
                        {'Content-Type': 'application/json'
                        }
                    );
    return fetch(
        path,
        Object.assign({ method: 'POST',}, opts,{headers}),
    );
};
