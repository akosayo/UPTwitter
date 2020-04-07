"use strict";

class PostManager {

    constructor(posts = []) {
        this.managedPosts = posts;
    }

    validate(post = undefined) {
        var isValid = true;

        if (!(post instanceof Post)) {
            isValid = false;
        } else if (post.id < 0) {
            isValid = false;
        } else if (post.text.length > 200) {
            isValid = false;
        } else if (post.author.id < 0) {
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