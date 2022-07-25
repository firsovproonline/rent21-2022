export default class IPPhone{
  name: string;
  apiUrl: string;
  key: string;
  editFlag: Boolean;
  constructor(name: string, apiUrl: string, editFlag: Boolean) {
    this.name = name;
    this.apiUrl = apiUrl;
    this.key = '';
    this.editFlag = editFlag;
  }
}
