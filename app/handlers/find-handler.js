const { logger } = require('../utils');
const { findWorkersByLocation } = require('../api');

const getFind = async (req, res) => {
    logger.info('get find handler');
    res.render('pages/find', {
        data: '',
        msg: ''
    });
};

const postFind = async (req, res) => {
    logger.info('post find handler');
    const errors = checkForErrors(req.body);
    if (errors.length > 0) {
        const errorList = errors[errors.length - 1];
        res.render('pages/find', {
            errors: errors,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            errorList: errorList,
            data: '',
        });
        return;
    };

    let response = await findWorkersByLocation(req.body);
    let msg = '';
    console.log('response=', response)
    if (response.length === 0) {
        response = '';
        msg = 'No matching records found';
    };
    res.render('pages/find', {
        data: response,
        message: msg,
    });
};

const checkForErrors = ((body) => {
    const coordinateRegex = /^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$/
    let errors = [];
    let errorList = {};
    
    if (body.latitude.length == 0) {
        errors.push(
            {
                text: 'Latitude is mandatory',
                href: '#latitude'
            }
        );
        errorList.latitude = 'Latitude is mandatory';
    } else if (!coordinateRegex.test(body.latitude)) { 
        errors.push(
            {
                text: 'Incorrect format for latitude',
                href: '#latitude'
            }
        );
        errorList.latitude = 'Incorrect format for latitude';
    };

    if (body.longitude.length == 0) {
        errors.push(
            {
                text: 'Longitude is mandatory',
                href: '#longitude'
            }
        );
        errorList.longitude = 'Longitude is mandatory';
    } else if (!coordinateRegex.test(body.longitude)) { 
        errors.push(
            {
                text: 'Incorrect format for longitude',
                href: '#longitude'
            }
        );
        errorList.longitude = 'Incorrect format for longitude';
    };
    
    if (errors.length > 0) {
        errors.push(errorList);
    };

    return errors;
});

module.exports = {
    getFind,
    postFind
};