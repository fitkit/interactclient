define([
    'jquery',
    'backbone',
    'handlebars',
    'text!../../templates/results.hbs',
    'text!../../templates/showAnswers.hbs'],
    function ($, Backbone, Handlebars, resultsTemplate, showAnswersTemplate) {
        "use strict";
        var ResultsView = Backbone.View.extend({
            tagName: 'div',
            className: 'start-container',
            parentDiv: '#quiz-content',
            initialize: function (options) {
                this.result = options.result;
                this.quiz = options.quiz;
            },
            render: function () {
                var template = Handlebars.compile(resultsTemplate);
                $(this.el).html(template(this.result));
                $(this.parentDiv).html(this.el).show();
                if(this.quiz.get('settings').showAnswers){
                    this.showAnswers();
                }
            },
            events: {
                "click .fb": "shareToFacebook",
                "click .twitter": "shareToTwitter"
            },
            shareToFacebook: function (event) {
                var options = this.getPopupOptions(),
                    url = this.getFacebookURL();
                event.preventDefault();
                window.open(url,'sharer', options);
            },
            shareToTwitter: function (event) {
                var options = this.getPopupOptions(),
                    url = this.getTwitterURL();
                event.preventDefault();
                window.open(url,'twitterwindow', options);
            },
            getPopupOptions: function () {
                var sTop = window.screen.height/2-(218),
                    sLeft = window.screen.width/2-(313),
                    options = 'toolbar=0,status=0,width=580,height=400,top='+sTop+',left='+sLeft;
                return options;
            },
            getFacebookURL: function () {
                var params = $.param({
                        display: 'popup',
                        app_id: '746159965404389',
                        link: this.quiz.get('sharing').url,
                        picture: this.result.img,
                        name: 'I got ' + this.result.title + ' - ' + this.quiz.get('title'),
                        description: this.result.description.replace(/(<([^>]+)>)/ig,""),
                        redirect_uri: 'https://www.tryinteract.com/share.php?i=fb&id='+this.quiz.get('id')
                    }),
                    url = 'https://www.facebook.com/dialog/feed?' + params;
                return url;
            },
            getTwitterURL: function () {
                var params = {
                        url: this.quiz.get('sharing').url,
                        text: 'I got ' + this.result.title + ' - ' + this.quiz.get('title'),
                        redirect_uri: 'https://www.tryinteract.com/share.php?i=twitter&id='+this.quiz.get('id')
                    },
                    url;
                if (this.quiz.get('sharing').twitterVia) {
                    params.via = 'tryinteract'
                }
                params = $.param(params);
                url = 'https://twitter.com/intent/tweet?' + params;
                return url;
            },
            showAnswers: function () {
                var showAnswers = this.quiz.get('showAnswers');
                var showTemplate = Handlebars.compile(showAnswersTemplate);
                $('.centered-container').append(showTemplate({responses:showAnswers}));
            }
        });
        return ResultsView;
    });