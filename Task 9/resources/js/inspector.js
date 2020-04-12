class Inspector {
    _manager;
    _user;

    constructor(manager, user = new Author()) {
        this._manager = manager;
        this._user = user;
        this.drawUser();
        this.drawPosts(this._manager.getPage());
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
                hashButtons.appendChild(remove);

                var edit = document.createElement("button");
                edit.className = "post-edit";
                edit.innerHTML = "✏";
                hashButtons.appendChild(edit);
            }

            var like = document.createElement("button");
            like.className = "post-like";
            like.innerHTML = post.likes.length + " ❤";
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
        this.drawPosts(this._manager.getPage());
    }

    removePost(id) {
        if (this._manager.getPost(id).author.id == this._user.id) {
            this._manager.removePost(id);
            this.drawPosts(this._manager.getPage());
            return true;
        } else {
            return false;
        }
    }

    editPost(id, edit) {
        if (this._manager.getPost(id).author.id == this._user.id) {
            this._manager.editPost(id, edit);
            this.drawPosts(this._manager.getPage());
            return true;
        } else {
            return false;
        }
    }

    addPost(post) {
        this._manager.addPost(post);
        this.drawPosts(this._manager.getPage());
    }

    clear() {
        var postsDiv = document.getElementById("POSTS");

        while (postsDiv.firstChild) {
            postsDiv.removeChild(postsDiv.firstChild);
        }

        manager.clear();
    }
}



// Эти две строки необходимы для инициализации всяких штук.
// Кроме того, inspector поддерживает текущего залогиненого пользователя, который изначально установлен в [Logged off].
var manager = new PostManager(posts);
var inspector = new Inspector(manager, new Author());

// Имитируем логин юзера. После этого один или несколько постов, которые написаны нашим залогиненым автором, должны стать доступны для редактирования и удаления.
inspector.changeUser(authors[2]);

// Чистим все посты, чтобы было нягляднее показать остальные функции.
inspector.clear();


// Добавим три поста. Они будут сразу же отсортированы по времени.
inspector.addPost(new Post(34, "Первый добавленный пост.", new Date("2019-01-25T20:41:36"), authors[6], ["add-1-hashtag-1"], []));
inspector.addPost(new Post(35, "Второй добавленный пост.", new Date("2018-04-20T10:50:25"), authors[2], ["add-2-hashtag-1", "add-2-hashtag-2", "add-2-hashtag-3"], [authors[5], authors[2]]));
inspector.addPost(new Post(36, "Третий добавленный пост.", new Date("2017-10-17T04:50:51"), authors[2], ["add-3-hashtag-1", "add-3-hashtag-2"], [authors[1], authors[4]]));


// Теперь отредактируем "Второй добавленный пост" (пост с ID 35).
inspector.editPost(35, {"text": "Мы изменили второй пост и теперь он выглядит иначе.", "hashtags": ["EDIT-HASHTAG-1", "EDIT-HASHTAG-2"]});

// Теперь удалим "Третий добавленный пост" (пост с ID 36).
inspector.removePost(36);

// Ну тут демонстрация того, что мы не можем удалить пост, не принадлежащий нам, хотя не знаю, зачем это. 
inspector.removePost(34);

// А теперь логофнемся.
inspector.changeUser(new Author());