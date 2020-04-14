"use strict";

(function() {

    let managedPosts = [];

    function initialize(posts) {
        managedPosts = posts;
    }

    function validate(post = undefined) {
        return validatePost(post);
    }

    function getPostIndex(id) {
        return managedPosts.findIndex(post => { return post.id == id; });
    }

    function getPost(id) {
        return managedPosts.find(post => { return post.id == id; });
    }

    function getPage(skip = 0, top = 10, filter) {
        managedPosts.sort((a, b) => a.date - b.date);

        return managedPosts.filter((post, index) => {
            if (index < skip || index >= skip + top) {
                return false;
            }

            if (filter instanceof Object) {
                if ('author' in filter) {
                    if (post.author.name != filter['author']) {
                        return false;
                    }
                }

                if ('startDate' in filter) {
                    if (post.date < filter['startDate']) {
                        return false;
                    }
                }

                if ('endDate' in filter) {
                    if (post.date > filter['endDate']) {
                        return false;
                    }
                }

                if ('hashtags' in filter) {
                    if (!filter['hashtags'].every((hashtag) => (post.hashtags.indexOf(hashtag) > -1))) {
                        return false;
                    }
                }
            }   

            return true;
        });
    }

    function getPostCount() {
        return managedPosts.length;
    }

    function removePost(id) {
        managedPosts.splice(getPostIndex(id), 1);
    }

    function addPost(post) {
        if (validate(post)) {
            managedPosts.push(post);
            return true;
        } else {
            return false;
        }
    }

    function editPost(id, edit) {
        var oldPostIndex = getPostIndex(id);
        var oldPost = managedPosts[oldPostIndex];
        var editedPost = {"id": oldPost.id, "text": oldPost.text, "date": oldPost.date, "author": oldPost.author, "hashtags": oldPost.hashtags, "likes": oldPost.likes};
        
        if (edit instanceof Object) {
            if ('text' in edit) {
                editedPost.text = edit['text'];
            }

            if ('hashtags' in edit) {
                editedPost.hashtags = edit['hashtags'];
            }
        }

        if (validate(editedPost)) {
            managedPosts[oldPostIndex] = editedPost;
            return true;
        } else {
            return false;
        }
    }

    console.log("Full Authors Array:\n", JSON.parse(JSON.stringify(authors)));
    console.log("Full Posts Array:\n", JSON.parse(JSON.stringify(posts)));

    initialize(posts);

    console.log("Getting post with ID 13:\n", JSON.parse(JSON.stringify(getPost(13))));
    
    
    addPost({"id": 21, "text": 'New added post with ID 21.', "date": new Date('2020-05-25T11:28:41'), "author": authors[0], "hashtags": ['hashtag-add-1', 'hashtag-add-2'], "likes": [authors[2], authors[9]]});
    console.log("Full Post Array after adding new post with ID 21:\n", JSON.parse(JSON.stringify(posts)));

    
    editPost(15, {'text': 'This text was edited!', 'hashtags': ['hashtag-modified-1']});
    console.log("Full Post Array after editing post with ID 15:\n", JSON.parse(JSON.stringify(posts)));
    
    removePost(5);
    console.log("Full Post Array after removing post with ID 5:\n", JSON.parse(JSON.stringify(posts)));

    var page = getPage(2, 15);
    console.log("Getting 15 Posts from 2-nd in date increasing order without any filter:\n", JSON.parse(JSON.stringify(page)));

    page = getPage(0, 20, {'author': 'Author #3', 'startDate': new Date('2019-01-01T00:00:00'), 'endDate': new Date('2020-12-31T23:59:59')});
    console.log("Getting all Posts, but from 2019-2020 and from Author #3:\n", JSON.parse(JSON.stringify(page)));   

}());