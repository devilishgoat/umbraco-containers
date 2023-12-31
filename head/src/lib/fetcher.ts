type Response = {
  status: number,
}

const config = {
  endpoint: process.env.NEXT_PUBLIC_CMS_ENDPOINT,
}
export type ErrorResponse = Response & {
    type: string,
    title: string,
    traceId: string,  
}

export type OkResponse = Response & {
  contentType: string,
  name: string,
  createDate: Date,
  updateDate: Date,
  route: {
    path: string,
    startItem: { id: string, path: string }
  },
  id: string,
  properties: {
    metadata_Title: string;
  }
}
export type Child = {
  contentType: string,
      name: string,
      createDate: Date,
      updateDate: Date,
      route: {},
      id: string,
      properties: {},
}
export type OkChildrenResponse = Response & {
  total:number,
  items: Child[]
}

export const getHomeContent =  async (): Promise<string> => {    
    const response = await fetch(`${config.endpoint}/umbraco/delivery/api/v1/content/item/home`)
    return await response.json();    
}

export async function getChildren<T extends OkChildrenResponse>(path:string) : Promise<T|ErrorResponse> {
  const url = `${config.endpoint}/umbraco/delivery/api/v1/content?fetch=children:${path}`;
  const response = await fetch(url);
  const result = await response.json();
  result.status = response.status;
  return result;
}
export async function getContent<T extends OkResponse>(path: string): Promise<T|ErrorResponse> {
    const response = await fetch(`${config.endpoint}/umbraco/delivery/api/v1/content/item/${path}`);
    const result = await response.json();
    result.status = response.status;
    return result;  
}

export const getAllPages = async (): Promise<string> => {
    const pages = await await fetch(`${config.endpoint}/umbraco/delivery/api/v1/content/item/?fetch=descendents`)
    return await pages.json();
}

