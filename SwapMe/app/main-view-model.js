var Observable = require("data/observable").Observable;
var tnsOAuthModule = require("nativescript-oauth");
var Sqlite = require("nativescript-sqlite");

function getMessage(counter) {
    if (counter <= 0) {
        return "Hoorraaay! You unlocked the NativeScript clicker achievement!";
    } else {
        return counter + " taps left";
    }
}

function createViewModel(database) {
    var viewModel = new Observable();
    viewModel.counter = 42;
    viewModel.message = getMessage(viewModel.counter);

    viewModel.tapLogin = function() {
        // this.counter--;
        // this.set("message", getMessage(this.counter));
        tnsOAuthModule.ensureValidToken()
            .then(function (token) {
            console.log('token: ' + token);
        })
            .catch(function (er) {
            //do something with the error
        });
    };


    viewModel.tapLogout = function () {
          tnsOAuthModule.logout()
            .then(function () { return console.log('logged out'); })
            .catch(function (er) {
            console.error('error logging out');
            console.dir(er);
        });
    };

    viewModel.firstname = "";
    viewModel.lastname = "";

    viewModel.insert = function() {
        database.execSQL("INSERT INTO people (firstname, lastname) VALUES (?, ?)", [this.firstname, this.lastname]).then(id => {
            console.log("INSERT RESULT", id);
        }, error => {
            console.log("INSERT ERROR", error);
        });
    }

    viewModel.select = function() {
        database.all("SELECT * FROM people").then(rows => {
            for(var row in rows) {
                console.log("RESULT", rows[row]);
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

    return viewModel;
}

exports.createViewModel = createViewModel;