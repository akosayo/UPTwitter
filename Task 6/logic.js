"use strict";

class PostManager {

    constructor(posts = []) {
        this.managedPosts = posts;
    }

    validate(post = undefined) {
        var isValid = true;

        if (!(post instanceof Post)) {
            isValid = false;
        } else if (!post.validate()) {
            isValid = false;
        }

        return isValid;
    }

    getPostIndex(id) {
        return this.managedPosts.findIndex(post => { return post.id == id; });
    }

    getPost(id) {
        return this.managedPosts.find(post => { return post.id == id; });
    }

    getPage(skip = 0, top = 10, filter) {
        this.managedPosts.sort((a, b) => a.date - b.date);

        return this.managedPosts.filter((post, index) => {
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
        return this.managedPosts.length;
    }

    removePost(id) {
        this.managedPosts.splice(this.getPostIndex(id), 1);
    }

    addPost(post) {
        if (this.validate(post)) {
            this.managedPosts.push(post);
            return true;
        } else {
            return false;
        }
    }

    editPost(id, edit) {
        var oldPostIndex = this.getPostIndex(id);
        var oldPost = this.managedPosts[oldPostIndex];
        var editedPost = new Post(oldPost.id, oldPost.text, oldPost.date, oldPost.author, oldPost.hashtags, oldPost.likes);
        
        if (edit instanceof Object) {
            if ('text' in edit) {
                editedPost.text = edit['text'];
            }

            if ('hashtags' in edit) {
                editedPost.hashtags = edit['hashtags'];
            }
        }

        if (this.validate(editedPost)) {
            this.managedPosts[oldPostIndex] = editedPost;
            return true;
        } else {
            return false;
        }
    }
}

;(function() {

    console.log("Full Authors Array:\n", JSON.parse(JSON.stringify(authors)));
    console.log("Full Posts Array:\n", JSON.parse(JSON.stringify(posts)));

    var manager = new PostManager(posts);

    console.log("Getting post with ID 13:\n", JSON.parse(JSON.stringify(manager.getPost(13))));
    
    
    manager.addPost(new Post(21, 'New added post with ID 21.', new Date('2020-05-25T11:28:41'), authors[0], ['hashtag-add-1', 'hashtag-add-2'], [authors[2], authors[9]]));
    console.log("Full Post Array after adding new post with ID 21:\n", JSON.parse(JSON.stringify(posts)));

    
    manager.editPost(15, {'text': 'This text was edited!', 'hashtags': ['hashtag-modified-1']});
    console.log("Full Post Array after editing post with ID 15:\n", JSON.parse(JSON.stringify(posts)));
    
    manager.removePost(5);
    console.log("Full Post Array after removing post with ID 5:\n", JSON.parse(JSON.stringify(posts)));

    var page = manager.getPage(2, 15);
    console.log("Getting 15 Posts from 2-nd in date increasing order without any filter:\n", JSON.parse(JSON.stringify(page)));

    page = manager.getPage(0, 20, {'author': 'Author #3', 'startDate': new Date('2019-01-01T00:00:00'), 'endDate': new Date('2020-12-31T23:59:59')});
    console.log("Getting all Posts, but from 2019-2020 and from Author #3:\n", JSON.parse(JSON.stringify(page)));   

}());