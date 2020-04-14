"use strict";

let validateAuthor = function(author) {
    return (author.id >= 0 && author.name.length > 0);
}


let validatePost = function(post) {
    return (post.id >= 0 && 
        post.text.length <= 200 &&
        validateAuthor(post.author) &&
        post.likes.every(author => validateAuthor(author))
    );
}

var authors = [
    {"id": 1, "name": 'Author #1', "photoLink": 'https://cdn.cnn.com/cnnnext/dam/assets/160725131446-graham-car-crash-evolved-human-full-169.jpeg'},
    {"id": 2, "name": 'Author #2', "photoLink": 'https://cdn.britannica.com/s:800x450,c:crop/00/193400-138-6C287BFA/What-is-it-to-be-human.jpg'},
    {"id": 3, "name": 'Author #3', "photoLink": 'https://d.newsweek.com/en/full/1550782/woman-face.jpg?w=1600&h=1600&q=88&f=259b631d0e6a0a2a37b8cb59c5eb90d4'},
    {"id": 4, "name": 'Author #4', "photoLink": 'https://www.coe.int/documents/365513/10877703/statement-covid19-2020-870x489.jpg/4e71c0ff-c295-8ae5-1467-6ce3ad01a68f'},
    {"id": 5, "name": 'Author #5', "photoLink": 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/08/Hair_Female_Studio_Smile-1296x728-header-1296x728.jpg?w=1155&h=1528'},
    {"id": 6, "name": 'Author #6', "photoLink": 'https://etimg.etb2bimg.com/thumb/msid-73560435,width-1200,height-900,imgsize-164410,overlay-ettech/human-beings-are-unable-to-connect-with-artificial-intelligence-pranav-mistry.jpg'},
    {"id": 7, "name": 'Author #7', "photoLink": 'https://specials-images.forbesimg.com/imageserve/5d49f8bd37f1f90008ec7e1a/960x0.jpg?fit=scale'},
    {"id": 8, "name": 'Author #8', "photoLink": 'https://pm1.narvii.com/6906/0e83318fa64c21a8d405a8f5277319cc2c19b1c8r1-640-640v2_00.jpg'},
    {"id": 9, "name": 'Author #9', "photoLink": 'https://img.huffingtonpost.com/asset/5da3ed552000006905500760.jpeg?ops=scalefit_630_noupscale'},
    {"id": 10, "name": 'Author #10', "photoLink": 'https://media.nature.com/lw800/magazine-assets/d41586-018-06004-0/d41586-018-06004-0_16043062.jpg'}
]

var posts = [
    {"id": 1, "text": 'Post #1', "date": new Date('2020-03-17T23:00:00'), "author": authors[0], "hashtags": ['hash-1-1', 'hash-1-2'], "likes": [authors[1], authors[2]]},
    {"id": 2, "text": 'Post #2', "date": new Date('2020-02-24T19:58:16'), "author": authors[1], "hashtags": ['hash-2-1', 'hash-2-2', 'hash-2-3'], "likes": [authors[0], authors[9]]},
    {"id": 3, "text": 'Post #3', "date": new Date('2018-03-19T05:40:50'), "author": authors[2], "hashtags": ['hash-3-1'], "likes": [authors[9], authors[3], authors[5]]},
    {"id": 4, "text": 'Post #4', "date": new Date('2020-02-18T16:08:17'), "author": authors[3], "hashtags": ['hash-4-1', 'hash-4-2', 'hash-4-3', 'hash-4-4'], "likes": []},
    {"id": 5, "text": 'Post #5', "date": new Date('2020-01-25T17:15:04'), "author": authors[4], "hashtags": ['hash-5-1', 'hash-5-2'], "likes": [authors[0], authors[6]]},
    {"id": 6, "text": 'Post #6', "date": new Date('2018-12-01T08:53:35'), "author": authors[5], "hashtags": [], "likes": [authors[2], authors[3], authors[5], authors[6]]},
    {"id": 7, "text": 'Post #7', "date": new Date('2020-10-27T16:10:18'), "author": authors[6], "hashtags": ['hash-7-1'], "likes": [authors[8], authors[9], authors[0]]},
    {"id": 8, "text": 'Post #8', "date": new Date('2018-12-01T08:53:35'), "author": authors[7], "hashtags": ['hash-8-1', 'hash-8-2', 'hash-8-3'], "likes": [authors[4], authors[5]]},
    {"id": 9, "text": 'Post #9', "date": new Date('2019-04-11T16:42:42'), "author": authors[8], "hashtags": ['hash-9-1', 'hash-9-2', 'hash-9-3'], "likes": []},
    {"id": 10, "text": 'Post #10', "date": new Date('2020-12-01T08:53:35'), "author": authors[2], "hashtags": ['hash-9-1', 'hash-9-2'], "likes": [authors[2], authors[4], authors[5]]},
    {"id": 11, "text": 'Post #11', "date": new Date('2019-11-11T09:40:36'), "author": authors[0], "hashtags": [], "likes": []},
    {"id": 12, "text": 'Post #12', "date": new Date('2015-05-18T15:10:20'), "author": authors[1], "hashtags": ['hash-12-1'], "likes": [authors[3], authors[4], authors[7], authors[8], authors[9]]},
    {"id": 13, "text": 'Post #13', "date": new Date('2020-08-24T14:01:51'), "author": authors[2], "hashtags": [], "likes": [authors[2]]},
    {"id": 14, "text": 'Post #14', "date": new Date('2019-10-28T23:05:40'), "author": authors[3], "hashtags": ['hash-14-1', 'hash-14-2', 'hash-14-3'], "likes": [authors[7], authors[9]]},
    {"id": 15, "text": 'Post #15', "date": new Date('2020-11-01T20:15:14'), "author": authors[4], "hashtags": ['hash-15-1', 'hash-15-2'], "likes": [authors[0], authors[2], authors[3]]}, 
    {"id": 16, "text": 'Post #16', "date": new Date('2019-01-01T04:43:42'), "author": authors[5], "hashtags": ['hash-15-1'], "likes": [authors[4], authors[8], authors[9]]},
    {"id": 17, "text": 'Post #17', "date": new Date('2019-02-17T06:18:54'), "author": authors[2], "hashtags": ['hash-17-1'], "likes": [authors[5]]},
    {"id": 18, "text": 'Post #18', "date": new Date('2020-02-27T16:00:14'), "author": authors[7], "hashtags": ['hash-18-1', 'hash-18-2', 'hash-18-3'], "likes": [authors[6], authors[8]]},
    {"id": 19, "text": 'Post #19', "date": new Date('2018-06-02T18:59:32'), "author": authors[8], "hashtags": ['hash-19-1', 'hash-19-2', 'hash-19-3', 'hash-19-4'], "likes": [authors[3]]},
    {"id": 20, "text": 'Post #20', "date": new Date('2018-11-14T22:05:23'), "author": authors[9], "hashtags": [], "likes": [authors[4], authors[7], authors[8], authors[9]]}
]
