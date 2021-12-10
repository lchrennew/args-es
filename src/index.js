import * as boolean from './types/boolean.js'
import * as string from './types/string.js'
import * as number from './types/number.js'
import * as list from './types/list.js'
import Schema from "./schema.js";
import Parser from "./parser.js";

const schema = new Schema({
    a: {
        description: '',
        type: boolean,
        default: false
    },
    b: {
        description: '',
        type: number,
        default: 1
    },
    c: {
        description: '',
        type: string,
        default: 'hello world'
    },
    d: {
        description: '',
        type: list,
    }
})

const parser = new Parser(schema)

const cases = [
    '-a',
    '-a true',
    '',
    '-b 0 -c hello_world',
    '-b 0 -c hello_world -d a -d b -d e,f',
    '-b -2 -c hello_world -d a -d b -d e,f',
]
cases.forEach(args => {
    console.log(args)
    console.table(parser.parse(args))
    console.log(parser.parse(args))
})
