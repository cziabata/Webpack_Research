/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./analitics.ts ***!
  \**********************/
var getAnalitics = function getAnalitics() {
  var counter = 0;
  var isDestroyed = false;

  var listener = function listener() {
    return counter++;
  };

  document.addEventListener("click", listener);
  return {
    destroy: function destroy() {
      document.removeEventListener("click", listener);
      isDestroyed = true;
    },
    getClicks: function getClicks() {
      if (isDestroyed) {
        return "Analitics is destroyed";
      }

      return counter;
    }
  };
};

window["analitics"] = getAnalitics();
/******/ })()
;
//# sourceMappingURL=analitics.js.map