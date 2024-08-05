/* global browser */
/**
 * This isn't actually where the magic happens, the magic's in the rules JSON :P
 */

/**
 * This is only used for debugging (to see if the rules are working).
browser.declarativeNetRequest.onRuleMatchedDebug.addListener(function (o) {
  console.log('rule matched:', o);
}); 
*/

 
/**
 * Turn the extension on.
 */

const turnOn = function turnExtensionOn() {

  browser.declarativeNetRequest.updateEnabledRulesets({enableRulesetIds: ["meme_rules"]});
	
  browser.action.setIcon({
    path: {
      19: '/icon128_on.png',
      38: '/icon128_on.png',
    },
  });

  browser.storage.local.set({'cors_reject': 'true'});
};

/**
 * Turn the extension off.
 */
const turnOff = function turnExtensionOff() {
  browser.declarativeNetRequest.updateEnabledRulesets({disableRulesetIds: ["meme_rules"]});  
  browser.action.setIcon({
    path: {
      19: '/icon128_off.png',
      38: '/icon128_off.png',
    },
  });
  browser.storage.local.set({'cors_reject': 'false'});
};

/**
 * Turn on the extension on install and startup.
 */
browser.runtime.onInstalled.addListener(() => {
  turnOn();
});
browser.runtime.onStartup.addListener(() => {
  turnOn();
});


/**
 * Toggle the extension when the toolbar icon is clicked.
 */
browser.action.onClicked.addListener(() => {
  browser.storage.local.get(["cors_reject"]).then((result) => {	
  if (result.cors_reject === 'true') {
    turnOff();
  } else {
    turnOn();
  }

})
});

/**
 * Handle message asking if enabled.
 */
browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.text === 'isOn') {
  browser.storage.local.get(["cors_reject"]).then((result) => {	
	  
    sendResponse(result.cors_reject);
  })
  }
});
