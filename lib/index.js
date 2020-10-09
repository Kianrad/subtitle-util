const itt = require("./itt");

class SubtitleUtil {
    constructor(filename) {
        this._filename = filename;
        switch (filename.split('.').pop()) {
            case "itt":
                this._module = itt;
                break;
            default:
                break;
        }
        if (!this._module)
            throw "Subtitle file not supported"
    }

    convertToStr(destination) {
        return this._module.convertToStr(this._filename, destination);
    }
}

module.exports = SubtitleUtil;