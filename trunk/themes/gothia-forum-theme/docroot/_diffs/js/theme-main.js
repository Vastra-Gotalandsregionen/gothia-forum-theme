// Plain javascript that runs before AUI is ready (to prevent content flashing

// Body
addCssClassName(document.body, 'js');

function addCssClassName(node, cssClassName) {
	if(node) {
		var newClassName = node.className + ' ' + cssClassName;
		node.className = newClassName;
	}
}

AUI().ready('aui-base', 'gothia-theme-main', function(A) {

	var gothiaThemeMain = new A.GothiaThemeMain({
	}).render();
	
});