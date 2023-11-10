import {ErrorResponse, getChildren, OkChildrenResponse, Child} from '../../lib/fetcher'

type Props = {
    data:{
        items: Child[];
    }
}

type CmsValues = {
    newsList_News: {
        contentType: string,
        name: string,
        createDate: Date,
        updateDate: Date,
        route: { 
            path: string, 
        },
        id: string,
      }
}
export const getData = async (data:CmsValues): Promise<OkChildrenResponse|ErrorResponse> => {
    return await getChildren(data.newsList_News.route.path);
}

const NewsList = (data:Props) => {    
    return (
        <ul>
            {data.data.items.map((i) => (            
                <li key={i.id}>{i.name}</li>
            )
                )}
        </ul>)
}

export default NewsList;