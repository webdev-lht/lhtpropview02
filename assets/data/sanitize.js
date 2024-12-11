const fs = require('fs');

const inputFile = 'data(121024).json';
const outputFile = 'data02.json';

const sanitizeKey = (key) => {
    return key.replace(/[$#[\]./]/g, '_');
};

const sanitizeString = (str) => {
    return str.replace(/[^a-zA-Z0-9\s.,]/g, '');
};

const sanitizeObject = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(sanitizeObject);
    } else if (typeof obj === 'object' && obj !== null) {
        const sanitizedObj = {};
        for (let key in obj) {
            const sanitizedKey = sanitizeKey(key);
            sanitizedObj[sanitizedKey] = sanitizeObject(obj[key]);
        }
        return sanitizedObj;
    } else if (typeof obj === 'string') {
        return sanitizeString(obj);
    } else {
        return obj;
    }
};

fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    
    try {
        const jsonData = JSON.parse(data);

        const sanitizedData = sanitizeObject(jsonData);

        fs.writeFile(outputFile, JSON.stringify(sanitizedData, null, 2), (err) => {
            if (err) {
                console.error('Error writing the file:', err);
            } else {
                console.log('Sanitized JSON saved to:', outputFile);
            }
        });
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});