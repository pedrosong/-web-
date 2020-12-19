export default function TodoStats(){
    return(
        <div id="todo-stats">
            <span className="todo-count">
                <span className="number">2</span>
                <span className="word">项待完成</span>
            </span>
            <span className="todo-clear">
                <a>Clear <span>1</span> 已完成事项</a>
            </span>
        </div>
        
    )
}