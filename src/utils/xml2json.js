import {parseStringPromise} from 'xml2js';

/**
 *
 * @param xmlString {string} - XML string to convert to JSON
 * @returns {Promise<*|null>} - JSON object or null if the XML is invalid
 */
export const xmlToJson = async (xmlString) => {
    try {
        return await parseStringPromise(xmlString);
    } catch (err) {
        console.error('Failed to parse XML:', err);
        return null;
    }
};





