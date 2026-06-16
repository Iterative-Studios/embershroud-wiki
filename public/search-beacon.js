// Wiki search beacon (client). Disabled unless <meta name="wiki:beacon" content="<endpoint>"> is present
// (injected only when WIKI_BEACON_URL is set at build). Sends ONLY search events: query + result count.
// Cookie-less, no identifiers. Best-effort hook on Starlight's Pagefind search UI.
(function () {
	var meta = document.querySelector('meta[name="wiki:beacon"]');
	var endpoint = meta && meta.content;
	if (!endpoint) return; // beacon not configured -> no-op

	var pageVersion = (document.querySelector('meta[name="wiki:build"]') || {}).content || '';
	var lang = document.documentElement.lang || 'en';
	var lastSent = '';
	var timer = null;

	function send(query, resultCount) {
		var q = (query || '').trim();
		if (q.length < 2 || q === lastSent) return;
		lastSent = q;
		var payload = JSON.stringify({
			event_type: 'search',
			search_query: q,
			search_result_count: resultCount,
			page_path: location.pathname,
			page_version: pageVersion,
			language: lang,
		});
		try {
			if (navigator.sendBeacon) navigator.sendBeacon(endpoint, new Blob([payload], { type: 'application/json' }));
			else fetch(endpoint, { method: 'POST', body: payload, headers: { 'Content-Type': 'application/json' }, keepalive: true });
		} catch (e) { /* never break the page over analytics */ }
	}

	// Pagefind injects its UI lazily; observe the document for the search input.
	function hook(input) {
		if (input.__wikiBeaconHooked) return;
		input.__wikiBeaconHooked = true;
		input.addEventListener('input', function () {
			clearTimeout(timer);
			var value = input.value;
			timer = setTimeout(function () {
				// Result count: Pagefind renders a message element; fall back to counting result links.
				var msg = document.querySelector('.pagefind-ui__message');
				var count = null;
				if (msg) {
					var m = (msg.textContent || '').match(/(\d+)/);
					if (m) count = parseInt(m[1], 10);
				}
				if (count === null) count = document.querySelectorAll('.pagefind-ui__result').length;
				send(value, count);
			}, 1200);
		});
	}

	var obs = new MutationObserver(function () {
		var input = document.querySelector('.pagefind-ui__search-input, input[type="search"]');
		if (input) hook(input);
	});
	obs.observe(document.documentElement, { childList: true, subtree: true });
})();
