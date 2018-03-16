const fs = require('fs');
const path = require('path');
const moment = require('moment');

class QuoteEngine {
  parse(filter) {
    const filterKeys = Object.keys(filter);
    const isNeed = this.needFilterJson(filterKeys);

    let validTimes = null;
    if (isNeed) validTimes = this.onFilterJson(filter);

    const result = [];
    const quotes = this.getJsonFile('quote.json');
    const {direction, instRate, bondRate} = filter;
    for (const quote of quotes) {
      const {time} = quote;
      if (validTimes !== null && validTimes.indexOf(time) === -1) continue;
      if (direction && typeof direction === 'string' && direction !== quote.direction) continue;
      if (this.isContinue(instRate, quote.instRate)) continue;
      if (this.isContinue(bondRate, quote.bondRate)) continue;
      quote.key = time;
      quote.time = moment(time).format('MM-DD hh:mm');
      result.push(quote);
    }

    return result;
  }

  onFilterJson(filter) {
    const times = [];
    const quotes = this.getJsonFile('filter.json');
    let {fTime, fCategory, fIndustry, fTerm} = filter;
    fTime = fTime ? parseInt(fTime, 10) : fTime;

    for (const quote of quotes) {
      if (fTime && typeof fTime === 'number' && fTime < quote.fTime) continue;
      if (this.isContinue(fCategory, quote.fCategory)) continue;
      if (this.isContinue(fIndustry, quote.fIndustry)) continue;
      if (this.isContinue(fTerm, quote.fTerm)) continue;
      times.push(quote.time);
    }

    return times;
  }

  isContinue(filterKey, matchedValue) {
    let isContinue = false;
    if (filterKey) {
      if (typeof filterKey === 'string' && filterKey !== matchedValue) {
        isContinue = true;
      }

      if (filterKey instanceof Array && filterKey.indexOf(matchedValue) === -1) {
        isContinue = true;
      }
    }
    return isContinue;
  }

  needFilterJson(filterKeys) {
    let isNeed = false;
    if (filterKeys.length === 0) return isNeed;

    for (const fKey of filterKeys) {
      if (['fTime', 'fCategory', 'fIndustry', 'fTerm'].indexOf(fKey) > -1) {
        isNeed = true;
        break;
      }
    }
    return isNeed;
  }

  getJsonFile(fileName) {
    const filePath = path.join(__dirname, '../data/' + fileName);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  createOne() {
    const idx = this.randomIndex(55);
    const quotes = this.getJsonFile('quote.json');
    const result = quotes[idx];
    const ts = Date.now();
    result.key = ts;
    result.time = moment(ts).format('MM-DD hh:mm');
    result.needFlash = true;
    return result;
  }

  randomIndex(divisor) {
    return parseInt(Math.random() * 100, 10) % divisor;
  }

  getMine() {
    const result = [];
    const quotes = this.getJsonFile('mine.json');

    for (const quote of quotes) {
      const {time} = quote;
      quote.key = time;
      quote.time = moment(time).format('MM-DD hh:mm');
      result.push(quote);
    }

    return result;
  }

  getBond() {
    return this.getJsonFile('bond.json');
  }

  getCurrent({code, exact}) {
    const quotes = this.getJsonFile('current.json');
    return this.getCurrentHistory(code, exact, quotes);
  }

  getHistory({code, exact}) {
    const quotes = this.getJsonFile('history.json');
    return this.getCurrentHistory(code, exact, quotes);
  }

  getCurrentHistory(code, exact, quotes) {
    let result = [];
    if (exact === 'true') {
      quotes.forEach(quote => {
        const {time} = quote;
        if (quote.code === code * 1) {
          quote.key = time;
          result.push(quote);
        }
      });
    } else if (exact === 'false') {
      result = quotes.splice(0, 4);
      result.forEach(elm => { elm.key = elm.time; });
    }
    return result;
  }

  getIntention() {
    const quotes = this.getJsonFile('intention.json');
    quotes.forEach(quote => {
      quote.key = quote.code;
    });
    return quotes;
  }

  getQuery({status}) {
    const result = [];
    const quotes = this.getJsonFile('query.json');
    for (const quote of quotes) {
      if (status !== 'all' && status !== quote.status) {
        continue;
      }
      quote.key = quote.code;
      result.push(quote);
    }
    return result;
  }
}

module.exports = QuoteEngine;
