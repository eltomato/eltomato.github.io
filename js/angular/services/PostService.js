
angular.module('croccodilli.services')

.service('postService', ['NO_POST_TO_FETCH', 'POST_ENDPOINT', '$http', 'deviceDetector', function(NO_POST_TO_FETCH, POST_ENDPOINT, $http, deviceDetector) {

	var timesAskedForOlder = 0;

	var hasImages = function(post) {
		if(post) {
			if(post.images) {
				return post.images.length > 0;
			}
		}
		return false;
	};

	var me =  {
		getLastPosts: function() {
			if(deviceDetector.browser == 'safari') {
				return $http.get('https://crossorigin.me/' + POST_ENDPOINT, {
					params: {
						toFetch: NO_POST_TO_FETCH
					}
				});
			} else {
				return $http.get(POST_ENDPOINT, {
					params: {
						toFetch: NO_POST_TO_FETCH
					}
				});
			}
		},
		getOlderPosts: function() {
			timesAskedForOlder++;
			if(deviceDetector.browser == 'safari') {
				return $http.get('https://crossorigin.me/' + POST_ENDPOINT, {
					params: {
						toSkip: timesAskedForOlder * NO_POST_TO_FETCH,
						toFetch: NO_POST_TO_FETCH
					}
				});
			} else {
				return $http.get(POST_ENDPOINT, {
					params: {
						toSkip: timesAskedForOlder * NO_POST_TO_FETCH,
						toFetch: NO_POST_TO_FETCH
					}
				});
			}
		},
		getPost: function(postId) {
			if(deviceDetector.browser == 'safari') {
				return $http.get('https://crossorigin.me/' + POST_ENDPOINT, {
					params: {
						postId: postId
					}
				});
			} else {
				return $http.get(POST_ENDPOINT, {
					params: {
						postId: postId
					}
				});
			}
		},
		getPostType: function(post) {
			var type = '';
				if(post) {
				if(post.title) {
					type += 'title';
				}
				if(post.content) {
					if(type) {
						type += '+';
					}
					type += 'content';
				}
				if(hasImages(post)) {
					if(type) {
						type += '+';
					}
					type += 'images';
				}
				if(post.video) {
					if(type) {
						type += '+';
					}
					type += 'video';
				}
			}
			return type;
		},
		isWide: function(post) {
			return (post.title
				&& post.content
				&& (hasImages(post) || (post.video)))
				|| post.video;
		}
	};

	return me;
}]);