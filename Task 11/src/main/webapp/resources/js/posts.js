"use strict";

class Author {

    constructor(id = 0, name = '', photoLink = '') {
        this.id = id;
        this.name = name;
        this.photoLink = photoLink;
    }

    static _validate(author) {
        return (author.id >= 0 && author.name.length > 0);
    }
}

class Post {
    
    constructor(id = 0, text = '', date = new Date('1970-01-01T00:00:00'), 
                author = new Author(), hashtags = [], likes = []) {
        this.id = id;
        this.text = text;
        this.date = date;
        this.author = author;
        this.hashtags = hashtags;
        this.likes = likes;
    }

    static _validate(post) {
        return (post.id >= 0 && 
            post.text.length <= 200 &&
            post.text.trim().length > 0 && 
            Author._validate(post.author) &&
            post.likes.every(author => Author._validate(author))
        );
    }
}

var authors = [
    new Author(1, 'Author #1', 'https://cdn.cnn.com/cnnnext/dam/assets/160725131446-graham-car-crash-evolved-human-full-169.jpeg'),
    new Author(2, 'Author #2', 'https://cdn.britannica.com/s:800x450,c:crop/00/193400-138-6C287BFA/What-is-it-to-be-human.jpg'),
    new Author(3, 'Author #3', 'https://d.newsweek.com/en/full/1550782/woman-face.jpg?w=1600&h=1600&q=88&f=259b631d0e6a0a2a37b8cb59c5eb90d4'),
    new Author(4, 'Author #4', 'https://www.coe.int/documents/365513/10877703/statement-covid19-2020-870x489.jpg/4e71c0ff-c295-8ae5-1467-6ce3ad01a68f'),
    new Author(5, 'Author #5', 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/08/Hair_Female_Studio_Smile-1296x728-header-1296x728.jpg?w=1155&h=1528'),
    new Author(6, 'Author #6', 'https://etimg.etb2bimg.com/thumb/msid-73560435,width-1200,height-900,imgsize-164410,overlay-ettech/human-beings-are-unable-to-connect-with-artificial-intelligence-pranav-mistry.jpg'),
    new Author(7, 'Author #7', 'https://specials-images.forbesimg.com/imageserve/5d49f8bd37f1f90008ec7e1a/960x0.jpg?fit=scale'),
    new Author(8, 'Author #8', 'https://pm1.narvii.com/6906/0e83318fa64c21a8d405a8f5277319cc2c19b1c8r1-640-640v2_00.jpg'),
    new Author(9, 'Author #9', 'https://img.huffingtonpost.com/asset/5da3ed552000006905500760.jpeg?ops=scalefit_630_noupscale'),
    new Author(10, 'Author #10', 'https://media.nature.com/lw800/magazine-assets/d41586-018-06004-0/d41586-018-06004-0_16043062.jpg')
];

var posts = [
    new Post(1, 'Post #1', new Date('2020-03-17T23:00:00'), authors[0], ['hash-1-1', 'hash-1-2'], [authors[1], authors[2]]),
    new Post(2, 'Post #2', new Date('2020-02-24T19:58:16'), authors[1], ['hash-2-1', 'hash-2-2', 'hash-2-3'], [authors[0], authors[9]]),
    new Post(3, 'Post #3', new Date('2018-03-19T05:40:50'), authors[2], ['hash-3-1'], [authors[9], authors[3], authors[5]]),
    new Post(4, 'Post #4', new Date('2020-02-18T16:08:17'), authors[3], ['hash-4-1', 'hash-4-2', 'hash-4-3', 'hash-4-4'], []),
    new Post(5, 'Post #5', new Date('2020-01-25T17:15:04'), authors[4], ['hash-5-1', 'hash-5-2'], [authors[0], authors[6]]),
    new Post(6, 'Post #6', new Date('2018-12-01T08:53:35'), authors[5], [], [authors[2], authors[3], authors[5], authors[6]]),
    new Post(7, 'Post #7', new Date('2020-10-27T16:10:18'), authors[6], ['hash-7-1'], [authors[8], authors[9], authors[0]]),
    new Post(8, 'Post #8', new Date('2018-04-20T08:53:35'), authors[7], ['hash-8-1', 'hash-8-2', 'hash-8-3'], [authors[4], authors[5]]),
    new Post(9, 'Post #9', new Date('2019-04-11T16:42:42'), authors[8], ['hash-9-1', 'hash-9-2', 'hash-9-3'], []),
    new Post(10, 'Post #10', new Date('2020-05-14T08:53:35'), authors[2], ['hash-9-1', 'hash-9-2'], [authors[2], authors[4], authors[5]]),
    new Post(11, 'Post #11', new Date('2019-11-11T09:40:36'), authors[0], [], []),
    new Post(12, 'Post #12', new Date('2015-05-18T15:10:20'), authors[1], ['hash-12-1'], [authors[3], authors[4], authors[7], authors[8], authors[9]]),
    new Post(13, 'Post #13', new Date('2020-08-24T14:01:51'), authors[2], [], [authors[2]]),
    new Post(14, 'Post #14', new Date('2019-10-28T23:05:40'), authors[3], ['hash-14-1', 'hash-14-2', 'hash-14-3'], [authors[7], authors[9]]),
    new Post(15, 'Post #15', new Date('2020-11-01T20:15:14'), authors[4], ['hash-15-1', 'hash-15-2'], [authors[0], authors[2], authors[3]]), 
    new Post(16, 'Post #16', new Date('2019-01-01T04:43:42'), authors[5], ['hash-15-1'], [authors[4], authors[8], authors[9]]),
    new Post(17, 'Post #17', new Date('2019-02-17T06:18:54'), authors[2], ['hash-17-1'], [authors[5]]),
    new Post(18, 'Post #18', new Date('2020-02-27T16:00:14'), authors[7], ['hash-18-1', 'hash-18-2', 'hash-18-3'], [authors[6], authors[8]]),
    new Post(19, 'Post #19', new Date('2018-06-02T18:59:32'), authors[8], ['hash-19-1', 'hash-19-2', 'hash-19-3', 'hash-19-4'], [authors[3]]),
    new Post(20, 'Post #20', new Date('2018-11-14T22:05:23'), authors[9], [], [authors[4], authors[7], authors[8], authors[9]])
];

