define([
    'jquery',
    'backbone',
    './base'],
    function ($, Backbone, BaseModel) {
        "use strict";
        var StatsModel = BaseModel.extend({
            url: function () {
                return this.baseUrl + '/stats';
            }
        });
        return StatsModel;
    });