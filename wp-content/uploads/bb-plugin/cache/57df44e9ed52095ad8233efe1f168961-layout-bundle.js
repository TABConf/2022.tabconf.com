/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else this[name] = definition()
}('bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera|opr|opios/i.test(ua)) {
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      if( /touchpad\//i.test(ua) ){
        result.touchpad = t;
      }
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.msedge && (android || result.silk)) {
      result.android = t
    } else if (iosdevice) {
      result[iosdevice] = t
      result.ios = t
    } else if (mac) {
      result.mac = t
    } else if (xbox) {
      result.xbox = t
    } else if (windows) {
      result.windows = t
    } else if (linux) {
      result.linux = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

(function($){
  UABBTrigger = {

      /**
       * Trigger a hook.
       *
       * @since 1.1.0.3
       * @method triggerHook
       * @param {String} hook The hook to trigger.
       * @param {Array} args An array of args to pass to the hook.
       */
      triggerHook: function( hook, args )
      {
        $( 'body' ).trigger( 'uabb-trigger.' + hook, args );
      },
    
      /**
       * Add a hook.
       *
       * @since 1.1.0.3
       * @method addHook
       * @param {String} hook The hook to add.
       * @param {Function} callback A function to call when the hook is triggered.
       */
      addHook: function( hook, callback )
      {
        $( 'body' ).on( 'uabb-trigger.' + hook, callback );
      },
    
      /**
       * Remove a hook.
       *
       * @since 1.1.0.3
       * @method removeHook
       * @param {String} hook The hook to remove.
       * @param {Function} callback The callback function to remove.
       */
      removeHook: function( hook, callback )
      {
        $( 'body' ).off( 'uabb-trigger.' + hook, callback );
      },
  };
})(jQuery);

jQuery(document).ready(function( $ ) {

    if( typeof bowser !== 'undefined' && bowser !== null ) {

      var uabb_browser   = bowser.name,
          uabb_browser_v = bowser.version,
          uabb_browser_class = uabb_browser.replace(/\s+/g, '-').toLowerCase(),
          uabb_browser_v_class = uabb_browser_class + parseInt( uabb_browser_v );
      
      $('html').addClass(uabb_browser_class).addClass(uabb_browser_v_class);
      
    }

    $('.uabb-row-separator').parents('html').css('overflow-x', 'hidden');
});

(function($) {

	/**
	 * Class for Menu Module
	 *
	 * @since 1.6.1
	 */
	FLBuilderMenu = function( settings ){

		// set params
		this.nodeId              = settings.id;
		this.nodeClass           = '.fl-node-' + settings.id;
		this.wrapperClass        = this.nodeClass + ' .fl-menu';
		this.type				 = settings.type;
		this.mobileToggle		 = settings.mobile;
		this.mobileBelowRow		 = settings.mobileBelowRow;
		this.mobileFlyout		 = settings.mobileFlyout;
		this.breakPoints         = settings.breakPoints;
		this.mobileBreakpoint	 = settings.mobileBreakpoint;
		this.currentBrowserWidth = $( window ).width();
		this.postId              = settings.postId;
		this.mobileStacked       = settings.mobileStacked;

		// initialize the menu
		this._initMenu();

		// check if viewport is resizing
		$( window ).on( 'resize', $.proxy( function( e ) {

			var width = $( window ).width();

			// if screen width is resized, reload the menu
		    if( width != this.currentBrowserWidth ){

				this.currentBrowserWidth = width;
				this._initMenu();
 				this._clickOrHover();
			}

		}, this ) );

		$( 'body' ).on( 'click', $.proxy( function( e ) {
			if ( 'undefined' !== typeof FLBuilderConfig ){
				return;
			}

			var activeMobileMenu = $(this.wrapperClass + ' .fl-menu-mobile-toggle.fl-active' );
			if ( activeMobileMenu.length && ( 'expanded' !== this.mobileToggle ) ){
				$( activeMobileMenu ).trigger('click');
			}

			$( this.wrapperClass ).find( '.fl-has-submenu' ).removeClass( 'focus' );
			$( this.wrapperClass ).find( '.fl-has-submenu .sub-menu' ).removeClass( 'focus' );

		}, this ) );

		// Close Mobile menu when tabbing out from the last menu item.
		$( this.wrapperClass + ' ul.menu > li:last-child' ).on( 'focusout', $.proxy(function (e) {
			if ( $( this.wrapperClass ).find( '.fl-menu-mobile-toggle' ).hasClass( 'fl-active' ) && ( 'expanded' !== this.mobileToggle ) ) {
				if ( ! $( e.relatedTarget ).parent().hasClass( 'menu-item' ) ) {
					$( this.wrapperClass ).find( '.fl-menu-mobile-toggle' ).trigger( 'click' );	
				}
			}
		}, this ) );

	};

	FLBuilderMenu.prototype = {
		nodeClass               : '',
		wrapperClass            : '',
		type 	                : '',
		breakPoints 			: {},
		$submenus				: null,

		/**
		 * Check if the screen size fits a mobile viewport.
		 *
		 * @since  1.6.1
		 * @return bool
		 */
		_isMobile: function(){
			return this.currentBrowserWidth <= this.breakPoints.small ? true : false;
		},

		/**
		 * Check if the screen size fits a medium viewport.
		 *
		 * @since  1.10.5
		 * @return bool
		 */
		_isMedium: function(){
			return this.currentBrowserWidth <= this.breakPoints.medium ? true : false;
		},

		/**
		 * Check if the screen size fits a large viewport.
		 *
		 * @since  1.10.5
		 * @return bool
		 */
		_isLarge: function(){
			return this.currentBrowserWidth <= this.breakPoints.large ? true : false;
		},

		/**
		 * Check if the menu should toggle for the current viewport base on the selected breakpoint
		 *
		 * @see 	this._isMobile()
		 * @see 	this._isMedium()
		 * @since  	1.10.5
		 * @return bool
		 */
		_isMenuToggle: function(){
			if ( ( 'always' == this.mobileBreakpoint
				|| ( this._isMobile() && 'mobile' == this.mobileBreakpoint )
				|| ( this._isMedium() && 'medium-mobile' == this.mobileBreakpoint )
				|| ( this._isLarge() && 'large-mobile' == this.mobileBreakpoint )
			) && ( $( this.wrapperClass ).find( '.fl-menu-mobile-toggle' ).is(':visible') || 'expanded' == this.mobileToggle ) ) {
				return true;
			}

			return false;
		},

		/**
		 * Initialize the toggle logic for the menu.
		 *
		 * @see    this._isMenuToggle()
		 * @see    this._menuOnCLick()
		 * @see    this._clickOrHover()
		 * @see    this._submenuOnRight()
		 * @see    this._submenuRowZindexFix()
		 * @see    this._toggleForMobile()
		 * @since  1.6.1
		 * @return void
		 */
		_initMenu: function(){
			this._setupSubmenu();
			this._menuOnFocus();
			this._submenuOnClick();
			if ( $( this.nodeClass ).length && this.type == 'horizontal' ) {
				this._initMegaMenus();
			}

			if( this._isMenuToggle() || this.type == 'accordion' ){

				$( this.wrapperClass ).off( 'mouseenter mouseleave' );
				this._menuOnClick();
				this._clickOrHover();

			} else {
				$( this.wrapperClass ).off( 'click' );
				this._submenuOnRight();
				this._submenuRowZindexFix();
			}

			if( this.mobileToggle != 'expanded' ){
				this._toggleForMobile();
			}

			if( $( this.wrapperClass ).find( '.fl-menu-search-item' ).length ){
				this._toggleMenuSearch();
			}

			if( $( this.wrapperClass ).find( '.fl-menu-cart-item').length ){
				this._wooUpdateParams();
			}
		},

		/**
		 * Initializes submenu dropdowns.
		 *
		 * @since 3.0
		 * @return void
		 */
		_setupSubmenu: function() {
			$( this.wrapperClass + ' ul.sub-menu' ).each( function(){
				$( this ).closest( 'li' ).attr( 'aria-haspopup', 'true' );
			});
		},

		/**
		 * Adds a focus class to menu elements similar to be used similar to CSS :hover psuedo event
		 *
		 * @since  1.9.0
		 * @return void
		 */
		_menuOnFocus: function(){
			var cKey      = 0,
			    isShifted = false;

			$( this.nodeClass ).off('keydown').on( 'keydown', 'a', function( e ){
				cKey      = e.which;
				isShifted = e.shiftKey;
			});

			$( this.nodeClass ).off('focus').on( 'focus', 'a', $.proxy( function( e ){
				var $menuItem	= $( e.target ).parents( '.menu-item' ).first(),
					$parents	= $( e.target ).parentsUntil( this.wrapperClass );

				$('.fl-menu .focus').removeClass('focus');

				$menuItem.addClass('focus')
				$parents.addClass('focus')

			}, this ) ).on( 'focusout', 'a', $.proxy( function( e ){
				var el            = $(e.target).parent(),
		            $megaMenu     = el.closest( '.mega-menu' ),
		            $megaLastItem = $megaMenu.find('> .sub-menu > .menu-item:last-child'),
					isLastChild   = ! $megaMenu.length && el.is(':last-child' );

		        if( $megaMenu.length ) {
					isLastChild = el.is( $megaLastItem ) || el.is( $megaLastItem.find( '.menu-item:last-child' ) );
				}

				if ( isLastChild && cKey === 9 && isShifted ) {
					isLastChild = false;
					cKey       = 0;
					isShifted  = false;
				}

				if ( isLastChild ) {
					$( e.target ).parentsUntil( this.wrapperClass ).removeClass( 'focus' );
				}

			}, this ) );
		},

		/**
		 * Logic for submenu toggling on accordions or mobile menus (vertical, horizontal)
		 *
		 * @since  1.6.1
		 * @return void
		 */
		_menuOnClick: function(){
			$( this.wrapperClass ).off().on( 'click', '.fl-has-submenu-container', $.proxy( function( e ){

				var $link			= $( e.target ).parents( '.fl-has-submenu' ).first(),
					$subMenu 		= $link.children( '.sub-menu' ).first(),
					$href	 		= $link.children('.fl-has-submenu-container').first().find('> a').attr('href'),
					$subMenuParents = $( e.target ).parents( '.sub-menu' ),
					$activeParents 	= $( e.target ).parents( '.fl-has-submenu.fl-active' );

				if( !$subMenu.is(':visible') || $(e.target).hasClass('fl-menu-toggle')
					|| ($subMenu.is(':visible') && (typeof $href === 'undefined' || $href == '#')) ){
					e.preventDefault();
				}
				else {
					e.stopPropagation();
					window.location.href = $href;
					return;
				}

				if ($(this.wrapperClass).hasClass('fl-menu-accordion-collapse')) {

					if ( !$link.parents('.menu-item').hasClass('fl-active') ) {
						$('.menu .fl-active', this.wrapperClass).not($link).removeClass('fl-active');
					}
					else if ($link.parents('.menu-item').hasClass('fl-active') && $link.parent('.sub-menu').length) {
						$('.menu .fl-active', this.wrapperClass).not($link).not($activeParents).removeClass('fl-active');
					}

					$('.sub-menu', this.wrapperClass).not($subMenu).not($subMenuParents).slideUp('normal');
				}

				if ( ! this.mobileStacked && 'horizontal' == this.type && 'expanded' == this.mobileToggle ) {
					$( this.wrapperClass ).find( '.fl-active' ).not($link).not($activeParents).removeClass( 'fl-active' );
				}
				else {
					$subMenu.slideToggle();
				}

				$link.toggleClass( 'fl-active' );
				e.stopPropagation();

			}, this ) );

		},

		/**
		 * Logic for submenu items click event
		 *
		 * @since  1.10.6
		 * @return void
		 */
		_submenuOnClick: function(){
			$( this.wrapperClass + ' .sub-menu' ).off().on( 'click', 'a', $.proxy( function( e ){
				if ( $( e.target ).parent().hasClass('focus') ) {
					$( e.target ).parentsUntil( this.wrapperClass ).removeClass('focus');
				}
			}, this ) );
		},

		/**
		 * Changes general styling and behavior of menus based on mobile / desktop viewport.
		 *
		 * @see    this._isMenuToggle()
		 * @since  1.6.1
		 * @return void
		 */
		_clickOrHover: function(){
			this.$submenus = this.$submenus || $( this.wrapperClass ).find( '.sub-menu' );
			var $wrapper   = $( this.wrapperClass ),
				$menu      = $wrapper.find( '.menu' );
				$li        = $wrapper.find( '.fl-has-submenu' );

			if( this._isMenuToggle() ){
				$li.each( function( el ){
					if( !$(this).hasClass('fl-active') ){
						$(this).find( '.sub-menu' ).fadeOut();
					}
				} );
			} else {
				$li.each( function( el ){
					if( !$(this).hasClass('fl-active') ){
						$(this).find( '.sub-menu' ).css( {
							'display' : '',
							'opacity' : ''
						} );
					}
				} );
			}
		},

		/**
		 * Logic to prevent submenus to go outside viewport boundaries.
		 *
		 * @since  1.6.1
		 * @return void
		 */
		_submenuOnRight: function(){

			$( this.wrapperClass )
				.on( 'mouseenter focus', '.fl-has-submenu', $.proxy( function( e ){

					if( $ ( e.currentTarget ).find('.sub-menu').length === 0 ) {
						return;
					}

					var $link           = $( e.currentTarget ),
						$parent         = $link.parent(),
						$subMenu        = $link.find( '.sub-menu' ),
						subMenuWidth    = $subMenu.width(),
						subMenuPos      = 0,
						bodyWidth       = $( 'body' ).width();

					if( $link.closest( '.fl-menu-submenu-right' ).length !== 0) {

						$link.addClass( 'fl-menu-submenu-right' );

					} else if( $( 'body' ).hasClass( 'rtl' ) ) {

						subMenuPos = $parent.is( '.sub-menu' ) ?
									 $parent.offset().left - subMenuWidth:
									 $link.offset().left - $link.width() - subMenuWidth;

						if( subMenuPos <= 0 ) {
							$link.addClass( 'fl-menu-submenu-right' );
						}

					} else {

						subMenuPos = $parent.is( '.sub-menu' ) ?
									 $parent.offset().left + $parent.width() + subMenuWidth :
									 $link.offset().left + $link.width() + subMenuWidth;

						if( subMenuPos > bodyWidth ) {
							$link.addClass('fl-menu-submenu-right');
						}
					}
				}, this ) )
				.on( 'mouseleave', '.fl-has-submenu', $.proxy( function( e ){
					$( e.currentTarget ).removeClass( 'fl-menu-submenu-right' );
				}, this ) );

		},

		/**
		 * Logic to prevent submenus to go behind the next overlay row.
		 *
		 * @since  1.10.9
		 * @return void
		 */
		_submenuRowZindexFix: function( e ){

			$( this.wrapperClass )
				.on( 'mouseenter', 'ul.menu > .fl-has-submenu', $.proxy( function( e ){

					if( $ ( e.currentTarget ).find('.sub-menu').length === 0 ) {
						return;
					}

					$( this.nodeClass )
						.closest( '.fl-row' )
						.find( '.fl-row-content' )
						.css( 'z-index', '10' );

				}, this ) )
				.on( 'mouseleave', 'ul.menu > .fl-has-submenu', $.proxy( function( e ){

					$( this.nodeClass )
						.closest( '.fl-row' )
						.find( '.fl-row-content' )
						.css( 'z-index', '' );

				}, this ) );
		},

		/**
		 * Logic for the mobile menu button.
		 *
		 * @since  1.6.1
		 * @return void
		 */
		_toggleForMobile: function(){

			var $wrapper = null,
				$menu    = null,
				self     = this;

			if( this._isMenuToggle() ){

				if ( this._isMobileBelowRowEnabled() ) {
					this._placeMobileMenuBelowRow();
					$wrapper = $( this.wrapperClass );
					$menu    = $( this.nodeClass + '-clone' );
					$menu.find( 'ul.menu' ).show();
				}
				else {
					$wrapper = $( this.wrapperClass );
					$menu    = $wrapper.find( '.menu' );
				}

				if( !$wrapper.find( '.fl-menu-mobile-toggle' ).hasClass( 'fl-active' ) && ! self.mobileFlyout ){
					$menu.css({ display: 'none' });
				}

				// Flayout Menu
				if ( self.mobileFlyout ) {
					this._initFlyoutMenu();
				}

				$wrapper.on( 'click', '.fl-menu-mobile-toggle', function( e ){

					$( this ).toggleClass( 'fl-active' );

					if ( self.mobileFlyout ) {
						self._toggleFlyoutMenu();
					}
					else {
						var targetMenu = null;
						
						if ( self.mobileBelowRow ) {
							targetMenu = $( this ).closest( '.fl-col' ).next( '.fl-menu-mobile-clone' );
						} else {
							targetMenu = $( this ).closest( '.fl-menu' ).find( 'ul.menu' );
						}
						
						if ( targetMenu.length ) {
							$menu = $( targetMenu );
						}

						$menu.slideToggle();
					}

					e.stopPropagation();
				} );

				// Hide active menu when click on anchor link ID that exists on a page.
				$menu.on( 'click', '.menu-item > a[href*="#"]:not([href="#"])', function(e){
					var $href = $(this).attr('href'),
						$targetID = $href.split('#')[1],
						element = $('#' + $targetID);
					if ( $('body').find(element).length > 0 ) {
						$( this ).toggleClass( 'fl-active' );
						FLBuilderLayout._scrollToElement( element );
						if ( ! self._isMenuToggle() ) {
							$menu.slideToggle();
						}
					}
				});
			}
			else {

				if ( this._isMobileBelowRowEnabled() ) {
					this._removeMenuFromBelowRow();
				}

				$wrapper = $( this.wrapperClass ),
				$menu    = $wrapper.find( 'ul.menu' );
				$wrapper.find( '.fl-menu-mobile-toggle' ).removeClass( 'fl-active' );
				$menu.css({ display: '' });

				if ( this.mobileFlyout && $wrapper.find( '.fl-menu-mobile-flyout' ).length > 0 ) {
					$( 'body' ).css( 'margin', '' );
					$( '.fl-builder-ui-pinned-content-transform' ).css( 'transform', '' );
					$menu.unwrap();
					$wrapper.find( '.fl-menu-mobile-close' ).remove();
					$wrapper.find( '.fl-menu-mobile-opacity' ).remove();
				}
			}
		},

		/**
		 * Init any mega menus that exist.
		 *
		 * @see 	this._isMenuToggle()
		 * @since  	1.10.4
		 * @return void
		 */
		_initMegaMenus: function(){

			var module     = $( this.nodeClass ),
				rowContent = module.closest( '.fl-row-content' ),
				rowWidth   = rowContent.width(),
				megas      = module.find( '.mega-menu' ),
				disabled   = module.find( '.mega-menu-disabled' ),
				isToggle   = this._isMenuToggle();

			if ( isToggle ) {
				megas.removeClass( 'mega-menu' ).addClass( 'mega-menu-disabled' );
				module.find( 'li.mega-menu-disabled > ul.sub-menu' ).css( 'width', '' );
				rowContent.css( 'position', '' );
			} else {
				disabled.removeClass( 'mega-menu-disabled' ).addClass( 'mega-menu' );
				module.find( 'li.mega-menu > ul.sub-menu' ).css( 'width', rowWidth + 'px' );
				rowContent.css( 'position', 'relative' );
			}
		},

		/**
		 * Check to see if Below Row should be enabled.
		 *
		 * @since  	1.11
		 * @return boolean
		 */
		_isMobileBelowRowEnabled: function() {
			return this.mobileBelowRow && $( this.nodeClass ).closest( '.fl-col' ).length;
		},

		/**
		 * Logic for putting the mobile menu below the menu's
		 * column so it spans the full width of the page.
		 *
		 * @since  1.10
		 * @return void
		 */
		_placeMobileMenuBelowRow: function(){

			if ( $( this.nodeClass + '-clone' ).length ) {
				return;
			}

			var module = $( this.nodeClass ),
				clone  = null,
				col    = module.closest( '.fl-col' );

			if ( module.length < 1 ) {
				return;
			}

			clone = ( module.length > 1 ) ? $( module[0] ).clone() : module.clone();
			module.find( 'ul.menu' ).remove();
			clone.addClass( ( this.nodeClass + '-clone' ).replace( '.', '' ) );
			clone.addClass( 'fl-menu-mobile-clone' );
			clone.find( '.fl-menu-mobile-toggle' ).remove();
			col.after( clone );

			// Removes animation when enabled.
			if ( module.hasClass( 'fl-animation' ) ) {
				clone.removeClass( 'fl-animation' );
			}

			this._menuOnClick();
		},

		/**
		 * Logic for removing the mobile menu from below the menu's
		 * column and putting it back in the main wrapper.
		 *
		 * @since  1.10
		 * @return void
		 */
		_removeMenuFromBelowRow: function(){

			if ( ! $( this.nodeClass + '-clone' ).length ) {
				return;
			}

			var module = $( this.nodeClass ),
				clone  = $( this.nodeClass + '-clone' ),
				menu   = clone.find( 'ul.menu' );

			module.find( '.fl-menu-mobile-toggle' ).after( menu );
			clone.remove();
		},

		/**
		 * Logic for Flyout responsive menu.
		 *
		 * @since 2.2
		 * @return void
		 */
		_initFlyoutMenu: function(){
			var win     = $( window ),
				wrapper = $( this.wrapperClass ),
				menu  	= wrapper.find( 'ul.menu' ),
				button	= wrapper.find( '.fl-menu-mobile-toggle' );

			if ( 0 === wrapper.find( '.fl-menu-mobile-flyout' ).length ) {
				menu.wrap( '<div class="fl-menu-mobile-flyout"></div>' );
			}

			if ( 0 === wrapper.find( '.fl-menu-mobile-close' ).length ) {
				close = window.fl_responsive_close || 'Close'
				wrapper.find( '.fl-menu-mobile-flyout' )
					.prepend( '<button class="fl-menu-mobile-close" aria-label="' + close + '"><i class="fas fa-times" aria-hidden="true"></i></button>' );
			}

			// Push with opacity
			if ( wrapper.hasClass( 'fl-menu-responsive-flyout-push-opacity' ) && 0 === wrapper.find( '.fl-menu-mobile-opacity' ).length ) {
				wrapper.append( '<div class="fl-menu-mobile-opacity"></div>' );
			}

			wrapper.on( 'click', '.fl-menu-mobile-opacity, .fl-menu-mobile-close', function(e){
				button.trigger( 'click' );
				e.stopPropagation();
			});

			if ( 'undefined' !== typeof FLBuilder ) {
				FLBuilder.addHook('restartEditingSession', function(){
					$( '.fl-builder-ui-pinned-content-transform' ).css( 'transform', '' );

					// Toggle active menu.
					if ( button.hasClass( 'fl-active' ) ) {
						button.trigger( 'click' );
					}
				});
			}
		},

		/**
		 * Logic to enable/disable the Flyout menu on button click.
		 *
		 * @since 2.2
		 * @return void
		 */
		_toggleFlyoutMenu: function(){
			var wrapper		= $( this.wrapperClass ),
				button		= wrapper.find( '.fl-menu-mobile-toggle' ),
				wrapFlyout	= wrapper.find( '.fl-menu-mobile-flyout' ),
				position 	= wrapper.hasClass( 'fl-flyout-right' ) ? 'right' : 'left',
				pushMenu 	= wrapper.hasClass( 'fl-menu-responsive-flyout-push' ) || wrapper.hasClass( 'fl-menu-responsive-flyout-push-opacity' ),
				opacity		= wrapper.find( '.fl-menu-mobile-opacity' ),
				marginPos	= {},
				posAttr		= {},
				fixedPos 	= {},
				winHeight	= $(window).height(),
				fixedHeader	= $('header, header > div');

			if ( button.hasClass( 'fl-active' ) ) {
				posAttr[ position ]  = '0px';
				posAttr[ 'height' ]  = winHeight + 'px';
			} else {
				posAttr[ position ]  = '-267px';
			}

			wrapFlyout.css( posAttr );

			// Fix the push menu when builder ui panel is pinned.
			if ( $( '.fl-builder-ui-pinned-content-transform' ).length > 0 && ! $( 'body' ).hasClass( 'fl-builder-edit' ) ) {
				$( '.fl-builder-ui-pinned-content-transform' ).css( 'transform', 'none' );
			}

			if ( pushMenu ) {
				marginPos[ 'margin-' + position ] = button.hasClass( 'fl-active' ) ? '250px' : '0px';
				$( 'body' ).animate( marginPos, 200);

				// Fixed header
				if ( fixedHeader.length > 0 ) {
					fixedPos[ position] = button.hasClass( 'fl-active' ) ? '250px' : '0px';
					fixedHeader.each(function(){
						if ( 'fixed' == $( this ).css( 'position' ) ) {
							$( this ).css({
								'-webkit-transition': 'none',
								'-o-transition'		: 'none',
								'transition'		: 'none'
							});
							$( this ).animate( fixedPos, 200 );
						}
					});
				}
			}

			if ( opacity.length > 0 && button.hasClass( 'fl-active' ) ) {
				opacity.show();
			}
			else {
				opacity.hide();
			}
		},

		/**
		 * Shows or hides the nav search form.
		 *
		 * @since 2.5
		 * @method _toggleMenuSearch
		 */
		_toggleMenuSearch: function(){
			var wrapper = $( this.wrapperClass ).find('.fl-menu-search-item'),
				button  = wrapper.find('a.fl-button'),
				form    = wrapper.find('.fl-search-form-input-wrap'),
				self    = this;

			button.on('click', function(e){
				e.preventDefault();

				if(form.is(':visible')) {
					form.stop().fadeOut(200);
				}
				else {
					form.stop().fadeIn(200);
					$('body').on('click.fl-menu-search', $.proxy(self._hideMenuSearch, self));
					form.find('.fl-search-text').focus();
				}
			});
		},

		/**
		 * Hides the nav search form.
		 *
		 * @since 2.5
		 * @method _hideMenuSearch
		 */
		_hideMenuSearch: function(e){
			var form = $( this.wrapperClass ).find('.fl-search-form-input-wrap');

			if(e !== undefined) {
				if($(e.target).closest('.fl-menu-search-item').length > 0) {
					return;
				}
			}

			form.stop().fadeOut(200);
			$('body').off('click.fl-menu-search');
		},

		/**
		 * Adds menu node and post ID to WooCommerce ajax URL requests.
		 *
		 * @since  3.0
		 * @return void
		 */
		_wooUpdateParams: function() {
			if ( 'undefined' !== typeof wc_cart_fragments_params ) {
				wc_cart_fragments_params.wc_ajax_url += '&fl-menu-node='+ this.nodeId +'&post-id='+ this.postId;
			}
			if ( 'undefined' !== typeof wc_add_to_cart_params ) {
				wc_add_to_cart_params.wc_ajax_url += '&fl-menu-node='+ this.nodeId +'&post-id='+ this.postId;
			}
		},
	};

})(jQuery);

(function($) {

	$(function() {

		new FLBuilderMenu({
			id: '60dfccff6abb1',
			type: 'horizontal',
			mobile: 'hamburger',
			mobileBelowRow: true,
			mobileFlyout: false,
			breakPoints: {
				medium: 992,
				small: 768			},
			mobileBreakpoint: 'medium-mobile',
			postId : '63',
			mobileStacked: true,
		});

	});

})(jQuery);

/* Start Global Node Custom JS */

/* End Global Node Custom JS */


/* Start Layout Custom JS */

/* End Layout Custom JS */

(function($){

	/**
	 * Helper class for header layout logic.
	 *
	 * @since 1.0
	 * @class FLThemeBuilderHeaderLayout
	 */
	FLThemeBuilderHeaderLayout = {

		/**
		 * A reference to the window object for this page.
		 *
		 * @since 1.0
		 * @property {Object} win
		 */
		win : null,

		/**
		 * A reference to the body object for this page.
		 *
		 * @since 1.0
		 * @property {Object} body
		 */
		body : null,

		/**
		 * A reference to the header object for this page.
		 *
		 * @since 1.0
		 * @property {Object} header
		 */
		header : null,

		/**
		 * Whether this header overlays the content or not.
		 *
		 * @since 1.0
		 * @property {Boolean} overlay
		 */
		overlay : false,

		/**
		 * Whether the page has the WP admin bar or not.
		 *
		 * @since 1.0
		 * @property {Boolean} hasAdminBar
		 */
		hasAdminBar : false,

		/**
		 * Breakpoint for when the sticky header should apply.
		 *
		 * @since 1.4
		 * @property {String} stickyOn
		 */
		stickyOn: '',

		/**
		 * A reference of the sticky and shrink header breakpoint.
		 *
		 * @since 1.2.5
		 * @property {Number} breakpointWidth
		 */
		breakpointWidth: 0,

		/**
		 * Initializes header layout logic.
		 *
		 * @since 1.0
		 * @method init
		 */
		init: function()
		{
			var editing          = $( 'html.fl-builder-edit' ).length,
				header           = $( '.fl-builder-content[data-type=header]' ),
				menuModule       = header.find( '.fl-module-menu' ),
				breakpoint       = null;

			if ( ! editing && header.length ) {

				header.imagesLoaded( $.proxy( function() {

					this.win         = $( window );
					this.body        = $( 'body' );
					this.header      = header.eq( 0 );
					this.overlay     = !! Number( header.attr( 'data-overlay' ) );
					this.hasAdminBar = !! $( 'body.admin-bar' ).length;
					this.stickyOn    = this.header.data( 'sticky-on' );
					breakpoint       = this.header.data( 'sticky-breakpoint' );

					if ( '' == this.stickyOn ) {
						if ( typeof FLBuilderLayoutConfig.breakpoints[ breakpoint ] !== undefined ) {
							this.breakpointWidth = FLBuilderLayoutConfig.breakpoints[ breakpoint ];
						}
						else {
							this.breakpointWidth = FLBuilderLayoutConfig.breakpoints.medium;
						}						
					}

					if ( Number( header.attr( 'data-sticky' ) ) ) {

						this.header.data( 'original-top', this.header.offset().top );
						this.win.on( 'resize', $.throttle( 500, $.proxy( this._initSticky, this ) ) );
						this._initSticky();

					}

				}, this ) );
			}
		},

		/**
		 * Initializes sticky logic for a header.
		 *
		 * @since 1.0
		 * @access private
		 * @method _initSticky
		 */
		_initSticky: function( e )
		{
			var header     = $('.fl-builder-content[data-type=header]'),
				windowSize = this.win.width(),
				makeSticky = false;

			makeSticky = this._makeWindowSticky( windowSize );
			if ( makeSticky || ( this.breakpointWidth > 0 && windowSize >= this.breakpointWidth ) ) {
				this.win.on( 'scroll.fl-theme-builder-header-sticky', $.proxy( this._doSticky, this ) );
				//
				// Check if Event Type is 'resize' then invoke this._doSticky() 
				// only if the 'fl-theme-builder-header-sticky' class is already present.
				// 
				if ( e && 'resize' === e.type ) {
					if ( this.header.hasClass( 'fl-theme-builder-header-sticky' ) ) {
						this._doSticky( e );
					}
					this._adjustStickyHeaderWidth(); 
				}

				if ( Number( header.attr( 'data-shrink' ) ) ) {
					this.header.data( 'original-height', this.header.outerHeight() );
					this.win.on( 'resize', $.throttle( 500, $.proxy( this._initShrink, this ) ) );
					this._initShrink();
				}

				this._initFlyoutMenuFix( e );
			} else {
				this.win.off( 'scroll.fl-theme-builder-header-sticky' );
				this.win.off( 'resize.fl-theme-builder-header-sticky' );
				
				this.header.removeClass( 'fl-theme-builder-header-sticky' );
				this.header.removeAttr( 'style' );
				this.header.parent().css( 'padding-top', '0' );
			}
		},

		/**
		 * Check if Header should be sticky at a particular Window size.
		 *
		 * @since 1.4
		 * @access private
		 * @param  widowSize
		 * @method _makeWindowSticky
		 */
		_makeWindowSticky: function ( windowSize )
		{
			var makeSticky = false;

			switch (this.stickyOn) {
				case '':
				case 'desktop':
					makeSticky = windowSize >= FLBuilderLayoutConfig.breakpoints['medium'];
					break;
				case 'desktop-medium':
					makeSticky = windowSize > FLBuilderLayoutConfig.breakpoints['small'];
					break;
				case 'medium':
					makeSticky = ( windowSize <= FLBuilderLayoutConfig.breakpoints['medium'] && windowSize > FLBuilderLayoutConfig.breakpoints['small'] );
					break;
				case 'medium-mobile':
					makeSticky = (windowSize <= FLBuilderLayoutConfig.breakpoints['medium']);
					break;
				case 'mobile':
					makeSticky = (windowSize <= FLBuilderLayoutConfig.breakpoints['small']);
					break;
				case 'all':
					makeSticky = true;
					break;
			}

			return makeSticky;
		},

		/**
		 * Sticks the header when the page is scrolled.
		 *
		 * @since 1.0
		 * @access private
		 * @method _doSticky
		 */
		_doSticky: function( e )
		{
			var winTop    		  = Math.floor( this.win.scrollTop() ),
				headerTop 		  = Math.floor( this.header.data( 'original-top' ) ),
				hasStickyClass    = this.header.hasClass( 'fl-theme-builder-header-sticky' ),
				hasScrolledClass  = this.header.hasClass( 'fl-theme-builder-header-scrolled' ),
				beforeHeader      = this.header.prevAll( '.fl-builder-content' ),
				bodyTopPadding    = parseInt( jQuery('body').css('padding-top') ),
				winBarHeight      = $('#wpadminbar').length ? $('#wpadminbar').outerHeight() : 0,
				headerHeight      = 0;

			if ( isNaN( bodyTopPadding ) ) {
				bodyTopPadding = 0;
			}
			
			if ( this.hasAdminBar && this.win.width() > 600 ) {
				winTop += Math.floor( winBarHeight );
			}

			if ( winTop > headerTop ) {
				if ( ! hasStickyClass ) {
					if ( e && ( 'scroll' === e.type || 'smartscroll' === e.type ) ) {
					 	this.header.addClass( 'fl-theme-builder-header-sticky' );
						if ( this.overlay && beforeHeader.length ) {
							this.header.css( 'top', winBarHeight);
						}
					}

					if ( ! this.overlay ) {
						this._adjustHeaderHeight();
					}
				}
			}
			else if ( hasStickyClass ) {
				this.header.removeClass( 'fl-theme-builder-header-sticky' );
				this.header.removeAttr( 'style' );
				this.header.parent().css( 'padding-top', '0' );
			}
			
			this._adjustStickyHeaderWidth();

			if ( winTop > headerTop ) {
				if ( ! hasScrolledClass ) {
					this.header.addClass( 'fl-theme-builder-header-scrolled' );
				}
			} else if ( hasScrolledClass ) {
				this.header.removeClass( 'fl-theme-builder-header-scrolled' );
			}

			this._flyoutMenuFix( e );
		},

		/**
		 * Initializes flyout menu fixes on sticky header.
		 *
		 * @since 1.4.1
		 * @method _initFlyoutMenuFix
		 */
		_initFlyoutMenuFix: function( e ) {
			var header       = this.header,
			    menuModule   = header.find( '.fl-menu' ),
				flyoutMenu   = menuModule.find( '.fl-menu-mobile-flyout' ),
				isPushMenu   = menuModule.hasClass( 'fl-menu-responsive-flyout-push' ) || menuModule.hasClass( 'fl-menu-responsive-flyout-push-opacity' ),
				isSticky     = header.hasClass( 'fl-theme-builder-header-sticky' ),
				isOverlay    = menuModule.hasClass( 'fl-menu-responsive-flyout-overlay' ),
				flyoutPos    = menuModule.hasClass( 'fl-flyout-right' ) ? 'right' : 'left',
				flyoutParent = header.parent().is( 'header' ) ? header.parent().parent() : header.parent();
				isFullWidth  = this.win.width() === header.width(),
				flyoutLayout = '',
				activePos    = 250,
				headerPos    = 0;

			if ( ! flyoutMenu.length ) {
				return;
			}

			if ( this.win.width() > header.parent().width() ) {
				headerPos = ( this.win.width() - header.width() ) / 2;
			}

			if ( isOverlay ) {
				activePos = headerPos;
			}
			else if ( isPushMenu ) {
				activePos = activePos + headerPos;
			}
			flyoutMenu.data( 'activePos', activePos );

			if ( isPushMenu ) {
				flyoutLayout = 'push-' + flyoutPos;
			}
			else if ( isOverlay ) {
				flyoutLayout = 'overlay-' + flyoutPos;
			}

			if ( isPushMenu && ! $( 'html' ).hasClass( 'fl-theme-builder-has-flyout-menu' ) ) {
				$( 'html' ).addClass( 'fl-theme-builder-has-flyout-menu' );
			}

			if ( ! flyoutParent.hasClass( 'fl-theme-builder-flyout-menu-' + flyoutLayout ) ) {
				flyoutParent.addClass( 'fl-theme-builder-flyout-menu-' + flyoutLayout );
			}

			if ( ! header.hasClass( 'fl-theme-builder-flyout-menu-overlay' ) && isOverlay ) {
				header.addClass( 'fl-theme-builder-flyout-menu-overlay' );
			}

			if ( ! header.hasClass( 'fl-theme-builder-header-full-width' ) && isFullWidth ) {
			   header.addClass( 'fl-theme-builder-header-full-width' );
		    }
			else if ( ! isFullWidth ) {
				header.removeClass( 'fl-theme-builder-header-full-width' );
			}

			menuModule.on( 'click', '.fl-menu-mobile-toggle', $.proxy( function( event ){
				if ( menuModule.find( '.fl-menu-mobile-toggle.fl-active' ).length ) {
					$( 'html' ).addClass( 'fl-theme-builder-flyout-menu-active' );
					event.stopImmediatePropagation();
				}
				else {
					$( 'html' ).removeClass( 'fl-theme-builder-flyout-menu-active' );
				}

				this._flyoutMenuFix( event );
			}, this ) );
		},

		/**
		 * Fix flyout menu inside the sticky header.
		 *
		 * @since 1.4.1
		 * @method _flyoutMenuFix
		 */
		_flyoutMenuFix: function( e ){
			var header      = this.header,
			    menuModule  = header.find( '.fl-menu' ),
				flyoutMenu  = menuModule.find( '.fl-menu-mobile-flyout' ),
				isPushMenu  = menuModule.hasClass( 'fl-menu-responsive-flyout-push' ) || menuModule.hasClass( 'fl-menu-responsive-flyout-push-opacity' ),
				flyoutPos   = menuModule.hasClass( 'fl-flyout-right' ) ? 'right' : 'left',
				menuOpacity = menuModule.find( '.fl-menu-mobile-opacity' ),
				isScroll    = 'undefined' !== typeof e && 'scroll' === e.handleObj.type,
				activePos   = 'undefined' !== typeof flyoutMenu.data( 'activePos' ) ? flyoutMenu.data( 'activePos' ) : 0,
				headerPos   = ( this.win.width() - header.width() ) / 2,
				inactivePos = headerPos > 0 ? activePos + 4 : 254;

			if ( ! flyoutMenu.length ) {
				return;
			}

			if ( this.overlay ) {
				return;
			}

			if( $( '.fl-theme-builder-flyout-menu-active' ).length ) {

				if ( isScroll && ! flyoutMenu.hasClass( 'fl-menu-disable-transition' ) ) {
					flyoutMenu.addClass( 'fl-menu-disable-transition' );
				}

				if ( header.hasClass( 'fl-theme-builder-header-sticky' ) ) {
					if ( ! isScroll ) {
						setTimeout( $.proxy( function(){
							flyoutMenu.css( flyoutPos, '-' + activePos + 'px' );
						}, this ), 1 );
					}
					else {
						flyoutMenu.css( flyoutPos, '-' + activePos + 'px' );
					}
				}
				else {
					flyoutMenu.css( flyoutPos, '0px' );
				}
			}
			else {
				if ( flyoutMenu.hasClass( 'fl-menu-disable-transition' ) ) {
					flyoutMenu.removeClass( 'fl-menu-disable-transition' );
				}

				if ( header.hasClass( 'fl-theme-builder-flyout-menu-overlay' ) && headerPos > 0 && headerPos < 250 ) {
					if ( header.hasClass( 'fl-theme-builder-header-sticky' ) ) {
						inactivePos = headerPos + 254;
					}
					else {
						inactivePos = 254;
					}
				}

				if ( e && e.type === 'resize' ) {
					inactivePos = headerPos + 254;
				}

				flyoutMenu.css( flyoutPos, '-' + inactivePos + 'px' );
			}

			if ( e && menuModule.is('.fl-menu-responsive-flyout-overlay') && $.infinitescroll ) {
				e.stopImmediatePropagation();
			}
			
			if( menuOpacity.length ) {
				if ( header.hasClass( 'fl-theme-builder-header-sticky' ) ) {
					if ( '0px' === menuOpacity.css( 'left' ) ) {
						menuOpacity.css( 'left', '-' + headerPos + 'px' );
					}
				}
				else {
					menuOpacity.css( 'left', '' );
				}
			}
		},

		/**
		 * Adjust sticky header width if BB Theme Boxed Layout is used.
		 *
		 * @since 1.4
		 * @access private
		 * @method _adjustStickyHeaderWidth
		 */
		_adjustStickyHeaderWidth: function () {
			if ( $('body').hasClass( 'fl-fixed-width' ) ) {
				var parentWidth = this.header.parent().width();

				// Better if this is set in the stylesheet file.
				if ( this.win.width() >= 992 ) {
					this.header.css({
						'margin': '0 auto',
						'max-width': parentWidth,
					});
				}
				else {
					this.header.css({
						'margin': '',
						'max-width': '',
					});
				}
			}
		},

		/**
		 * Adjust Sticky Header Height
		 *
		 * @since 1.4
		 * @access private
		 * @method _adjustHeaderHeight
		 */
		_adjustHeaderHeight: function () {
			var beforeHeader = this.header.prevAll('.fl-builder-content'),
				beforeHeaderHeight = 0,
				beforeHeaderFix = 0,
				headerHeight = Math.floor( this.header.outerHeight() ),
				bodyTopPadding = parseInt( $( 'body' ).css( 'padding-top' ) ),
				wpAdminBarHeight = 0,
				totalHeaderHeight = 0;
			
			if ( isNaN( bodyTopPadding ) ) {
				bodyTopPadding = 0;
			}

			if ( beforeHeader.length ) {
				$.each( beforeHeader, function() {
					beforeHeaderHeight += Math.floor( $(this).outerHeight() );
				});
				// Subtract this value from the header parent's top padding.
				beforeHeaderFix = 2;
			}

			if ( this.hasAdminBar && this.win.width() <= 600 ) {
				wpAdminBarHeight = Math.floor( $('#wpadminbar').outerHeight() );
			}

			totalHeaderHeight = Math.floor( beforeHeaderHeight + headerHeight);

			if ( headerHeight > 0 ) {
				var headerParent = this.header.parent(),
					headerParentTopPadding = 0;

				// If the header's parent container is the BODY tag ignore its top padding.
				if ( $( headerParent ).is('body') ) {
					headerParentTopPadding = Math.floor( headerHeight - wpAdminBarHeight );
				} else {
					headerParentTopPadding = Math.floor( headerHeight - bodyTopPadding - wpAdminBarHeight );
				}

				$( headerParent ).css( 'padding-top',  ( headerParentTopPadding - beforeHeaderFix ) + 'px' );
				
				this.header.css({
					'-webkit-transform': 'translate(0px, -' + totalHeaderHeight + 'px)',
					'-ms-transform': 'translate(0px, -' + totalHeaderHeight + 'px)',
					'transform': 'translate(0px, -' + totalHeaderHeight + 'px)'
				});

			}

		},

		/**
		 * Initializes shrink logic for a header.
		 *
		 * @since 1.0
		 * @access private
		 * @method _initShrink
		 */
		_initShrink: function( e )
		{
			if ( this.win.width() >= this.breakpointWidth ) {
				this.win.on( 'scroll.fl-theme-builder-header-shrink', $.proxy( this._doShrink, this ) );
				this._setImageMaxHeight();

				if ( this.win.scrollTop() > 0 ){
					this._doShrink();
				}

			} else {
				this.header.parent().css( 'padding-top', '0' );
				this.win.off( 'scroll.fl-theme-builder-header-shrink' );
				this._removeShrink();
				this._removeImageMaxHeight();
			}
		},

		/**
		 * Shrinks the header when the page is scrolled.
		 *
		 * @since 1.0
		 * @access private
		 * @method _doShrink
		 */
		_doShrink: function( e )
		{
			var winTop 			  = this.win.scrollTop(),
				headerTop 		  = this.header.data('original-top'),
				headerHeight 	  = this.header.data('original-height'),
				shrinkImageHeight = this.header.data('shrink-image-height'),
				windowSize   	  = this.win.width(),
				makeSticky   	  = this._makeWindowSticky( windowSize ),
				hasClass     	  = this.header.hasClass( 'fl-theme-builder-header-shrink' );

				
			if ( this.hasAdminBar ) {
				winTop += 32;
			}

			if ( makeSticky && ( winTop > headerTop + headerHeight ) ) {
				if ( ! hasClass ) {

					this.header.addClass( 'fl-theme-builder-header-shrink' );

					// Shrink images but don't include lightbox and menu images.
					this.header.find('img').each( function( i ) {
						var image           = $( this ),
							maxMegaMenu     = image.closest( '.max-mega-menu' ).length,
							imageInLightbox = image.closest( '.fl-button-lightbox-content' ).length,
							imageInNavMenu  = image.closest( 'li.menu-item' ).length;

						if ( ! ( imageInLightbox || imageInNavMenu || maxMegaMenu ) ) {
							image.css( 'max-height', shrinkImageHeight );
						}

					});
										
					this.header.find( '.fl-row-content-wrap' ).each( function() {

						var row = $( this );

						if ( parseInt( row.css( 'padding-bottom' ) ) > 5 ) {
							row.addClass( 'fl-theme-builder-header-shrink-row-bottom' );
						}

						if ( parseInt( row.css( 'padding-top' ) ) > 5 ) {
							row.addClass( 'fl-theme-builder-header-shrink-row-top' );
						}
					} );

					this.header.find( '.fl-module-content' ).each( function() {

						var module = $( this );

						if ( parseInt( module.css( 'margin-bottom' ) ) > 5 ) {
							module.addClass( 'fl-theme-builder-header-shrink-module-bottom' );
						}

						if ( parseInt( module.css( 'margin-top' ) ) > 5 ) {
							module.addClass( 'fl-theme-builder-header-shrink-module-top' );
						}
					} );
				}
			} else if (hasClass) {
				this.header.find( 'img' ).css( 'max-height', '' );
				this._removeShrink();
			}

			// Fixes Shrink header issue with BB Theme when window is scrolled then resized and back.
			if ( 'undefined' === typeof( e ) && $('body').hasClass( 'fl-fixed-width' ) ) {
				if ( ! this.overlay ) {
					this._adjustHeaderHeight();
				}
			}

		},

		/**
		 * Removes the header shrink effect.
		 *
		 * @since 1.0
		 * @access private
		 * @method _removeShrink
		 */
		_removeShrink: function()
		{
			var rows    = this.header.find( '.fl-row-content-wrap' ),
				modules = this.header.find( '.fl-module-content' );

			rows.removeClass( 'fl-theme-builder-header-shrink-row-bottom' );
			rows.removeClass( 'fl-theme-builder-header-shrink-row-top' );
			modules.removeClass( 'fl-theme-builder-header-shrink-module-bottom' );
			modules.removeClass( 'fl-theme-builder-header-shrink-module-top' );
			this.header.removeClass( 'fl-theme-builder-header-shrink' );
		},

		/**
		 * Adds max height to images in modules for smooth scrolling.
		 *
		 * @since 1.1.1
		 * @access private
		 * @method _setImageMaxHeight
		 */
		_setImageMaxHeight: function()
		{
			var head = $( 'head' ),
				stylesId = 'fl-header-styles-' + this.header.data( 'post-id' ),
				styles = '',
				images = this.header.find( '.fl-module-content img' );

			if ( $( '#' + stylesId ).length ) {
				return;
			}

			images.each( function( i ) {
				var image           = $( this ),
					height          = image.height(),
					node            = image.closest( '.fl-module' ).data( 'node' ),
					className       = 'fl-node-' + node + '-img-' + i,
					maxMegaMenu     = image.closest( '.max-mega-menu' ).length,
					imageInLightbox = image.closest( '.fl-button-lightbox-content' ).length,
					imageInNavMenu  = image.closest( 'li.menu-item' ).length;

				if ( ! ( imageInLightbox || imageInNavMenu || maxMegaMenu  ) ) {
					image.addClass( className );
					styles += '.' + className + ' { max-height: ' + ( height ? height : image[0].height )  + 'px }';
				}

			} );

			if ( '' !== styles ) {
				head.append( '<style id="' + stylesId + '">' + styles + '</style>' );
			}
		},

		/**
		 * Removes max height on images in modules for smooth scrolling.
		 *
		 * @since 1.1.1
		 * @access private
		 * @method _removeImageMaxHeight
		 */
		_removeImageMaxHeight: function()
		{
			$( '#fl-header-styles-' + this.header.data( 'post-id' ) ).remove();
		},
	};

	$( function() { FLThemeBuilderHeaderLayout.init(); } );

})(jQuery);
/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else this[name] = definition()
}('bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera|opr|opios/i.test(ua)) {
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      if( /touchpad\//i.test(ua) ){
        result.touchpad = t;
      }
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.msedge && (android || result.silk)) {
      result.android = t
    } else if (iosdevice) {
      result[iosdevice] = t
      result.ios = t
    } else if (mac) {
      result.mac = t
    } else if (xbox) {
      result.xbox = t
    } else if (windows) {
      result.windows = t
    } else if (linux) {
      result.linux = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

(function($){
  UABBTrigger = {

      /**
       * Trigger a hook.
       *
       * @since 1.1.0.3
       * @method triggerHook
       * @param {String} hook The hook to trigger.
       * @param {Array} args An array of args to pass to the hook.
       */
      triggerHook: function( hook, args )
      {
        $( 'body' ).trigger( 'uabb-trigger.' + hook, args );
      },
    
      /**
       * Add a hook.
       *
       * @since 1.1.0.3
       * @method addHook
       * @param {String} hook The hook to add.
       * @param {Function} callback A function to call when the hook is triggered.
       */
      addHook: function( hook, callback )
      {
        $( 'body' ).on( 'uabb-trigger.' + hook, callback );
      },
    
      /**
       * Remove a hook.
       *
       * @since 1.1.0.3
       * @method removeHook
       * @param {String} hook The hook to remove.
       * @param {Function} callback The callback function to remove.
       */
      removeHook: function( hook, callback )
      {
        $( 'body' ).off( 'uabb-trigger.' + hook, callback );
      },
  };
})(jQuery);

jQuery(document).ready(function( $ ) {

    if( typeof bowser !== 'undefined' && bowser !== null ) {

      var uabb_browser   = bowser.name,
          uabb_browser_v = bowser.version,
          uabb_browser_class = uabb_browser.replace(/\s+/g, '-').toLowerCase(),
          uabb_browser_v_class = uabb_browser_class + parseInt( uabb_browser_v );
      
      $('html').addClass(uabb_browser_class).addClass(uabb_browser_v_class);
      
    }

    $('.uabb-row-separator').parents('html').css('overflow-x', 'hidden');
});
jQuery(function($) {
	
		$(function() {
		$( '.fl-node-60dfd7baa975e .fl-photo-img' )
			.on( 'mouseenter', function( e ) {
				$( this ).data( 'title', $( this ).attr( 'title' ) ).removeAttr( 'title' );
			} )
			.on( 'mouseleave', function( e ){
				$( this ).attr( 'title', $( this ).data( 'title' ) ).data( 'title', null );
			} );
	});
		window._fl_string_to_slug_regex = 'a-zA-Z0-9';
});

(function($) {
	$(function() {

		// FitVids
		if ( 'undefined' !== typeof $.fn.fitVids ) {
			$('.fl-module-fl-post-content').fitVids();
		}

	});
})(jQuery);

/* Start Global Node Custom JS */

/* End Global Node Custom JS */


/* Start Layout Custom JS */
/* Fixes issue with login toggle scrolling the login box out of view */
document.querySelector('body').addEventListener('click', function(e){
  if(e.target.classList.contains('showlogin')) {
    document.querySelector('.woocommerce-form-login-toggle').scrollIntoView();
  }
});
/* End Layout Custom JS */

/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition()
  else if (typeof define == 'function' && define.amd) define(name, definition)
  else this[name] = definition()
}('bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , nexusMobile = /nexus\s*[0-6]\s*/i.test(ua)
      , nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua)
      , chromeos = /CrOS/.test(ua)
      , silk = /silk/i.test(ua)
      , sailfish = /sailfish/i.test(ua)
      , tizen = /tizen/i.test(ua)
      , webos = /(web|hpw)os/i.test(ua)
      , windowsphone = /windows phone/i.test(ua)
      , windows = !windowsphone && /windows/i.test(ua)
      , mac = !iosdevice && !silk && /macintosh/i.test(ua)
      , linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , xbox = /xbox/i.test(ua)
      , result

    if (/opera|opr|opios/i.test(ua)) {
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/coast/i.test(ua)) {
      result = {
        name: 'Opera Coast'
        , coast: t
        , version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/yabrowser/i.test(ua)) {
      result = {
        name: 'Yandex Browser'
      , yandexbrowser: t
      , version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/ucbrowser/i.test(ua)) {
      result = {
          name: 'UC Browser'
        , ucbrowser: t
        , version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/mxios/i.test(ua)) {
      result = {
        name: 'Maxthon'
        , maxthon: t
        , version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/epiphany/i.test(ua)) {
      result = {
        name: 'Epiphany'
        , epiphany: t
        , version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/puffin/i.test(ua)) {
      result = {
        name: 'Puffin'
        , puffin: t
        , version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      }
    }
    else if (/sleipnir/i.test(ua)) {
      result = {
        name: 'Sleipnir'
        , sleipnir: t
        , version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (/k-meleon/i.test(ua)) {
      result = {
        name: 'K-Meleon'
        , kMeleon: t
        , version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      }
    }
    else if (windowsphone) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    } else if (chromeos) {
      result = {
        name: 'Chrome'
      , chromeos: t
      , chromeBook: t
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    } else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/vivaldi/i.test(ua)) {
      result = {
        name: 'Vivaldi'
        , vivaldi: t
        , version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (sailfish) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel|fxios/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (silk) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/slimerjs/i.test(ua)) {
      result = {
        name: 'SlimerJS'
        , slimer: t
        , version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (webos) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      if( /touchpad\//i.test(ua) ){
        result.touchpad = t;
      }
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (tizen) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/qupzilla/i.test(ua)) {
      result = {
        name: 'QupZilla'
        , qupzilla: t
        , version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
      }
    }
    else if (/chromium/i.test(ua)) {
      result = {
        name: 'Chromium'
        , chromium: t
        , version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
        , chrome: t
        , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
        , version: versionIdentifier
      }
    }
    else if (/safari|applewebkit/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      }
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if(/googlebot/i.test(ua)) {
      result = {
        name: 'Googlebot'
      , googlebot: t
      , version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      if (/(apple)?webkit\/537\.36/i.test(ua)) {
        result.name = result.name || "Blink"
        result.blink = t
      } else {
        result.name = result.name || "Webkit"
        result.webkit = t
      }
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.msedge && (android || result.silk)) {
      result.android = t
    } else if (iosdevice) {
      result[iosdevice] = t
      result.ios = t
    } else if (mac) {
      result.mac = t
    } else if (xbox) {
      result.xbox = t
    } else if (windows) {
      result.windows = t
    } else if (linux) {
      result.linux = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (
         tablet
      || nexusTablet
      || iosdevice == 'ipad'
      || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
      || result.silk
    ) {
      result.tablet = t
    } else if (
         mobile
      || iosdevice == 'iphone'
      || iosdevice == 'ipod'
      || android
      || nexusMobile
      || result.blackberry
      || result.webos
      || result.bada
    ) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.yandexbrowser && result.version >= 15) ||
		    (result.vivaldi && result.version >= 1.0) ||
        (result.chrome && result.version >= 20) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        || (result.chromium && result.version >= 20)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        || (result.chromium && result.version < 20)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Get version precisions count
   *
   * @example
   *   getVersionPrecision("1.10.3") // 3
   *
   * @param  {string} version
   * @return {number}
   */
  function getVersionPrecision(version) {
    return version.split(".").length;
  }

  /**
   * Array::map polyfill
   *
   * @param  {Array} arr
   * @param  {Function} iterator
   * @return {Array}
   */
  function map(arr, iterator) {
    var result = [], i;
    if (Array.prototype.map) {
      return Array.prototype.map.call(arr, iterator);
    }
    for (i = 0; i < arr.length; i++) {
      result.push(iterator(arr[i]));
    }
    return result;
  }

  /**
   * Calculate browser version weight
   *
   * @example
   *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
   *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
   *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
   *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
   *
   * @param  {Array<String>} versions versions to compare
   * @return {Number} comparison result
   */
  function compareVersions(versions) {
    // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
    var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
    var chunks = map(versions, function (version) {
      var delta = precision - getVersionPrecision(version);

      // 2) "9" -> "9.0" (for precision = 2)
      version = version + new Array(delta + 1).join(".0");

      // 3) "9.0" -> ["000000000"", "000000009"]
      return map(version.split("."), function (chunk) {
        return new Array(20 - chunk.length).join("0") + chunk;
      }).reverse();
    });

    // iterate in reverse order by reversed chunks array
    while (--precision >= 0) {
      // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
      if (chunks[0][precision] > chunks[1][precision]) {
        return 1;
      }
      else if (chunks[0][precision] === chunks[1][precision]) {
        if (precision === 0) {
          // all version chunks are same
          return 0;
        }
      }
      else {
        return -1;
      }
    }
  }

  /**
   * Check if browser is unsupported
   *
   * @example
   *   bowser.isUnsupportedBrowser({
   *     msie: "10",
   *     firefox: "23",
   *     chrome: "29",
   *     safari: "5.1",
   *     opera: "16",
   *     phantom: "534"
   *   });
   *
   * @param  {Object}  minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function isUnsupportedBrowser(minVersions, strictMode, ua) {
    var _bowser = bowser;

    // make strictMode param optional with ua param usage
    if (typeof strictMode === 'string') {
      ua = strictMode;
      strictMode = void(0);
    }

    if (strictMode === void(0)) {
      strictMode = false;
    }
    if (ua) {
      _bowser = detect(ua);
    }

    var version = "" + _bowser.version;
    for (var browser in minVersions) {
      if (minVersions.hasOwnProperty(browser)) {
        if (_bowser[browser]) {
          // browser version and min supported version.
          return compareVersions([version, minVersions[browser]]) < 0;
        }
      }
    }

    return strictMode; // not found
  }

  /**
   * Check if browser is supported
   *
   * @param  {Object} minVersions map of minimal version to browser
   * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
   * @param  {String}  [ua] user agent string
   * @return {Boolean}
   */
  function check(minVersions, strictMode, ua) {
    return !isUnsupportedBrowser(minVersions, strictMode, ua);
  }

  bowser.isUnsupportedBrowser = isUnsupportedBrowser;
  bowser.compareVersions = compareVersions;
  bowser.check = check;

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

(function($){
  UABBTrigger = {

      /**
       * Trigger a hook.
       *
       * @since 1.1.0.3
       * @method triggerHook
       * @param {String} hook The hook to trigger.
       * @param {Array} args An array of args to pass to the hook.
       */
      triggerHook: function( hook, args )
      {
        $( 'body' ).trigger( 'uabb-trigger.' + hook, args );
      },
    
      /**
       * Add a hook.
       *
       * @since 1.1.0.3
       * @method addHook
       * @param {String} hook The hook to add.
       * @param {Function} callback A function to call when the hook is triggered.
       */
      addHook: function( hook, callback )
      {
        $( 'body' ).on( 'uabb-trigger.' + hook, callback );
      },
    
      /**
       * Remove a hook.
       *
       * @since 1.1.0.3
       * @method removeHook
       * @param {String} hook The hook to remove.
       * @param {Function} callback The callback function to remove.
       */
      removeHook: function( hook, callback )
      {
        $( 'body' ).off( 'uabb-trigger.' + hook, callback );
      },
  };
})(jQuery);

jQuery(document).ready(function( $ ) {

    if( typeof bowser !== 'undefined' && bowser !== null ) {

      var uabb_browser   = bowser.name,
          uabb_browser_v = bowser.version,
          uabb_browser_class = uabb_browser.replace(/\s+/g, '-').toLowerCase(),
          uabb_browser_v_class = uabb_browser_class + parseInt( uabb_browser_v );
      
      $('html').addClass(uabb_browser_class).addClass(uabb_browser_v_class);
      
    }

    $('.uabb-row-separator').parents('html').css('overflow-x', 'hidden');
});

(function($) {

	$(function() {

		new FLBuilderMenu({
			id: '60dfd5921a4ef',
			type: 'vertical',
			mobile: 'expanded',
			mobileBelowRow: false,
			mobileFlyout: true,
			breakPoints: {
				medium: 992,
				small: 768			},
			mobileBreakpoint: 'mobile',
			postId : '87',
			mobileStacked: true,
		});

	});

})(jQuery);

/* Start Global Node Custom JS */

/* End Global Node Custom JS */


/* Start Layout Custom JS */

/* End Layout Custom JS */

