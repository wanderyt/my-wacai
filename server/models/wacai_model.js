const _ = require('underscore'),
  request = require('request'),
  DETAILS_HOST = 'www.wacai.com',
  DETAILS_PATH = `/biz/ledger_list.action`;

class WacaiModel {
  constructor(props = {}) {
    this.finData = [];
    this.sessionId = props.sessionId;
  }

  formatCurrentDate() {
    let current = new Date(),
      month = current.getMonth() > 8 ? String(current.getMonth() + 1) : 0 + String(current.getMonth() + 1),
      day = current.getDate() > 9 ? current.getDate() : 0 + String(current.getDate());
    return `${current.getFullYear()}-${month}-${day}`;
  }

  fetchData(props = {}, options) {
    let postData = {
      'cond.date': props.startDate || '2015-07-01',
      'cond.date_end': props.endDate || this.formatCurrentDate(),
      'cond.withDaySum': true,
      'pageInfo.pageIndex': props.pageIndex || 1,
      'cond.reimbursePrefer': 0
    };

    console.log(`loadData params: ${postData['cond.date']} - ${postData['cond.date_end']}`);

    let self = this;
    let dataPromise = new Promise((resolve, reject) => {
      console.log(`WacaiModel.fetchData cookies: ${options.cookies}`);
      request({
        url: `https://${DETAILS_HOST}:443${DETAILS_PATH}?timsmp=${new Date().getTime()}`,
        method: 'POST',
        body: self.formatPostFormData(postData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(self.formatPostFormData(postData)),
          // 'Cookie': `wctk=${self.sessionId}`
          'Cookie': options.cookies
        }
      }, (error, response, body) => {
        if (response) {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject({
              error: body
            });
          }
        } else {
          reject({
            error
          });
        }
      });
    });

    return dataPromise;
  }

  formatPostFormData(data = {}) {
    return _.map(data, (value, key) => `${key}=${value}`).join('&');
  }

  appendData(data = {}) {
    let fullData = data.ledgers;
    let shortenedData = fullData.map(({ comment, typeTitle, money, date, id }) => {
      return {
        comment, typeTitle, money, date, id
      }
    })
    this.finData = this.finData.concat(shortenedData);
  }
}

module.exports = {
  WacaiModel: WacaiModel
};