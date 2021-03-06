Components.utils.import("resource://gre/modules/Services.jsm");
Components.utils.import("resource://gre/modules/Preferences.jsm");

var bttPrefs = {
  init: function() {
    Services.prefs.addObserver("extensions.btt.styleButton", this, false);
    Services.ww.registerNotification(this);

    this.observe(null, "nsPref:changed", "extensions.btt.styleButton");
  },

  observe: function (aSubject, aTopic, aData) {
    let bttToolbar = document.getElementById("before-tab-toolbar");
    if (aTopic == "nsPref:changed") {
      switch (aData) {
        case "extensions.btt.styleButton": {
          let attributeValue = Preferences.get("extensions.btt.styleButton", false) && "true";
          for (let win of fixIterator(Services.ww.getWindowEnumerator())) {
            document.documentElement.setAttribute("bttStyleButton", attributeValue);
          }
          break;
        }
      }
    } else if (aTopic == "domwindowopened") {
      let win = aSubject.QueryInterface(Components.interfaces.nsIDOMWindow);
      win.addEventListener("load", function() {
        let attributeValue = Preferences.get("extensions.btt.styleButton", false) && "true";
        document.documentElement.setAttribute("bttStyleButton", attributeValue);
      }, false);
    }
  }
}

this.bttPrefs.init();
