"use strict";

class Manipulator {

    _inspector;

    constructor(inspector) {
        this._inspector = inspector;
    }

    login() {
        var account = document.getElementById("LOGIN-INPUT").value;
        var password = document.getElementById("LOGIN-PASSWORD").value;
        
        /*
            В текущий момент оно игнорирует пароли и ищет только по имени. 
            Ну а как еще, я же не собираюсь хранить пароли в JS, 
            и мой класс Author с такой задумкой и был спроектирован.
        */
        
        /*
            Тут должна быть по идее отправка всего этого добра на сервер, но пока затычка
            для локальной демонстрации.
        */

        let loginAuthor = authors.find(author => author.name == account);
        if (loginAuthor != undefined) {
            this._inspector.changeUser(loginAuthor);
            return true;
        } else {
            return false;
        }
    }

    logout() {
        this._inspector.changeUser(new Author());
    }

    removePost(id) {
        this._inspector.removePost(id);
    }

    likePost(id) {
        this._inspector.likePost(id);
    }

    newPost() {
        var hashtags = document.getElementById("NEW-POST-HASHTAGS").value.split(' ');

        var clearHashtags = hashtags.map(function(hashtag) {
            while (hashtag.length > 0 && hashtag[0] == '#') {
                hashtag = hashtag.substring(1, hashtag.length);
            }

            return hashtag;
        }).filter((hashtag) => {
            if (hashtag == "") {
                return false;
            } else {
                return true;
            }
        });

        this._inspector.addPost({"text": document.getElementById("NEW-POST-TEXT").value, "hashtags": clearHashtags});
        
        document.getElementById("NEW-POST-TEXT").value = "";
        document.getElementById("NEW-POST-HASHTAGS").value = "";
    }

    updateFilter() {
        var searchName = document.getElementById("SEARCH-NAME").value;
        var searchHashtags = document.getElementById("SEARCH-HASHTAGS").value;
        
        if (searchHashtags != "") {
            searchHashtags = searchHashtags.split(' ').map(function(hashtag) {

                while (hashtag.length > 0 && hashtag[0] == '#') {
                    hashtag = hashtag.substring(1, hashtag.length);
                }

                return hashtag;
            }).filter((hashtag) => {
                if (hashtag == "") {
                    return false;
                } else {
                    return true;
                }
            });
        }

        var newFilter = {};

        if (searchName.length > 0) {
            newFilter["author"] = searchName;
        }

        if (searchHashtags.length > 0) {
            newFilter["hashtags"] = searchHashtags;
        }

        this._inspector.updateFilter(newFilter);
    }

    loadMore() {
        this._inspector.loadMore();
    }

    editPost() {
        var editText = document.getElementById("EDIT-POST-TEXT").value;
        var editHashtags = document.getElementById("EDIT-POST-HASHTAGS").value;
        var postId = document.getElementsByName("edit-post-button")[0].id;

        editHashtags = editHashtags.split(' ').map(function(hashtag) {

            while (hashtag.length > 0 && hashtag[0] == '#') {
                hashtag = hashtag.substring(1, hashtag.length);
            }

            return hashtag;
        }).filter((hashtag) => {
            if (hashtag == "") {
                return false;
            } else {
                return true;
            }
        });

        var editStructure = {};
        editStructure['text'] = editText;
        editStructure['hashtags'] = editHashtags;

        this._inspector.editPost(postId, editStructure);
        document.getElementById("EDIT-POST-WRAPPER").style.display = "none";
    }
};
