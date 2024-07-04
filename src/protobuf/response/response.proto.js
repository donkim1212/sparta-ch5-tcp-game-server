class ResponseData {
  constructor(handlerId, responseCode, data) {
    this.handlerId = handlerId;
    this.responseCode = responseCode;
    this.timestamp = Date.now();
    this.data = data;
  }
}

export default ResponseData;
