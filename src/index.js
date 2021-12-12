import ArgsSchema from "./args-schema.js";
import ArgsParser from "./args-parser.js";
import sampleSchemaDefinition from "./sample-schema-definition.js";
import ArgsManual from "./args-manual.js";

const schema = new ArgsSchema(sampleSchemaDefinition)

const parser = new ArgsParser(schema)
const manual = new ArgsManual(sampleSchemaDefinition)
const cases = [
    '',
    '-l',
    'l -g',
    '-l -g',
    '-g',
    '-s',
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
        manual.print()
    }
    console.log('\n')
})
