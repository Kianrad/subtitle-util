const parseString = require('xml2js').parseString;
const fs = require("fs");


const _getText = (obj) => {
    let res = "";
    for (let key of Object.keys(obj))
        for (let lineKey of Object.keys(obj[key])) {
            if (obj[key][lineKey]["_"]) {
                res += `<i>${obj[key][lineKey]["_"]}</i>`;
                res += "\n";
            }
        }
    return res;
}

const _frameToMilisecond = (time, framerate) => {
    let timeArr = time.split(":");
    let frameMil = framerate / parseInt(timeArr[3]);
    let miliSecond = 1000 / frameMil;
    miliSecond = parseInt(miliSecond);
    var pad = "000";
    var miliSecondZeroPad = (pad + miliSecond).slice(-pad.length);
    let result = `${timeArr[0]}:${timeArr[1]}:${timeArr[2]},${miliSecondZeroPad}`;
    return result;
}

exports.convert = async function (source, destination) {
    let lineNumber = 1;
    if (!fs.existsSync(source)) return Promise.reject("Source file not found!");
    let file = fs.readFileSync(source, "utf8");
    file = file.replace(/<br\/>/g, '\n');
    var stream = fs.createWriteStream(destination, { flags: 'w' });

    parseString(source, function (err, result) {
        const lines = result.tt.body[0].div[0].p;
        stream.once('open', function (fd) {
            for (let line of lines) {
                stream.write(lineNumber.toString());
                stream.write('\n');
                let begin = _frameToMilisecond(line["$"].begin, 24);
                let end = _frameToMilisecond(line["$"].end, 24);
                stream.write(`${begin} --> ${end}`);
                stream.write('\n');
                let text = line["_"];
                if (text === undefined) {
                    text = _getText(line);
                }
                stream.write(text.toString());
                stream.write('\n');
                stream.write('\n');
                lineNumber++;
            }
            stream.end();
        });
    });
}

