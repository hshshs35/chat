var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage',() =>{
    it('should generate correct message object', ()=>{
        var from = 'Sha';
        var text = 'Some message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
})

describe('generateLocationMessage', ()=>{
    it('should generate correct location object', ()=>{
        var from = 'Sha';
        var lat = 33;
        var lng = 55;
        var url = 'https://www.google.com/maps?q=33,55';

        var location = generateLocationMessage(from, lat, lng);

        expect(location).toInclude({from, url})
        
    })
})