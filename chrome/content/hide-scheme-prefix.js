/* as seen on
 * https://developer.mozilla.org/En/Code_snippets:Progress_Listeners#Example:_Notification_when_the_value_in_Address_Bar_changes
 */

var hsp_urlBarListener = {
  QueryInterface: function(aIID)
  {
   if (aIID.equals(Components.interfaces.nsIWebProgressListener) ||
       aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
       aIID.equals(Components.interfaces.nsISupports))
     return this;
   throw Components.results.NS_NOINTERFACE;
  },

  onLocationChange: function(aProgress, aRequest, aURI)
  {
    hsp.processNewURL(aURI);
  },

  onStateChange: function() {},
  onProgressChange: function() {},
  onStatusChange: function() {},
  onSecurityChange: function() {},
  onLinkIconAvailable: function() {}
};

var hsp = {
  oldURL: null,
  
  init: function() {
    // Listen for webpage loads
    gBrowser.addProgressListener(hsp_urlBarListener,
        Components.interfaces.nsIWebProgress.NOTIFY_STATE_DOCUMENT);
  },
  
  uninit: function() {
    gBrowser.removeProgressListener(hsp_urlBarListener);
  },

  processNewURL: function(aURI) {
    if (aURI.spec == this.oldURL)
      return;
    
    //alert('changing bar url.  uri spec: ' + aURI.spec);
    gURLBar.value = gURLBar.value.replace(/^https?:\/\//, '');
    this.oldURL = aURI.spec;
  }
};

window.addEventListener("load", function() {hsp.init()}, false);
window.addEventListener("unload", function() {hsp.uninit()}, false);
