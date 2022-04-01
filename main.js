function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function textNodesUnder(e) { var n = []; for (e = e.firstChild; e; e = e.nextSibling)3 == e.nodeType ? n.push(e) : n = n.concat(textNodesUnder(e)); return n };
function stringSplice(e, c, i, l) { return c < 0 && (c = e.length + c) < 0 && (c = 0), e.slice(0, c) + (l || "") + e.slice(c + i) };
function test(sub) {
    if (sub.textContent)
        if (sub.textContent.match(/\w+/g) && !sub.textContent.match(/<.*>/g) && !sub.textContent.match(/{[\s\S]*?}/gm))
            return true;
    return false;
}

var instances = 0;


function dorukify() {
    const allEl = textNodesUnder(document.body);
    const limit = allEl.length;
    const searchLimit = parseInt(limit / 2) < 500 ? parseInt(limit / 2) : 500;
    var subject = allEl[getRandomInt(limit)], trytimes = 0;

    while (!test(subject) && trytimes < searchLimit) {
        subject = allEl[getRandomInt(limit)];
        trytimes++;
    }

    if (test(subject)) {
        //console.log(subject.textContent)
        var arr = [];
        {
            const re = /\w+/g;
            var m = [];
            while (m) {
                m = re.exec(subject.textContent);
                if (m && m.index != undefined) {
                    arr.push([m.index, m[0].length + m.index])
                }
            }
        }
        const pick = arr[getRandomInt(arr.length)];
        var str = subject.textContent.slice(pick[0], pick[1]);
        if (arr.length > 0) {

            const opt = getRandomInt(3);

            //console.log(str)
            //console.log(opt)
            switch (opt) {
                case 0: //shift
                    var a = getRandomInt(str.length - 1);
                    var b = a + 1;
                    var temp = str[a];
                    str = stringSplice(str, a, 1, str[b]);
                    str = stringSplice(str, b, 1, temp);
                    break;
                case 1: //duplicate
                    var a = getRandomInt(str.length - 1);
                    str = stringSplice(str, a + 1, 1, str[a]);
                    break;
                case 2: //remove
                    str = stringSplice(str, getRandomInt(str.length), 1, "");
                    break;
            }
            //console.log(str)
            subject.textContent = stringSplice(subject.textContent, pick[0], pick[1] - pick[0], str);
        }

    }
    //console.log(instances)
    instances++;
    if (instances > 100)
        clearInterval(grammarInterval);

}
var grammarInterval;
window.onload = () => {
    grammarInterval = setInterval(dorukify, 10000);
}
