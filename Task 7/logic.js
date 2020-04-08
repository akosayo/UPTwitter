"use strict";

class PostManager {

    _managedPosts;

    constructor(posts = []) {
        this._managedPosts = [];
        this.addAll(posts);
    }

    static _validate(post) {
        var isValid = true;

        if (!(post instanceof Post)) {
            isValid = false;
        } else if (!Post._validate(post)) {
            isValid = false;
        }

        return isValid;
    }

    addAll(postArray) {
        var invalidItems = [];

        postArray.forEach(element => {
            if (PostManager._validate(element)) {
                this._managedPosts.push(element);
            } else {
                invalidItems.push(element);
            }
        });

        return invalidItems;
    }

    getPostIndex(id) {
        return this._managedPosts.findIndex(post => { return post.id == id; });
    }

    getPost(id) {
        return this._managedPosts.find(post => { return post.id == id; });
    }

    getPage(skip = 0, top = 10, filter) {
        this._managedPosts.sort((a, b) => a.date - b.date);

        return this._managedPosts.filter((post, index) => {
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

    getPostCount() {
        return this._managedPosts.length;
    }

    removePost(id) {
        this._managedPosts.splice(this.getPostIndex(id), 1);
    }

    addPost(post) {
        if (PostManager._validate(post)) {
            this._managedPosts.push(post);
            return true;
        } else {
            return false;
        }
    }

    editPost(id, edit) {
        var oldPostIndex = this.getPostIndex(id);
        var oldPost = this._managedPosts[oldPostIndex];
        var editedPost = new Post(oldPost.id, oldPost.text, oldPost.date, oldPost.author, oldPost.hashtags, oldPost.likes);
        
        if (edit instanceof Object) {
            if ('text' in edit) {
                editedPost.text = edit['text'];
            }

            if ('hashtags' in edit) {
                editedPost.hashtags = edit['hashtags'];
            }
        }

        if (PostManager._validate(editedPost)) {
            this._managedPosts[oldPostIndex] = editedPost;
            return true;
        } else {
            return false;
        }
    }

    clear() {
        this._managedPosts.splice(0, this._managedPosts.length);
    }
}

;(function() {

    console.log("Full Authors Array:\n", JSON.parse(JSON.stringify(authors)));
    console.log("Full Posts Array:\n", JSON.parse(JSON.stringify(posts)));

    var manager = new PostManager(posts);

    console.log("Getting post with ID 13:\n", JSON.parse(JSON.stringify(manager.getPost(13))));
        
    manager.addPost(new Post(21, 'New added post with ID 21.', new Date('2020-05-25T11:28:41'), authors[0], ['hashtag-add-1', 'hashtag-add-2'], [authors[2], authors[9]]));
    console.log("Full Post Array after adding new post with ID 21:\n", JSON.parse(JSON.stringify(manager.getPage(0, manager.getPostCount()))));
    
    manager.editPost(15, {'text': 'This text was edited!', 'hashtags': ['hashtag-modified-1']});
    console.log("Full Post Array after editing post with ID 15:\n", JSON.parse(JSON.stringify(manager.getPage(0, manager.getPostCount()))));
    
    manager.removePost(5);
    console.log("Full Post Array after removing post with ID 5:\n", JSON.parse(JSON.stringify(manager.getPage(0, manager.getPostCount()))));

    var page = manager.getPage(2, 15);
    console.log("Getting 15 Posts from 2-nd in date increasing order without any filter:\n", JSON.parse(JSON.stringify(page)));

    page = manager.getPage(0, 20, {'author': 'Author #3', 'startDate': new Date('2019-01-01T00:00:00'), 'endDate': new Date('2020-12-31T23:59:59')});
    console.log("Getting all Posts, but from 2019-2020 and from Author #3:\n", JSON.parse(JSON.stringify(page)));   

    manager.clear();
    console.log("All Posts Array after clearing:\n", JSON.parse(JSON.stringify(manager.getPage(0, manager.getPostCount()))));

    manager.addAll([new Post(-2, 'Post with negative ID'), new Post(22, 'Valid post!', new Date('2020-02-15T15:14:41'), authors[4], ['hashtag-valid-1', 'hashtag-valid-2'], [authors[4], authors[7], authors[8]])]);
    console.log("All Posts Array after trying to add one invalid and one valid posts:\n", JSON.parse(JSON.stringify(manager.getPage(0, manager.getPostCount()))));
}());