export default class IPPhone{
  name: string;
  apiUrl: string;
  key: string;
  constructor(name: string, apiUrl: string) {
    this.name = name;
    this.apiUrl = apiUrl;
    this.key = ''
  }
}
