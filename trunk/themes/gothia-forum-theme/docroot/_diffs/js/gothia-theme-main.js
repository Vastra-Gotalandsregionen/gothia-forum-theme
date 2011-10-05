AUI().add('gothia-theme-main',function(A) {
	var Lang = A.Lang,
		isArray = Lang.isArray,
		isFunction = Lang.isFunction,
		isNull = Lang.isNull,
		isObject = Lang.isObject,
		isString = Lang.isString,
		isUndefined = Lang.isUndefined,
		getClassName = A.ClassNameManager.getClassName,
		concat = function() {
			return Array.prototype.slice.call(arguments).join(SPACE);
		},
		
		BANNER_BOX = 'bannerBox',
		HREF = 'href',
		NAME = 'gothia-theme-main',
		NS = 'gothia-theme-main',
		
		REGEXP_DATE = /[0-9]{4}\-{1}[0-9]{2}\-{1}[0-9]{2}/ // Matches date on the form YYYY-MM-DD
	;
	
	var TPL_REGION_CALENDAR_IFRAME = '<iframe class="region-calendar-iframe" title="" frameborder="0" src="{url}" width="1044" height="600"></iframe>'
	
	;
		

	var GothiaThemeMain = A.Component.create(
			{
				ATTRS: {
					bannerBox: {
						setter: A.one,
						value: '.banner-box'
					}
				},
				EXTENDS: A.Component,
				NAME: NAME,
				NS: NS,
				prototype: {
					bannerCarousel: null,
					initializer: function(config) {
						var instance = this;
						
					},
					
					renderUI: function() {
						var instance = this;
						
						instance._initBannerCarousel();
						instance._initFAQ();
						instance._cleanUpBlogsAggregator();
						instance._cleanUpBlogsPortlet();
						instance._cleanupSiteBreadcrumbs();
					},
	
					bindUI: function() {
						var instance = this;
						
						instance._bindRegionCalendarLinks();
					},
					
					_bindRegionCalendarLinks: function() {
						var instance = this;
						
						var links = A.all('ul.cal-list a.cal-link');
						
						links.on('click', instance._onRegionCalendarLinkClick, instance);
					},
					
					_cleanUpBlogsAggregator: function() {
						var instance = this;
						
						var wrapperNode = A.one('.portlet-blogs-aggregator');
						
						// Only continue if blogs aggregator portlet is on page
						if(wrapperNode) {
							var entryDates = wrapperNode.all('.entry-date');
							
							// Dates
							entryDates.each(function(node, index, list) {
								
								// Trim date
								var dateStr = node.html();
								var newDateArr = dateStr.match(REGEXP_DATE);
								if(newDateArr) {
									node.html(newDateArr[0]);
								}
								
								// Move date node to the start of the info block
								var entryInfo = node.ancestor('.entry-info');
								if(entryInfo) {
									entryInfo.prepend(node);
								}
							});
						}
					},
					
					_cleanUpBlogsPortlet: function() {
						var instance = this;
						
						var wrapperNode = A.one('.portlet-blogs');
						
						// Only continue if blogs portlet is on page
						if(wrapperNode) {
							var entryDates = wrapperNode.all('.entry-date');
							
							// Dates
							entryDates.each(function(node, index, list) {
								
								// Trim date
								var dateStr = node.html();
								var newDateArr = dateStr.match(REGEXP_DATE);
								if(newDateArr) {
									node.html(newDateArr[0]);
								}
							});
						}
					},
					
					_cleanupSiteBreadcrumbs: function() {
						var instance = this;
						
						var navigation = A.one('#navigation > ul');
						var siteBreadcrumbs = A.one('.site-breadcrumbs');

						if (navigation && siteBreadcrumbs) {
							
							var firstNavigationLink = navigation.one('li.first a span');
							var firstBreadcrumbLink = siteBreadcrumbs.one('li.first a');
							
							if(firstNavigationLink && firstBreadcrumbLink) {
								firstBreadcrumbLink.html(firstNavigationLink.html());
							}
						}
					},					
					
					_initBannerCarousel: function() {
						var instance = this;
						
						var bannerBox = instance.get(BANNER_BOX);
						
						//if(A.UA.ie) {return;}
						if(isNull(bannerBox)) {return;}
						
						instance.bannerCarousel = new A.Carousel({
							intervalTime: 5,
							contentBox: bannerBox,
							activeIndex: 'rand',
							height: 200,
							width: 659
						}).render();

						bannerBox.all('a.banner-box-link').removeClass('aui-helper-hidden');
						bannerBox.addClass('banner-box-js');
					},
					
					_initFAQ: function() {
						var instance = this;
						
						var faq = A.all('.faq');
						faq.addClass('faq-js');
						
						var entryQuestions = A.all('.faq dt');
						var entryAnswers = A.all('.faq dd');
						
						// Add raquo to each question
						entryQuestions.each(function(node, index, nodeList) {
							var html = node.html();
							var html = html + ' &raquo;';
							node.html(html);
						});
						
						// Hide all answers
						entryAnswers.hide();
						
						// Bind click callback to questions
						entryQuestions.on('click', instance._onFaqQuestionsClick, instance);
					},
					
					_onBeforeRegionCalendarDialogRender: function(e, params) {
						var instance = this;
						
						var dialog = params[0];

						var iframeURL = params[1];

						var contentIframe = A.substitute(TPL_REGION_CALENDAR_IFRAME, {
							url: iframeURL
						});

						dialog.set('bodyContent', contentIframe);
					},
					
					_onFaqQuestionsClick: function(e) {
						var currentTarget = e.currentTarget;
						var entryNode = A.one(currentTarget);
						var answerNode = entryNode.next();
						
						if(answerNode) {
							if(answerNode.hasClass('aui-helper-hidden')) {
								answerNode.show();	
							} else {
								answerNode.hide();
							}
						}
					},
					
					_onRegionCalendarLinkClick: function(e) {
						var instance = this;
						
						//var currentTarget = e.currentTarget;
						var linkNode = e.target;
						
						var winHeight = linkNode.get('winHeight');
						var winWidth = linkNode.get('winWidth');
						
						if(winHeight < 660 || winWidth < 1070) { return; }
						
						e.halt();
						
						var url = linkNode.getAttribute(HREF);
						
						var dialogOptions = {
							bodyContent: 'Regionkalendern',
							centered: true,
							constrain2view: true,
							destroyOnClose: true,
							draggable: true,
							group: 'default',
							height: 660,
							modal: true,
							stack: true,
							title: 'Regionkalendern',
							width: 1070
						};
						
						var currentTitle = linkNode.html();
						
						var dialog = new A.Dialog(
							A.merge(dialogOptions, {
								title: currentTitle
							})
						);

						// On before render listener
						dialog.before('render', instance._onBeforeRegionCalendarDialogRender, instance, [dialog, url]);
						
						dialog.render();
					}
					
				}
			}
	);

	A.GothiaThemeMain = GothiaThemeMain;
		
	},1, {
		requires: [
			'aui-base',
			'aui-carousel',
			'aui-dialog',
			'anim-node-plugin'
      ]
	}
);