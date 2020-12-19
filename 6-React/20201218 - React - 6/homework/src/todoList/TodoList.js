export default function TodoList(){
  return (
    <ul id="todo-list">
      <li className="">
        <div className="todo done">
          <div className="display">
            <input className="check" type="checkbox"></input>
            <div className="todo-content">今晚上王者</div>
            <span className="todo-destroy"></span>
          </div>
          <div className="edit"><input className="todo-input" type="text" value="今晚上王者"></input></div>
        </div>
      </li>
      <li class="">
          <div class="todo ">
            <div class="display"><input class="check" type="checkbox"></input>
              <div class="todo-content">给学员留一个大惊喜</div><span class="todo-destroy"></span>
            </div>
            <div class="edit"><input class="todo-input" type="text" value="给学员留一个大惊喜"></input></div>
          </div>
        </li>
        <li class="">
          <div class="todo ">
            <div class="display"><input class="check" type="checkbox"></input>
              <div class="todo-content">给学员留一个大惊吓</div><span class="todo-destroy"></span>
            </div>
            <div class="edit"><input class="todo-input" type="text" value="给学员留一个大惊吓"></input></div>
          </div>
        </li>
    </ul>
    )
}