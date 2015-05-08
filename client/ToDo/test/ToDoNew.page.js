'use strict';

var helper = require('../../helpers/test.helper.js');

module.exports = function () {
    var get = function() {
        browser.get(helper.rootUrl + '/todo/new');
    };

    var content = element(by.css('#content'));
    var title = content.$('.title');
    var form = element(by.css('#newTodoForm'));
    var titleInput = element(by.model('newTodo.title'));
    var descriptionTextarea = element(by.model('newTodo.description'));
    var saveButton = element(by.css('#save-button'));

    var addContentToTitleInput = function (content) {
        return titleInput.sendKeys(content);
    };

    var addContentToTextarea = function (content) {
        return descriptionTextarea.sendKeys(content);
    };

    var clickSaveButton = function () {
        return saveButton.click();
    };

    return {
        get: get,
        content: content,
        title: title,
        form: form,
        titleInput: titleInput,
        descriptionTextarea: descriptionTextarea,
        saveButton: saveButton,
        addContentToTitleInput: addContentToTitleInput,
        addContentToTextarea: addContentToTextarea,
        clickSaveButton: clickSaveButton
    };
};
