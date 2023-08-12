import { parseStringPromise } from 'xml2js';
import {xmlToJson} from "../src/utils/xml2json.js";
import {expect, it,describe} from "@jest/globals";
describe('xmlToJson function', () => {
    it('should convert XML to JSON', async () => {
        const xmlString = `
      <?xml version="1.0" encoding="UTF-8"?>
      <note>
        <to>hHello</to>
        <from>Jani</from>
        <heading>Reminder</heading>
        <body>Code a lot and get gym membership</body>
      </note>
    `;

        const expectedJson = await parseStringPromise(xmlString);
        const result = await xmlToJson(xmlString);

        expect(result).toEqual(expectedJson);
    });

    it('should return null if the XML is invalid', async () => {
        const xmlString = '<note><to>invalidXML</to></note'; // Missing closing tag

        const result = await xmlToJson(xmlString);

        expect(result).toBeNull();
    });
});
