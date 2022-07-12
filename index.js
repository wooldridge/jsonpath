const {XMLParser} = require("fast-xml-parser");
const {JSONPath} = require('jsonpath-plus');
fs = require('fs');

// Optionally force paths to arrays
const alwaysArray = [
    //"person.contacts.contact"
];

// fast-xml-parser: https://github.com/NaturalIntelligence/fast-xml-parser
const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "",
    allowBooleanAttributes: true,
    isArray: (name, jpath, isLeafNode, isAttribute) => { 
        if (alwaysArray.indexOf(jpath) !== -1) return true;
    }
};
const parser = new XMLParser(options);

const xmlToJson = path => {
	const xml = fs.readFileSync(path);
	console.log("Path: ", path);
	console.dir(xml.toString(), {depth: null});
	const json = parser.parse(xml);
	console.dir(json, {depth: null});
	return json;
};

// jsonpath-plus: https://jsonpath-plus.github.io/JSONPath/docs/ts/
const files = ["./data/10001.xml", "./data/10004.xml"];
const expr =  "$.person.contacts..[?(@[`type`] === 'email')]";
files.forEach(f => {
	const json = xmlToJson(f);
	console.log('Get filtered elements via JSONPath: ' + f);
	console.log(JSONPath(expr, json));
})
