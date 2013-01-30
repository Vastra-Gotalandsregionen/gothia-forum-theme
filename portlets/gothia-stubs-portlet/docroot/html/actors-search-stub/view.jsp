<%@ include file="/html/init.jsp" %>

<div class="gothia-search-wrap clearfix">
	<form action="" method="post">
	    <div id="<portlet:namespace />queryWrap" class="search-input-wrap clearfix">
	    	<aui:button type="submit" value="search" cssClass="gothia-search-button" />
	        <aui:input name="searchTerm" type="text" cssClass="gothia-search-input" label="" value="" />          
	    </div>
	</form>
</div>

<ul class="gothia-list">
	<c:forEach begin="1" end="3" varStatus="status">
		<c:set scope="page" var="listItemCssClass" value="" />
		<c:if test="${(status.index)%2 ne 0}">
			<c:set var="listItemCssClass" value="${listItemCssClass} gothia-list-item-odd" scope="page" />
		</c:if>
		<c:if test="${status.last}">
			<c:set var="listItemCssClass" value="${listItemCssClass} gothia-list-item-last" scope="page" />
		</c:if>
		<li class="gothia-list-item ${listItemCssClass}">
			<div class="title">
				<h3>
					<a href="#profile-link">Lorem ipsum dolor</a>
				</h3>
				<p class="subtitle">Duis fringilla quam</p>
			</div>
			<div class="content">
				<a href="#profile-link">
					Aenean sed lorem et urna dictum aliquam sed non nunc. In turpis nunc, semper a elementum non, congue elementum odio. Duis non diam id magna lacinia sagittis sit amet pretium nisi. Maecenas ullamcorper tortor in arcu eleifend malesuada.
				</a> 
			</div>
			<div class="meta">
				<ul class="search-tags">
					<li><a href="#">lorem</a></li>
					<li><a href="#">ipsum dolarem</a></li>
					<li><a href="#">sit amet</a></li>
				</ul>
			</div>
		</li>
	</c:forEach>
</ul>

<div class="gothia-paging-wrap">
	<ul class="gothia-paging clearfix">
		<li class="previous">
			<a href="">Previous</a>
		</li>
		<li>
			<span>1</span>
		</li>
		<c:forEach begin="2" end="5" varStatus="status">
			<li>
				<a href="#">${status.index}</a>
			</li>
		</c:forEach>
		<li class="next">
			<a href="">Next</a>
		</li>
	</ul>
</div>