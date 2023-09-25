const { parseSync } = require('./index.js')
const { readFileSync } = require('node:fs')

const text = readFileSync('./test.tsx', 'utf8')


const parsed = parseSync(text)

parsed.program = JSON.parse(parsed.program)
parsed.comments = parsed.comments.filter(Boolean).map(i => ({
    text: i.text,
    span_lo: i.spanLo,
    span_hi: i.spanHi
}))

console.log(parsed)

const parsed2 = parseSync(text)

parsed2.program = JSON.parse(parsed2.program)
parsed2.comments = parsed2.comments.filter(Boolean).map(i => ({
    text: i.text,
    span_lo: i.spanLo,
    span_hi: i.spanHi
}))

console.log(parsed2)
