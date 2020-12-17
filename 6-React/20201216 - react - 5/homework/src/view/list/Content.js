import { useParams } from "react-router-dom";
import { createNewData } from './useAPI';
const limit = 5

export default function Content(){
    const {type="all",page="1"} = useParams()
    let start = (Number(page) - 1) * limit
    let newData = createNewData(type);
    let showedData = newData.filter((item,index) => {
        return index>=start && index<(start + limit)
    })

    return(
        <ul className="list">
            {showedData.map(item => <li key={item.id}> {item.title} </li>)}
        </ul>
    )
}