(() => {
    "use strict";
    class e {
        constructor({
            appName: e,
            appIconUrl: s,
            assetUrl: t,
            showErrorMessageForUnsupportedBrowsers: n,
            allowUserToCloseModal: i,
            maxModalDisplayCount: r
        }) {
            this.appName = e, this.appIconUrl = s, this.assetUrl = t, this.showErrorMessageForUnsupportedBrowsers = void 0 === n || n, this.allowUserToCloseModal = void 0 !== i && i, this.maxModalDisplayCount = void 0 === r ? -1 : r, this.closeEventListener = null
        }
        isStandAlone() {
            return window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches
        }
        isDeviceAndroid() {
            return navigator.userAgent.match(/Android/)
        }
        isDeviceIOS() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/)
        }
        isBrowserIOSSafari() {
            return this.isDeviceIOS() && window.navigator.userAgent.match(/Safari/) && !this.isBrowserIOSChrome() && !this.isBrowserIOSFirefox() && !this.isBrowserIOSInAppFacebook() && !this.isBrowserIOSInAppLinkedin() && !this.isBrowserIOSInAppInstagram() && !this.isBrowserIOSInAppThreads() && !this.isBrowserIOSInAppTwitter()
        }
        isBrowserIOSChrome() {
            return this.isDeviceIOS() && navigator.userAgent.match(/CriOS/)
        }
        isBrowserIOSFirefox() {
            return this.isDeviceIOS() && window.navigator.userAgent.match(/FxiOS/)
        }
        isBrowserIOSInAppFacebook() {
            return !!this.isDeviceIOS() && window.navigator.userAgent.match(/FBAN|FBAV/)
        }
        isBrowserIOSInAppLinkedin() {
            return !!this.isDeviceIOS() && window.navigator.userAgent.match(/LinkedInApp/)
        }
        isBrowserIOSInAppInstagram() {
            return !(!this.isDeviceIOS() || !window.document.referrer.match("//l.instagram.com/") && !(window.navigator.userAgent.match(/iPhone/) && window.screen.height && window.outerHeight && window.outerHeight < window.screen.height))
        }
        isBrowserIOSInAppThreads() {
            return this.isBrowserIOSInAppInstagram()
        }
        isBrowserIOSInAppTwitter() {
            return !!this.isDeviceIOS() && window.document.referrer.match("//t.co/")
        }
        isBrowserAndroidChrome() {
            return this.isDeviceAndroid() && window.navigator.userAgent.match(/Chrome/) && !this.isBrowserAndroidFacebook() && !this.isBrowserAndroidSamsung() && !this.isBrowserAndroidFirefox()
        }
        isBrowserAndroidFacebook() {
            return this.isDeviceAndroid() && window.navigator.userAgent.match(/FBAN|FBAV/)
        }
        isBrowserAndroidSamsung() {
            return this.isDeviceAndroid() && window.navigator.userAgent.match(/SamsungBrowser/)
        }
        isBrowserAndroidFirefox() {
            return this.isDeviceAndroid() && window.navigator.userAgent.match(/Firefox/)
        }
        show() {
            var s;
            if (this.isStandAlone()) return new e.ReturnObj({
                isStandAlone: !0,
                canBeStandAlone: !0,
                device: this.isDeviceIOS() ? "IOS" : "ANDROID"
            });
            if (this._hasReachedMaxModalDisplayCount()) return new e.ReturnObj({
                isStandAlone: null,
                canBeStandAlone: null,
                device: this.isDeviceIOS() ? "IOS" : "ANDROID"
            });
            {
                this._incrModalDisplayCount();
                const t = document.createElement("div");
                t.classList.add("adhs-container"), t.style.height = document.body.clientHeight + "px", t.style.width = window.innerWidth + "px", this.isDeviceIOS() ? this.isBrowserIOSSafari() ? (s = new e.ReturnObj({
                    isStandAlone: !1,
                    canBeStandAlone: !0,
                    device: "IOS"
                }), this._genIOSSafari(t)) : this.isBrowserIOSChrome() ? (s = new e.ReturnObj({
                    isStandAlone: !1,
                    canBeStandAlone: !0,
                    device: "IOS"
                }), this._genIOSChrome(t)) : this.isBrowserIOSInAppFacebook() || this.isBrowserIOSInAppLinkedin() ? (s = new e.ReturnObj({
                    isStandAlone: !1,
                    canBeStandAlone: !1,
                    device: "IOS"
                }), this._genIOSInAppBrowserOpenInSystemBrowser(t)) : this.isBrowserIOSInAppInstagram() || this.isBrowserIOSInAppThreads() || this.isBrowserIOSInAppTwitter() ? (s = new e.ReturnObj({
                    isStandAlone: !1,
                    canBeStandAlone: !1,
                    device: "IOS"
                }), this._genIOSInAppBrowserOpenInSafariBrowser(t)) : (s = new e.ReturnObj({
                    isStandAlone: !1,
                    canBeStandAlone: !1,
                    device: "IOS"
                }), this.showErrorMessageForUnsupportedBrowsers && this._genErrorMessage(t, "Abra este site com o aplicativo Safari ou Chrome.", "Adicionar à tela inicial só é compatível com Safari ou Chrome no IOS.")) : this.isDeviceAndroid() ? this.isBrowserAndroidChrome() ? (s = new e.ReturnObj({
                    isStandAlone: !1,
                    canBeStandAlone: !0,
                    device: "ANDROID"
                }), this._genAndroidChrome(t)) : this.isBrowserAndroidFacebook() ? (s = new e.ReturnObj({
                    isStandAlone: !1,
                    canBeStandAlone: !1,
                    device: "ANDROID"
                }), this._genIOSInAppBrowserOpenInSystemBrowser(t)) : (s = new e.ReturnObj({
                    isStandAlone: !1,
                    canBeStandAlone: !1,
                    device: "ANDROID"
                }), this.showErrorMessageForUnsupportedBrowsers && this._genErrorMessage(t, "Abra este site com o aplicativo Chrome.", "A adição à tela inicial só é compatível com o Chrome no Android.")) : (s = new e.ReturnObj({
                    isStandAlone: !1,
                    canBeStandAlone: !1,
                    device: ""
                }), this.showErrorMessageForUnsupportedBrowsers && this._genErrorMessage(t, "Por favor, abra este site em um dispositivo móvel.", "Atualmente, a instalação na tela inicial é compatível apenas com IOS e Android.")), document.body.appendChild(t), this._registerCloseListener(), setTimeout((() => {
                    t.classList.add("visible")
                }), 50)
            }
            return s
        }
        close() {
            const e = document.querySelector(".adhs-container");
            e && (e.classList.remove("visible"), setTimeout((() => {
                e.remove(), this.closeEventListener && (window.removeEventListener("touchstart", this.closeEventListener), this.closeEventListener = null)
            }), 300))
        }
        _genLogo() {
            return '\n      <div class="adhs-logo">\n        <img src="' + this.appIconUrl + '" alt="logo" />\n      </div>\n      '
        }
        _genErrorMessage(e, s, t) {
            var n = this._genLogo() + this._genModalStart() + '<div class="adhs-error-title">' + s + '</div><div class="adhs-error-body">' + t + '</div><button class="adhs-error-copy-link-button" onclick="AddToHomeScreen.copyToClipboard();" ontouchstart="AddToHomeScreen.copyToClipboard();">Copiar link do site para a área de transferência</button>' + this._genModalEnd();
            e.innerHTML = n
        }
        _genTitleWithMessage(e) {
            return '\n      <div class="adhs-title">' + e + "</div>\n      "
        }
        _genTitle() {
            return this._genTitleWithMessage("Instale nosso app " + this.appName + ".")
        }
        _genModalStart() {
            return '<div class="adhs-modal">'
        }
        _genModalEnd() {
            return "</div>"
        }
        _genListStart() {
            return '<div class="adhs-list">'
        }
        _genListEnd() {
            return "</div>"
        }
        _genListItem(e, s) {
            return '\n    <div class="adhs-list-item">\n      <div class="adhs-number-container">\n        <div class="adhs-circle">\n          <div class="adhs-number">' + e + '</div>\n        </div>\n      </div>\n      <div class="adhs-instruction">' + s + "</div>\n    </div>"
        }
        _genAssetUrl(e) {
            return this.assetUrl + e
        }
        _genIOSSafari(e) {
            var s = this._genLogo() + this._genModalStart() + this._genTitle() + this._genListStart() + this._genListItem("1", 'Clique em <img class="adhs-ios-safari-sharing-api-button" src="' + this._genAssetUrl("ios-safari-sharing-api-button.svg") + '"/> botão abaixo.') + this._genListItem("2", 'Toque em <img class="adhs-ios-safari-add-to-home-screen-button" src="' + this._genAssetUrl("http://app.tecnotriks.com.br/wp-content/uploads/2023/11/icon-osc.svg") + '"/> no menu que aparece. <span class="adhs-emphasis"><br>Pode ser necessário rolar para baixo para encontrar este item de menu.</span>') + this._genListItem("3", 'Toque em Adicionar.') + this._genListEnd() + this._genModalEnd() + '<div class="adhs-ios-safari-bouncing-arrow-container">\n      <img src="' + this._genAssetUrl("ios-safari-bouncing-arrow.svg") + '" alt="arrow" />\n    </div>';
            e.innerHTML = s, e.classList.add("adhs-ios"), e.classList.add("adhs-safari")
        }
        _genIOSChrome(e) {
            var s = this._genLogo() + this._genModalStart() + this._genTitle() + this._genListStart() + this._genListItem("1", 'Clique em <img class="adhs-ios-chrome-more-button" src="' + this._genAssetUrl("ios-chrome-more-button.svg") + '"/> botão no canto superior direito.') + this._genListItem("2", 'Toque em <img class="adhs-ios-chrome-add-to-home-screen-button" src="' + this._genAssetUrl("ios-chrome-add-to-home-screen-button.svg") + '"/> no menu que aparece. <span class="adhs-emphasis"><br>Pode ser necessário rolar para baixo para encontrar este item de menu.</span></b>') + this._genListItem("3", 'Toque em Adicionar.') + this._genListEnd() + this._genModalEnd() + '<div class="adhs-ios-chrome-bouncing-arrow-container">\n      <img src="' + this._genAssetUrl("ios-chrome-bouncing-arrow.svg") + '" alt="arrow" />\n    </div>';
            e.innerHTML = s, e.classList.add("adhs-ios"), e.classList.add("adhs-chrome")
        }
        _genIOSInAppBrowserOpenInSystemBrowser(e) {
            var s = this._genLogo() + this._genModalStart() + this._genTitle() + this._genListStart() + this._genListItem("1", 'Clique em <img class="adhs-more-button" src="' + this._genAssetUrl("generic-more-button.svg") + '"/> button above.') + this._genListItem("2", 'Tap <span class="adhs-emphasis">Abra no navegador</span>  .') + this._genListEnd() + this._genModalEnd() + '<div class="adhs-inappbrowser-openinsystembrowser-bouncing-arrow-container">\n      <img src="' + this._genAssetUrl("generic-vertical-up-bouncing-arrow.svg") + '" alt="arrow" />\n    </div>';
            e.innerHTML = s, e.classList.add("adhs-ios"), e.classList.add("adhs-inappbrowser-openinsystembrowser")
        }
        _genIOSInAppBrowserOpenInSafariBrowser(e) {
            var s = this._genLogo() + this._genModalStart() + this._genTitle() + this._genListStart() + this._genListItem("1", 'Clique em <img class="adhs-more-button" src="' + this._genAssetUrl("openinsafari-button.png") + '"/> botão abaixo para abrir o navegador do sistema.') + this._genListEnd() + this._genModalEnd() + '<div class="adhs-inappbrowser-openinsafari-bouncing-arrow-container">\n      <img src="' + this._genAssetUrl("generic-vertical-down-bouncing-arrow.svg") + '" alt="arrow" />\n    </div>';
            e.innerHTML = s, e.classList.add("adhs-ios"), e.classList.add("adhs-inappbrowser-openinsafari")
        }
        _genAndroidChrome(e) {
            var s = this._genLogo() + this._genModalStart() + this._genTitle() + this._genListStart() + this._genListItem("1", 'Clique em <img class="adhs-android-chrome-more-button" src="' + this._genAssetUrl("android-chrome-more-button.svg") + '"/> botão na barra do navegador.') + this._genListItem("2", 'Tap <img class="adhs-android-chrome-add-to-homescreen-button" src="' + this._genAssetUrl("android-chrome-add-to-home-screen-button.svg") + '"/>or <img class="adhs-android-chrome-install-app" src="' + this._genAssetUrl("android-chrome-install-app.svg") + '"/> .') + this._genListItem("3", 'Toque em Adicionar.') + this._genListEnd() + this._genModalEnd() + '<div class="adhs-android-chrome-bouncing-arrow-container">\n      <img src="' + this._genAssetUrl("android-chrome-bouncing-arrow.svg") + '" alt="arrow" />\n    </div>';
            e.innerHTML = s, e.classList.add("adhs-android"), e.classList.add("adhs-chrome")
        }
        _registerCloseListener() {
            if (this.allowUserToCloseModal) {
                var e = this;
                this.closeEventListener = function(s) {
                    document.getElementsByClassName("adhs-container")[0].getElementsByClassName("adhs-modal")[0].contains(s.target) || e.close()
                }, window.addEventListener("touchstart", this.closeEventListener)
            }
        }
        clearModalDisplayCount() {
            this._isEnabledModalDisplayCount() && window.localStorage.removeItem("adhs-modal-display-count")
        }
        _isEnabledModalDisplayCount() {
            return "number" == typeof this.maxModalDisplayCount && this.maxModalDisplayCount >= 0 && window.localStorage
        }
        _hasReachedMaxModalDisplayCount() {
            return !!this._isEnabledModalDisplayCount() && this._getModalDisplayCount() >= this.maxModalDisplayCount
        }
        _incrModalDisplayCount() {
            if (!this._isEnabledModalDisplayCount()) return !1;
            var e = this._getModalDisplayCount();
            return e++, window.localStorage.setItem("adhs-modal-display-count", e), !0
        }
        _getModalDisplayCount() {
            var e = window.localStorage.getItem("adhs-modal-display-count");
            return null === e ? (e = 0, window.localStorage.setItem("adhs-modal-display-count", e)) : e = parseInt(e), e
        }
        static copyToClipboard() {
            const e = window.location.href;
            try {
                window.navigator.clipboard.writeText(e), document.getElementsByClassName("adhs-error-copy-link-button")[0].innerHTML = "Link Copied to Clipboard!"
            } catch (e) {
                document.getElementsByClassName("adhs-error-copy-link-button")[0].innerHTML = 'Falha ao copiar para a área de transferência! (Try Again from "https://" Link)'
            }
        }
    }
    e.ReturnObj = class {
        constructor({
            isStandAlone: e,
            canBeStandAlone: s,
            device: t
        }) {
            this.isStandAlone = e, this.canBeStandAlone = s, this.device = t
        }
    };
    const s = e;
    window.AddToHomeScreen = s, window.AddToHomescreen = {}.default
})();
