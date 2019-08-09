const paths = [
    'new_biometric_image.fcgi',
    'new_biometric_template.fcgi',
    'new_card.fcgi',
    'new_user_id_and_password.fcgi',
    'new_user_identified.fcgi',
    'user_get_image.fcgi',
    'device_is_alive.fcgi',
    'template_create.fcgi',
    'fingerprint_create.fcgi',
    'card_create.fcgi',
    'new_rex_log.fcgi',
    'master_password.fcgi'
];

module.exports = (url, request, response) => {

    const lastPathname = url.pathname.split('/').pop();

    if (!paths.includes(lastPathname)) {
        return;
    }

    const readBody = (request, callback) => {
        let chunks = [];

        request.on('data', (chunk) => {
            chunks.push(chunk);
        }).on('end', () => callback(chunks));
    };

    let callback = (chunks) => {
        var textBody = Buffer.concat(chunks).toString();
        console.log('Response body content:\n' + JSON.stringify(JSON.parse(textBody), null, 2));
    };

    if (['new_biometric_template.fcgi', 'new_biometric_image.fcgi'].includes(lastPathname)) {
        callback = (chunks) => {
            console.log('Response body length -> ' + chunks.length);
        };


    }

    readBody(request, callback);

    if (lastPathname === 'device_is_alive.fcgi') {
        response.statusCode = 200;
        response.end();
    }

};
