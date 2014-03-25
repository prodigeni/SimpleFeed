SimpleFeed.Views.ShowFeed = Backbone.View.extend({
  template: JST['feeds/show'],

  initialize: function() {

  },

  events: {
    "click .feed-entry-bar" : "showOrHideEntry"
  },

  render: function() {
    var renderedContent = this.template({
      feed: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  showOrHideEntry: function(e) {
    //this is necessary to work for edge cases on wonky RSS feeds
    $(e.currentTarget.children[1]).toggleClass('feed-entry-hidden');
    var derf = $(e.currentTarget.children[0]).text()
    $(e.currentTarget.children[1]).html(derf)
  }
});