import NewsList, {getData } from '../components/news/NewsList'
const components = new Map<string, any>();
components.set("news", NewsList)

export const getComponent = (componentName:string): any => {
    return components.get(componentName);
}

const dataLoaders = new Map<string, (props:any) => any>();

dataLoaders.set("news", (url:string) => getData(url))

export const getDataLoader = <T>(componentName: string, data:T): any | null =>  {
    const result =  dataLoaders.get(componentName);
    if (result)
    {
        return result(data);
    }

    return null;
}

