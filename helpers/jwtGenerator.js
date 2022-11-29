const jwt = require('jsonwebtoken');

const jwtGenerator = (uid, name) => {
    const payload = { uid, name };
    try {
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '5h',
        });
        return token;
    } catch (err) {
        console.log(err);
        return 'No se pudo generar el token';
    }
    // return new Promise((resolve, reject) => {
    //     const payload = { uid, name };

    //     jwt.sign(payload, process.env.SECRET_KEY, {
    //         expiresIn: '24h'
    //     }, (err, token) => {
    //         if (err) {
    //             console.log(err);
    //             reject('No se pudo generar el token');
    //         } else {
    //             resolve(token);
    //         }
    //     })
    // });
}

module.exports = {
    jwtGenerator
}