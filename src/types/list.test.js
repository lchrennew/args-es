import { appendTo, parse } from "./list.js";

describe('parse', () => {

    describe('without defaultValue', () => {
        test('undefined should be an empty array', () => {
            expect(parse()).toEqual([])
        })

        test('empty string should be an empty array', () => {
            expect(parse('')).toEqual([])
        })

        test('string without commas should be an array that this string is the only element', () => {
            expect(parse('hello')).toEqual([ 'hello' ])
        })

        test('string with commas should be an array of splitting this string by comma', () => {
            expect(parse('hello,world')).toEqual([ 'hello', 'world' ])
        })
    })

    describe('with defaultValue', () => {
        test('undefined should be defaultValue', () => {
            expect(parse(undefined, [ 'hello', 'world' ])).toEqual([ 'hello', 'world' ])
        })

        test('empty string should be defaultValue', () => {
            expect(parse('', [ 'hello', 'world' ])).toEqual([ 'hello', 'world' ])
        })

        test('non-empty string should not use defaultValue', () => {
            expect(parse('hello', [ 'hello', 'world' ])).toEqual([ 'hello' ])
            expect(parse('hello,args', [ 'hello', 'world' ])).toEqual([ 'hello', 'args' ])
        })
    })
})

describe('appendTo', () => {
    test('new flag will be append to args', () => {
        const args = { list1: [ 'hi' ] }
        appendTo(args, { flag: 'list2', value: [] })
        expect(args).toEqual({ list1: [ 'hi' ], list2: [] })
    })

    test('duplicated flag will be combined to args by appending elements', () => {
        const args = { list: [ 'hello', 'world' ] }
        appendTo(args, { flag: 'list', value: [ 'hi', 'args' ] })
        expect(args).toEqual({ list: [ 'hello', 'world', 'hi', 'args' ] })
    })
})
