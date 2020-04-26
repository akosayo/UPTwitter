"use strict";

class PostManager {

    _managedPosts;

    _restore() {
        if (localStorage.getItem("posts") == null) {
            console.log("Can't find posts in localStorage. Creating new posts.");
            this._managedPosts = posts;
            this._save();
        } else {
            console.log("Found posts in local storage. Restoring posts.");
            this._managedPosts = JSON.parse(localStorage.getItem("posts"));
            this._managedPosts.forEach((post) => {
                post.date = new Date(post.date);
            })
        }
    }

    _save() {
        localStorage.clear();
        localStorage.setItem("posts", JSON.stringify(this._managedPosts));
        console.log("Saving posts in local storage.");
    }

    constructor() {
        this._managedPosts = [];
        this._restore();
        console.log("Post manager initialized.");
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

        this._save();
        return invalidItems;
    }

    getPostIndex(id) {
        return this._managedPosts.findIndex(post => { return post.id == id; });
    }

    getPost(id) {
        return this._managedPosts.find(post => { return post.id == id; });
    }

    getPage(skip = 0, top = 10, filter) {
        this._managedPosts.sort((a, b) => b["date"] - a["date"]);

        return this._managedPosts.filter((post, index) => {

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
        }).filter((post, index) => {
            if (index < skip || index >= skip + top) {
                return false;
            }

            return true;
        });
    }

    getPostCount() {
        return this._managedPosts.length;
    }

    removePost(id) {
        this._managedPosts.splice(this.getPostIndex(id), 1);
        this._save();
    }

    addPost(post) {
        if (PostManager._validate(post)) {
            this._managedPosts.push(post);
            this._save();
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
            this._save();
            return true;
        } else {
            return false;
        }
    }

    likePost(id, author) {

        if (author.id == 0) {
            return false;
        }

        var post = this.getPost(id);
        if (post.likes.includes(author)) {
            post.likes.splice(post.likes.findIndex(like => like.id == author.id), 1);
        } else {
            post.likes.push(author);
        }

        this._save();
        return true;
    }

    clear() {
        this._managedPosts.splice(0, this._managedPosts.length);
        this._save();
    }
}