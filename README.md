# subtitle-util
Convert and manipulate subtitle files

# itt-to-srt
Convert iTunes Timed Text (.itt) to srt

# Usage
```javascript
const SubtitleUtil = require("subtitle-util");
const subtitleUtil = new SubtitleUtil("./test.itt");
subtitleUtil.convertToStr("./test.srt").then(lines => {
    console.log(lines);
}).catch(e =>
    console.log(e)
)
```