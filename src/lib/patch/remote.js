// http://a.amap.com/jsapi_demos/static/remogeo/remogeo.js

function RemoGeoLocation() {
  this._remoteSvrUrl = 'https://webapi.amap.com/html/geolocate.html';
  this._callbackList = [];
  this._seqBase = 1;
  this._frameReady = 0;
  this._watchIdMap = {};
}

RemoGeoLocation.prototype = {
  _getSeq: function() {
    return this._seqBase++;
  },
  _onRrameReady: function(callback) {
    if (this._frameReady === 0) {
      if (!this._frameReadyList) {
        this._frameReadyList = [];
      }
      this._frameReadyList.push(callback);
      this._prepareIframe();
      return;
    }

    callback.call(this);
  },
  _prepareIframe: function() {

    if (this._iframeWin) {
      return;
    }

    var ifrm = document.createElement('iframe');

    ifrm.src = this._remoteSvrUrl +
          (this._remoteSvrUrl.indexOf('?') > 0 ? '&' : '?');

    ifrm.width = '0px';
    ifrm.height = '0px';
    ifrm.style.position = 'absolute';
    ifrm.style.display = 'none';
    ifrm.allow = 'geolocation';

    var self = this;

    var timeoutId = setTimeout(function() {

      self._frameReady = false;

      self._callbackFrameReadyList();

    }, 5000);

    ifrm.onload = function() {

      clearTimeout(timeoutId);

      self._frameReady = true;

      self._callbackFrameReadyList();

      ifrm.onload = null;
    };

    document.body.appendChild(ifrm);

    this._iframeWin = ifrm.contentWindow;

    window.addEventListener('message', function(e) {

      if (self._remoteSvrUrl.indexOf(e['origin']) !== 0) {
        return;
      }

      self._handleRemoteMsg(e['data']);

    }, false);
  },
  _callbackFrameReadyList: function() {

    if (this._frameReadyList) {

      var list = this._frameReadyList;
      this._frameReadyList = null;

      for (var i = 0, len = list.length; i < len; i++) {
        list[i].call(this, this._frameReady);
      }
    }
  },
  _pickCallback: function(seqNum, keepInList) {

    var callbackList = this._callbackList;

    for (var i = 0, len = callbackList.length; i < len; i++) {

      var cbkInfo = callbackList[i];

      if (seqNum === cbkInfo.seq) {

        if (!keepInList) {
          callbackList.splice(i, 1);
        }

        return cbkInfo;
      }
    }
  },
  _handleRemoteMsg: function(msg) {

    var seqNum = msg['seq'];

    var cbkInfo = this._pickCallback(seqNum, !!msg['notify']);

    if (cbkInfo) {

      cbkInfo.cbk.call(null, msg['error'], msg['result']);

    } else {

      console.warn('Receive remote msg: ', msg);
    }

  },
  _postMessage: function(cmd, args, callback, seq) {

    this._prepareIframe();

    var msg = {
      'cmd': cmd,
      'args': args,
      'seq': seq || this._getSeq()
    };

    this._callbackList.push({
      cbk: callback,
      seq: msg['seq']
    });

    this._onRrameReady(function() {

      if (this._frameReady === true) {

        try {

          this._iframeWin.postMessage(msg, '*');

        } catch (e) {

          this._pickCallback(msg['seq']);

          callback(e);
        }
      } else {

        this._pickCallback(msg['seq']);

        callback({
          'message': 'iFrame load failed!'
        });
      }
    });
  },
  'getCurrentPosition': function(succHandler, errHandler, options) {

    this._postMessage('getCurrentPosition', [options], function(err, result) {

      if (err) {
        if (errHandler) {
          errHandler(err);
        }
        return;
      }
      if (succHandler) {
        succHandler(result);
      }
    });
  },
  'watchPosition': function(succHandler, errHandler, options) {

    var watchKey = 'wk' + this._getSeq();
    var cmdSeq = this._getSeq();

    this._watchIdMap[watchKey] = {
      stat: 0,
      seq: cmdSeq
    };

    var self = this;

    this._postMessage('watchPosition', [options], function(err, result) {

      var id = null;

      if (result) {
        id = result['id'];
      }

      var watchInfo = self._watchIdMap[watchKey];

      watchInfo.id = id;
      watchInfo.stat = 1;

      if (watchInfo.callbackList) {

        var list = watchInfo.callbackList;
        watchInfo.callbackList = null;

        for (var i = 0, len = list.length; i < len; i++) {
          list[i].call(self, id);
        }
      }

      if (err) {
        if (errHandler) {
          errHandler(err);
        }
        return;
      }

      if (succHandler) {
        succHandler(result['pos']);
      }

    }, cmdSeq);

    return watchKey;
  },
  'clearWatch': function(watchKey, callback) {

    if (!this._watchIdMap[watchKey]) {
      callback('Id not exists: ' + watchKey);
      return;
    }

    var watchInfo = this._watchIdMap[watchKey];

    var self = this;

    function clearId(id) {

      self._postMessage('clearWatch', [id], function(err, result) {

        if (!err) {

          self._pickCallback(watchInfo.seq);

          delete self._watchIdMap[watchKey];
        }

        if (callback) {
          callback(err, result);
        }

      });
    }

    if (watchInfo.stat < 1) {

      if (!watchInfo.callbackList) {
        watchInfo.callbackList = [];
      }

      watchInfo.callbackList.push(function(id) {
        clearId(id);
      });

    } else {
      clearId(watchInfo.id);
    }
  }
};

export default RemoGeoLocation;
