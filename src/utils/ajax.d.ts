declare namespace Ajax {
  // 请求接口数据
  export interface AjaxResponse {
    code: number;
    data: any;
    message?: string;
    msg?: string;
    success: boolean;
  }
  export interface MapResponse {
    status: string;
    count: string;
    info: string;
    infoCode: string;
    pois?: any[];
    districts?: any[];
    regeocode?: any;
  }
}
