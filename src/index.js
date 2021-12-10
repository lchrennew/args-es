import * as boolean from './types/boolean.js'
import * as string from './types/string.js'
import * as number from './types/number.js'
import * as list from './types/list.js'
import Schema from "./schema.js";
import Parser from "./parser.js";

const schema = new Schema({
    l: {
        description: 'Logging, logging will be disabled if this flag does not exists or set to false, true for enabled.',
        type: boolean,
        default: true
    },
    p: {
        description: 'Network port to listen',
        type: number,
        default: 8080
    },
    d: {
        description: 'Directory to save logs',
        type: string,
        default: '/usr/logs'
    },
    g: {
        description: 'A demo list',
        type: list,
    }
})

const parser = new Parser(schema)

const cases = [
    '',
    '-l',
    '-l true',
    '-l false',
    '-p 80 -d hello_world',
    '-p 0 -d hello_world -g a -g b -g e,f',
    '-p -2 -d hello_world -g a -g b -g e,f',
    '-p -2 -d hello world -g a -g b -g e,f',
]
cases.forEach(args => {
    console.log(`CASE: `, args)

    try {
        const result = parser.parse(args)
        console.log(result)
        console.log('\n')
    } catch (e) {
        console.info(e)
        schema.manual()
    }
})
