AUI().add('responsive-navigation-button',function(A) {
    var Lang = A.Lang,
        isNull = Lang.isNull,
        
        NAME = 'responsive-navigation-button',
        NS = 'responsive-navigation-button',
        
        BANNER_NODE = 'bannerNode',
        NAVIGATION_LIST = 'navigationList',
        TOP_NAVIGATION_LIST = 'topNavigationList',
        TRIGGER = 'trigger',
        USE_MASK = 'useMask',
        Z_INDEX = 'zIndex',
        
        CSS_HIDDEN = 'aui-helper-hidden',
        CSS_SELECTED = 'selected',
        CSS_TRIGGER_ACTIVE = 'menu-active'
    ;

    var TPL_MENU = '<nav id="navigationButtonMenu"><ul class="navigation-button-menu-list"></ul></nav>',
    	TPL_MENU_ITEM = '<li class="{cssClass}"><a href="{url}">{label}</a></li>',
    	TPL_SUB_MENU = '<ul class="navigation-button-sub-menu-list"></ul>',
    	TPL_SUB_MENU_ITEM = '<li class="{cssClass}"><a href="{url}">{label}</a></li>'
	;
        
    var ResponsiveNavigationButton = A.Component.create(
            {
                ATTRS: {
                	
                	bannerNode: {
                		value: '#header',
                		setter: A.one
                	},
                	
                	navigationList: {
                		value: '#navigation > ul',
                		setter: A.one
                	},
                	
                	topNavigationList: {
                		value: '.top-nav-wrap ul',
                		setter: A.one
                	},
                	
                	trigger: {
                		value: '#navigationTrigger',
            			setter: A.one
                	},
                	
                	useMask: {
                		value: false
                	},
                	
                	zIndex: {
                		value: 1000
                	}
                	
                },
                EXTENDS: A.Component,
                NAME: NAME,
                NS: NS,
                
                mask: null,
                navigationButtonMenu: null,
                
                prototype: {
                    
                    initializer: function(config) {
                        var instance = this;
                        
                    },
                    
                    renderUI: function() {
                        var instance = this;
                        
                        instance._initNavigationMenu();
                        instance._initMask();
                    },
    
                    bindUI: function() {
                        var instance = this;
                        
                        var trigger = instance.get(TRIGGER);
                        if(!isNull(trigger)) {
                        	trigger.on('click', instance._onTriggerClick, instance);	
                        }
                        
                        // Activate menu button when bind is setup
                        trigger.addClass('navigation-trigger-ready');
                    },
                    
                    _initMask: function() {
                    	var instance = this;
                    	
                    	var mask = new A.OverlayMask({
                    		target: document,
                    		zIndex: instance.get(Z_INDEX)
                    	}).render();
                    	
                    	instance.mask = mask;
                    	
                    },
                    
                    _initNavigationMenu: function() {
                    	var instance = this;
                    	
                    	var navigationList = instance.get(NAVIGATION_LIST);
                    	
                    	if(isNull(instance.get(TRIGGER)) || isNull(navigationList)) { return; }
                    	
                    	var firstLevelLinks = navigationList.all('>li>a');
                    	
                    	var bannerNode = instance.get(BANNER_NODE);
                    	
                    	bannerNode.append(TPL_MENU);
                    	
                    	var navigationButtonMenu = bannerNode.one('#navigationButtonMenu');
                    	
                    	navigationButtonMenu.hide();
                    	
                    	var menuList = navigationButtonMenu.one('.navigation-button-menu-list');
                    	
                    	
                    	// First level in main navigation
                    	firstLevelLinks.each(function(item, index, list) {
                    		var linkUrl = item.getAttribute('href');
                    		var spanNode = item.one('>span');
                    		var linkText = spanNode.html();
                    		var cssClass = '';
                    		
                    		var listItem = item.ancestor('li');
                    		
                    		/*
                    		if(index+1 == list.size()) {
                    			cssClass = cssClass + ' last';
                    		}
                    		*/
                    		
                    		if(listItem.hasClass(CSS_SELECTED)) {
                    			cssClass = cssClass + ' ' + CSS_SELECTED;
                    		} 
                    		
    						var menuItemHtml = A.substitute(TPL_MENU_ITEM, {
    							cssClass: cssClass,
    							label: linkText,
    							url: linkUrl
    						});
                    		
    						menuList.append(menuItemHtml);
    						
                    	});
                    	
                    	// Top navigation
                    	var topNavigationList = instance.get(TOP_NAVIGATION_LIST);
                    	var topNavigationLinks = topNavigationList.all('>li>a');
                    	
                    	// Iterate top navigation links
                    	topNavigationLinks.each(function(item, index, list) {
                    		var linkUrl = item.getAttribute('href');
                    		var linkText = item.html();
                    		var cssClass = '';
                    		
                    		var listItem = item.ancestor('li');
                    		
                    		if(index+1 == list.size()) {
                    			cssClass = cssClass + ' last';
                    		}
                    		
                    		if(listItem.hasClass(CSS_SELECTED)) {
                    			cssClass = cssClass + ' ' + CSS_SELECTED;
                    		}
                    		
    						var menuItemHtml = A.substitute(TPL_MENU_ITEM, {
    							cssClass: cssClass,
    							label: linkText,
    							url: linkUrl
    						});
                    		
    						menuList.append(menuItemHtml);
                    	});
                    	
                    	
						var selectedItemMainNav = navigationList.one('li.selected');
						var selectedSubMenuItem = menuList.one('li.selected');
						
						
						// Second level in main navigation for the selected first level node
						if(selectedItemMainNav && selectedSubMenuItem) {
							
                			var secondLevelList = selectedItemMainNav.one('> ul.child-menu');
                			
                			if(secondLevelList) {
                				var secondLevelLinks = secondLevelList.all('>li>a');
                				
                				selectedSubMenuItem.append(TPL_SUB_MENU);
                            	
                            	var subMenu = selectedSubMenuItem.one('>ul');
                            	
                            	secondLevelLinks.each(function(subItem, subIndex, subList) {
                            		
                            		var subLinkUrl = subItem.getAttribute('href');
                            		var subLinkText = subItem.html();
                            		var subSpanNode = subItem.one('>span');
                            		if(subSpanNode) {
                            			subLinkText = subSpanNode.html();	
                            		}
                            		
                            		var subCssClass = '';
                            		
                            		var subListItem = subItem.ancestor('li');
                            		
                            		if(subIndex+1 == subList.size()) {
                            			subCssClass = subCssClass + ' last';
                            		}
                            		
                            		if(subListItem.hasClass(CSS_SELECTED)) {
                            			subCssClass = subCssClass + ' ' + CSS_SELECTED;
                            		} 
                            		
            						var subMenuItemHtml = A.substitute(TPL_SUB_MENU_ITEM, {
            							cssClass: subCssClass,
            							label: subLinkText,
            							url: subLinkUrl
            						});
                            		
            						subMenu.append(subMenuItemHtml);
                            	});
                            	
                            	selectedSubMenuItem.addClass('expanded');
                			}
						}
                    	
                    	instance.navigationButtonMenu = navigationButtonMenu;
                    },
                    
                    _onTriggerClick: function(e) {
                    	var instance = this;
                    	
                    	e.halt();
                    	
                    	var trigger = instance.get(TRIGGER);
                    	
                    	if(instance.navigationButtonMenu.hasClass(CSS_HIDDEN)) {
                    		
                    		// Show menu
                    		instance.navigationButtonMenu.show();
                    		trigger.addClass(CSS_TRIGGER_ACTIVE);
                    		
                    		// Show mask
                    		if(instance.get(USE_MASK)) {
                    			instance.mask.show();
                    			
                    			var zIndex = instance.get(Z_INDEX);
                    			var zIndexMore = zIndex + 1;
                    			
                    			instance.navigationButtonMenu.setStyle('z-index', zIndexMore);
                    			trigger.setStyle('z-index', zIndexMore);
                    		}
                    	}
                    	else {
                    		
                    		// Hide menu
                    		instance.navigationButtonMenu.hide();
                    		trigger.removeClass(CSS_TRIGGER_ACTIVE);
                    		
                    		// Hide mask
                    		if(instance.get(USE_MASK)) {
                    			instance.mask.hide();
                    			
                    			instance.navigationButtonMenu.setStyle('z-index', 0);
                    			trigger.setStyle('z-index', 0);
                    		}
                    		
                    	}
                    },
                    
                    _someFunction: function() {
                        var instance = this;
                    }

                }
            }
    );

    A.ResponsiveNavigationButton = ResponsiveNavigationButton;
        
    },1, {
        requires: [
	       'aui-base',
	       'aui-overlay-mask',
	       'substitute'
      ]
    }
);
