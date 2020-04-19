const querystring = require('querystring');

test("querystring 으로 Object -> Query String 전환된다", () => {
    expect(querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' }))
        .toBe('foo=bar&baz=qux&baz=quux&corge=');
})