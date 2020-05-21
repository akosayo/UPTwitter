"use strict";

class Inspector {
    _manager;
    _user;

    _currentSkip;
    _currentTop;
    _currentFilter;

    constructor(manager, user = new Author()) {
        this._manager = manager;
        this._currentFilter = {};
        this._currentSkip = 0;
        this._currentTop = 10;
        this._user = user;
        this.drawUser();
        this.drawPosts(this._manager.getPage(this._currentSkip, this._currentTop, this._currentFilter));
    }

    drawPosts(posts = []) {

        var postsDiv = document.getElementById("POSTS");

        while (postsDiv.firstChild) {
            postsDiv.removeChild(postsDiv.firstChild);
        }

        posts.forEach(post => {
            var newPost = document.createElement("div");
            newPost.className = "post";
            postsDiv.appendChild(newPost);
            
            var postPhotoInfo = document.createElement("div");
            postPhotoInfo.className = "post-photoinfo";
            newPost.appendChild(postPhotoInfo);

            var photo = document.createElement("img");
            photo.className = "post-photo";
            photo.src = post.author.photoLink;
            postPhotoInfo.appendChild(photo);

            var info = document.createElement("div");
            info.className = "post-info";
            postPhotoInfo.appendChild(info);

            var infoTime = document.createElement("div");
            infoTime.className = "post-info-time";
            infoTime.innerHTML = post.date;
            info.appendChild(infoTime);

            var infoName = document.createElement("div");
            infoName.className = "post-info-name";
            infoName.innerHTML = post.author.name;
            info.appendChild(infoName);

            var text = document.createElement("div");
            text.className = "post-text";
            text.innerHTML = post.text;
            newPost.appendChild(text);

            var hashButtons = document.createElement("div");
            hashButtons.className = "post-hashbuttons";
            newPost.appendChild(hashButtons);

            var postHash = document.createElement("div");
            postHash.className = "post-hash";
            hashButtons.appendChild(postHash);

            var hashes = document.createElement("div");
            var resultHash = "";
            post.hashtags.forEach(hashtag => {
                resultHash += ('#' + hashtag + ' ');
            });
            hashes.innerHTML = resultHash;
            postHash.appendChild(hashes);

            var dropdown = document.createElement("div");
            dropdown.className = "post-hash-dropdown";
            dropdown.innerHTML = resultHash;
            postHash.appendChild(dropdown);

            if (post.author.id == this._user.id) {
                var remove = document.createElement("button");
                remove.className = "post-delete";
                remove.innerHTML = "🗑";
                remove.id = post.id;

                remove.onclick = function() {
                    manipulator.removePost(this.id);
                }

                hashButtons.appendChild(remove);

                var edit = document.createElement("button");
                edit.className = "post-edit";
                edit.innerHTML = "✏";
                edit.id = post.id;

                edit.onclick = function() {
                    document.getElementById("EDIT-POST-WRAPPER").style.display = "block";
                    document.getElementsByName("edit-post-button")[0].id = this.id;
                    document.getElementById("EDIT-POST-TEXT").value = post.text;
                    document.getElementById("EDIT-POST-HASHTAGS").value = resultHash;
                }

                hashButtons.appendChild(edit);
            }

            var like = document.createElement("button");
            like.className = "post-like";
            like.innerHTML = post.likes.length + " ❤";
            like.id = post.id;

            like.onclick = function() {
                manipulator.likePost(this.id);
            }

            hashButtons.appendChild(like);
        });
    }

    drawUser() {
        if (this._user.id == 0) {
            document.getElementById("NEW-POST-WRAPPER").style.display = "none";
            document.getElementById("SIGN-TEXT").style.display = "none";
            document.getElementById("SIGN-UPPER-BUTTON").style.display = "block";
            document.getElementById("PROFILE-WRAPPER").style.display = "none";
        } else {
            document.getElementById("PROFILE-WRAPPER").style.display = "flex";
            document.getElementById("NEW-POST-WRAPPER").style.display = "block";
            document.getElementById("SIGN-TEXT").style.display = "flex";
            document.getElementById("SIGN-UPPER-BUTTON").style.display = "none";

            document.getElementById("SIGN-TEXT-NAME").innerHTML = this._user.name;

            document.getElementById("PROFILE-PICTURE").setAttribute("src", this._user.photoLink);
            document.getElementById("PROFILE-NAME").innerHTML = this._user.name;
        }
    }

    changeUser(newUser) {
        this._user = newUser;
        this.drawUser();
        this.drawPosts(this._manager.getPage(this._currentSkip, this._currentTop, this._currentFilter));
    }

    removePost(id) {
        if (this._manager.getPost(id).author.id == this._user.id) {
            this._manager.removePost(id);
            this.drawPosts(this._manager.getPage(this._currentSkip, this._currentTop, this._currentFilter));
            return true;
        } else {
            return false;
        }
    }

    editPost(id, edit) {
        if (this._manager.getPost(id).author.id == this._user.id) {
            this._manager.editPost(id, edit);
            this.drawPosts(this._manager.getPage(this._currentSkip, this._currentTop, this._currentFilter));
            return true;
        } else {
            return false;
        }
    }

    addPost(postTemplate) {
        var newPost = new Post(Date.now(), postTemplate["text"], new Date(), this._user, postTemplate["hashtags"], []);
        this._manager.addPost(newPost);
        this.drawPosts(this._manager.getPage(this._currentSkip, this._currentTop, this._currentFilter));
    }

    likePost(id) {
        this._manager.likePost(id, this._user);
        this.drawPosts(this._manager.getPage(this._currentSkip, this._currentTop, this._currentFilter));
    }

    updateFilter(newFilter) {
        this._currentSkip = 0;
        this._currentTop = 10;
        this._currentFilter = newFilter;
        this.drawPosts(this._manager.getPage(this._currentSkip, this._currentTop, this._currentFilter));
    }

    loadMore() {
        this._currentTop += 10;
        this.drawPosts(this._manager.getPage(this._currentSkip, this._currentTop, this._currentFilter));
    }

    clear() {
        var postsDiv = document.getElementById("POSTS");

        while (postsDiv.firstChild) {
            postsDiv.removeChild(postsDiv.firstChild);
        }

        manager.clear();
    }
}

