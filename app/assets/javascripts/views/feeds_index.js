SimpleFeed.Views.FeedsIndex = Backbone.View.extend({

  template: JST['feeds/index'],

  initialize: function(user) {
    this.user = user.user;
    this.listenTo(this.collection, "sync", this.render);
  },

  events: {
    "click .glyphicon-trash" : "deleteFeed",
    "click .glyphicon-refresh" : "refreshFeed",
    "click .input-group-btn" : "addFeed"
  },

  render: function() {
    var renderedContent = this.template({
      user: this.user,
      feeds: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  },

  addFeed: function(e) {
    e.preventDefault();
    var url = $('input.form-control').val();
    var feed = new SimpleFeed.Models.Feed(url);
    debugger
    //need to possibly modify feed controller
  },

  refreshFeed: function(e) {
    var feedId = $(e.currentTarget).data('id');
    $(e.currentTarget).toggleClass("spin");
    var that = this;
    this.collection.get(feedId).fetch({
      success: function(that) {
        $(e.currentTarget).toggleClass("spin");
      }
    });
  },

  deleteFeed: function(e) {
    var feedId = $(e.currentTarget).data('id');
    var feed = this.collection.get(feedId);
    this.collection.remove(feedId)
    feedId.destroy();
    this.render();
  }

});