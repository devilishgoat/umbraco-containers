import { Component } from "react"
import { pageComponents, pageComponent } from './renderer';
import { getComponent, getDataLoader } from './componentFactory'
export type PageComponent = {
    id: string;
    name: string;
    data?: any;
    children?: PageComponent[];
}

const mapPropsToConfig = (config:pageComponents[]): pageComponent[] => {
    const configWithProps : pageComponent[] = [];
    config.forEach(component => {
      if (component.areas.length > 0) {
          const itemToAdd : pageComponent = {
              id: component.content.id,
              name: component.content.contentType,            
          };
          component.areas.forEach(childComponent => {
              itemToAdd.childComponents?.push({
                  id: childComponent.content.id,
                  name: childComponent.content.contentType,
                  properties: childComponent.content.properties,            
              })
          });
          configWithProps.push(itemToAdd);
        }
        else {
          configWithProps.push({
            id: component.content.id,
            name: component.content.contentType,
            properties: component.content.properties,
          })
        }            
      });
  
      return configWithProps;
  };
  
export const buildPage = async (items:pageComponents[]): Promise<PageComponent[]> => {    
    const mappedComponents = mapPropsToConfig(items);
    const result : PageComponent[] = [];
    for(let i = 0; i < mappedComponents.length; i++){
        const data = await getDataLoader<any>(mappedComponents[i].name, mappedComponents[i].properties);
        const pageComponent: PageComponent = {
            id: mappedComponents[i].id,
            name: mappedComponents[i].name,
            data,
        }

        result.push(pageComponent)
    }
    console.log(result);
    return result;
}