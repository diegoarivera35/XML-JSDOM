const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var xml;


async function loadXml() {
  if (xml == undefined) {
    let response = await fetch(
      "http://localhost:7777/Library-branch-locations.kml",
      {
        method: "get",
        headers: {
          "Content-Type": "application/xml"
        }
      }
    );
    //convert XML string to XML DOM document
    data = new JSDOM(await response.text(), { contentType: "application/xml" });
    //console.log(data);
    xml = data.window.document; //set the xml to the XML DOM document which we can query using DOM methods
  }
  return xml;
}
async function loadPlacemarks() {
    xml = await loadXml();
    return xml.querySelectorAll("Placemark");
}

async function getPlacemarkById(id) {
    xml = await loadXml();// get XML document
    xpathQuery = `//placemark[@id='${id}']`;
    let result = xml.evaluate(
      xpathQuery,
      xml,
      4,
      null
    );
    return result.iterateNext();
  }
  


module.exports = {
  loadPlacemarks,
  getPlacemarkById
};