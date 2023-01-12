// matrix(1, 2, 3, 4, 5, 6);
// matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
// perspective(17px);
// rotate(0.5turn);
// rotate3d(1, 2, 3, 10deg);
// rotateX(10deg);
// rotateY(10deg);
// rotateZ(10deg);
// translate(12px, 50%);
// translate3d(12px, 50%, 3em);
// translateX(2em);
// translateY(3in);
// translateZ(2px);
// scale(2, 0.5);
// scale3d(2.5, 1.2, 0.3);
// scaleX(2);
// scaleY(0.5);
// scaleZ(0.3);
// skew(30deg, 20deg);
// skewX(30deg);
// skewY(1.07rad);

ELEMENTS = [
    "a",
    "abbr",
    "acronym",
    "address",
    "applet",
    "area",
    "article",
    "aside",
    "b",
    "base",
    "basefont",
    "bdi",
    "bdo",
    "big",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "center",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "font",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "header",
    "hr",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "meter",
    "nav",
    "noframes",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strike",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "svg",
    "table",
    "tbody",
    "td",
    "template",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "tt",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
]

TRANSFORMS = [
    { transform: 'matrix' },
    { transform: 'matrix3d' },
    { transform: 'perspective', params: [{ type: 'pixel' }] },
    { transform: 'rotate', params: [{ type: 'degree' }] },
    { transform: 'rotate3d', max: 10, params: [{ type: 'number' }, { type: 'number' }, { type: 'number' }, { type: 'degree' }] },
    { transform: 'rotateX', params: [{ type: 'degree' }] },
    { transform: 'rotateY', params: [{ type: 'degree' }] },
    { transform: 'rotateZ', params: [{ type: 'degree' }] },
    { transform: 'translate', params: [{ type: 'pixel' }, { type: 'percent' }] },
    { transform: 'translate3d', params: [{ type: 'pixel' }, { type: 'pixel' }, { type: 'pixel' }] },
    { transform: 'translateX', params: [{ type: 'pixel' }] },
    { transform: 'translateY', params: [{ type: 'pixel' }] },
    { transform: 'translateZ', params: [{ type: 'pixel' }] },
    { transform: 'scale', params: [{ type: 'number' }, { type: 'decimal' }] },
    { transform: 'scale3d', params: [{ type: 'decimal' }, { type: 'decimal' }, { type: 'decimal' }] },
    { transform: 'scaleX', params: [{ type: 'number' }] },
    { transform: 'scaleY', params: [{ type: 'decimal' }] },
    { transform: 'scaleZ', params: [{ type: 'decimal' }] },
    { transform: 'skew', params: [{ type: 'degree' }, { type: 'degree' }] },
    { transform: 'skewX', params: [{ type: 'degree' }] },
    { transform: 'skewY', params: [{ type: 'degree' }] },
]

function round(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
}

function randomPercent() {
    return Math.floor(Math.random() * 100)
}

function randomDecimal(max) {
    return Math.random() * max
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomDegree() {
    return Math.floor(Math.random() * 360);
}

function buildMatrix(transform) {
    if (transform == 'matrix3d') {
        types = ['int', 'pct']
        let randomNum = types[randomInt(2)] === 'int' ? randomInt(100) : round(randomDecimal(1))

        return `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, ${randomNum})`;
    }
    return `matrix(${randomInt(10)}, ${randomInt(10)}, ${randomInt(10)}, ${randomInt(10)}, ${randomInt(10)}, ${randomInt(10)})`
}


function buildTransform() {
    let randomTransform = TRANSFORMS[randomInt(21)]
    if (randomTransform.transform.includes('matrix')) {
        return buildMatrix(randomTransform.transform)
    }

    let transformParams = ''

    for (param of randomTransform.params) {
        let x;
        switch (param.type) {
            case 'decimal':
                x = round(randomDecimal(param.max ?? 100))
                break;
            case 'degree':
                x = `${randomDegree()}deg`
                break;
            case 'pixel':
                x = `${randomInt(1000)}px`
                break;
            case 'percent':
                x = randomPercent()
                break;
            default:
                x = randomInt(param.max ?? 300)
        }

        transformParams = transformParams.concat(` ${x}`)
    }

    return `${randomTransform.transform}(${transformParams.trim()})`
}

function setTransform(element) {
    const transform = buildTransform()
    const duration = `${randomInt(7000)}s`

    element.style.transitionProperty = 'transform'
    element.style.transitionDuration = duration
    element.style.transform = transform
}

async function rapeMind() {
    document.getElementsByTagName('html').translate = "no"

    for (let element of ELEMENTS) {
        let docElements = document.getElementsByTagName(element)
        if (docElements.length === 0) continue

        for (el of docElements) {
            setTransform(el)
        }
    }
}

rapeMind()