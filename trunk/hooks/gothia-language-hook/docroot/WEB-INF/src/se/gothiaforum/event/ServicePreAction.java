package se.gothiaforum.event;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.liferay.portal.kernel.events.Action;
import com.liferay.portal.kernel.events.ActionException;
import com.liferay.portal.kernel.language.LanguageUtil;
import com.liferay.portal.kernel.util.LocaleUtil;
import com.liferay.portal.util.PortalUtil;
import com.liferay.portlet.expando.service.ExpandoValueLocalServiceUtil;
import com.liferay.util.CookieUtil;

public class ServicePreAction extends Action {

	private static final String LOCALE_KEY = "org.apache.struts.action.LOCALE";

	public ServicePreAction() {
		super();
	}

	public void run(HttpServletRequest request, HttpServletResponse response) throws ActionException {

		try {
			HttpSession session = request.getSession();
			long groupIdFromSession = 0;
			
			long companyId = PortalUtil.getCompanyId(request);
			
			try {
				groupIdFromSession = (Long)session.getAttribute("LIFERAY_SHARED_VISITED_GROUP_ID_RECENT");	
			} catch(ClassCastException cce) {
				
			}
			
			if(groupIdFromSession != 0) {
				String siteLanguageId = ExpandoValueLocalServiceUtil.getData(companyId, "com.liferay.portal.model.Group", "CUSTOM_FIELDS", "gothiaSiteLanguage", groupIdFromSession, "");
				Locale siteLocale = LocaleUtil.fromLanguageId(siteLanguageId);
				
				boolean refresh = false;
				Locale sessionLocale = (Locale) session.getAttribute(LOCALE_KEY);
				String cookieLanguageId = CookieUtil.get(request, "GUEST_LANGUAGE_ID");
				String currentURL = PortalUtil.getCurrentURL(request);
				
				if(cookieLanguageId == null || (!cookieLanguageId.equals(siteLanguageId))) {
					LanguageUtil.updateCookie(request, response, siteLocale);
					refresh = true;
				}
				
				if(sessionLocale == null ||  (!sessionLocale.equals(siteLocale))) {
					session.setAttribute(LOCALE_KEY, siteLocale);
					refresh = true;
				}

				if(refresh) {
					response.sendRedirect(currentURL);
				}
				
			}

		} catch (Exception e) {
			System.out.println(e);
		}

	}

}