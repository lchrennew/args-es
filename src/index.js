import * as boolean from './types/boolean.js'
import * as string from './types/string.js'
import * as number from './types/number.js'
import * as list from './types/list.js'
import ArgsSchema from "./args-schema.js";
import ArgsParser from "./args-parser.js";

const schema = new ArgsSchema({
    l: {
        description: 'Logging, logging will be disabled if this flag does not exists or set to false, true for enabled',
        type: boolean,
        default: false
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

const parser = new ArgsParser(schema)

const cases = [
    '',
    '-l',
    'l -g',
    '-l -g',
    '-g',
    '-g -g x',
    '-l true',
    '-l false',
    '-d hello_world -p 80 -l fAlse',
    '-p 0 -d hello_world -g a -g b -g e,f -l True',
    '-p -2 -d hello_world -g a -g b -g e,f',
    '-p -2 -d hello world -g a -g b -g e,f',
    '-p -2 -p 3 -d hello world -g a -g b -g e,f',
    '-p abc -d hello world -g a -g b -g cde,f',
]
cases.forEach(args => {
    console.log(`CASE:`, args)

    try {
        const result = parser.parse(args)
        console.log(`RESULT:`, result)
    } catch (e) {
        console.warn(`ERROR:`, e)
        schema.manual()
    }
    console.log('\n')
})
