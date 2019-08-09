const pathUtils = require('./path-utils');

const paths = [
    'push',
    'result'
];

module.exports = (url, request, response) => {

    const lastPathname = pathUtils.extractLastPathname(url);

    if (pathUtils.notHasPath(lastPathname, paths)) {
        return;
    }

    const readBody = (request, callback) => {
        let chunks = [];

        request.on('data', (chunk) => {
            chunks.push(chunk);
        }).on('end', () => callback(chunks));
    };

    if (lastPathname === 'push') {

        //code
        //var myJson = { endpoint: 'create_objects', body: { object: 'users', values: [{ name: 'Walter White', password: 'Heisenberg', registration:'123456' }] } };
        //var myJson = { endpoint: 'destroy_objects', body: { object: 'users'} };
        var myJson = {
            endpoint: 'load_objects',
            body: { object: 'users', group: ['id'], join: 'LEFT', fields: ['id', 'name', 'password', { object: 'cards', field: 'id' }, { object: 'templates', field: 'id' }] }
        };
        //TODO Retorno do push ?
        //
        response.setHeader('Content-Type', 'application/json');
        //
        response.end(JSON.stringify(myJson));
        //
        return;
    }

    if (lastPathname === 'result') {
        const callback = (chunks) => {
            var textBody = Buffer.concat(chunks).toString();
            //console.log('Response body content:\n' + JSON.stringify(JSON.parse(textBody), null, 2));
            console.log(JSON.parse(textBody));
            //code

        };

        readBody(request, callback);

        return;
    }

};
