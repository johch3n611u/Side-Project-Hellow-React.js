//參考 : https://codepen.io/gaearon/pen/LzWZvb?editors=0010
//參考 : https://github.com/johch3n611u/Side-Project-Hellow-Vue.js/blob/master/Todo-List_Demo/index.html#L50

class TodoListHead extends React.Component {
    render() {
        return (
            <div className="todo-list-head title-bar">
                <div className="todo-list-heading title-bar-text">React.js TodoList Demo：今日代辦項目</div>
            </div>
        );
    }
}

class TodoListDisplaySort extends React.Component {
    render() {

        const FackData = this.props.FackData;
        const allCount = FackData.todos.length;
        const completedCount = Object.keys(FackData.todos).filter(function (value) { return FackData.todos[value].isCompleted }).length;
        const incompleteCount = Object.keys(FackData.todos).filter(function (value) { return !FackData.todos[value].isCompleted }).length;

        return (
            <div>
                <button >全部 ( {allCount}} )</button>
                <button >已完成 ( {completedCount} )</button>
                <button >未完成 ( {incompleteCount} )</button>
            </div>
        );
    }
}

class TodoListNewTodo extends React.Component {
    constructor(props) {
        super(props);
        // 為了讓 `this` 能在 callback 中被使用，這裡的綁定是必要的：
        this.handleAddtodo = this.handleAddtodo.bind(this);
    }
    handleAddtodo(e) {
        if (e.key === 'Enter') {
            this.props.addTodo(e.target.value);
        }
    }
    render() {
        return (
            <div className="todo-list-new-todo">
                <label >增加新項目：</label>
                <input className="new-todo" id="new-todo" placeholder="例如：澆花。Enter ↲ 鍵入" onKeyPress={this.handleAddtodo} />
            </div>
        );
    }
}

class TodoListTodos extends React.Component {
    constructor(props) {
        super(props);
        // 為了讓 `this` 能在 callback 中被使用，這裡的綁定是必要的：
        this.handleDeleteli = this.handleDeleteli.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleEditmode = this.handleEditmode.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleDeleteli(e) {
        this.props.onDeleteli(e.target.id);
    }

    handleCheckbox(e) {
        this.props.onCheckbox(e.target.id);
    }

    handleEditmode(e) {
        this.props.onEditmode(e.target.id);
    }
    // https://stackoverflow.com/questions/27827234/how-to-handle-the-onkeypress-event-in-reactjs
    handleEdit(e) {
        // console.log('key' + e.key);
        // console.log('key' + e.target.id);
        if (e.key === 'Enter') {
            this.props.onEdit(e.target.id, e.target.value);
        }
    }

    render() {
        // https://zh-hant.reactjs.org/docs/components-and-props.html
        // https://zh-hant.reactjs.org/docs/lists-and-keys.html
        // map() 方法會建立一個新的陣列，其內容為原陣列的每一個元素經由回呼函式運算後所回傳的結果之集合。
        // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        // https://zh-hant.reactjs.org/docs/thinking-in-react.html#step-2-build-a-static-version-in-react

        const liItem = [];
        var TagMake = "";
        var ClassMake = "";

        this.props.FackData.todos.forEach(FackData => {
            // https://medium.com/@realdennis/array-%E5%8E%9F%E5%9E%8B%E7%9A%84-foreach-%E6%9C%89%E5%A4%9A%E5%A5%BD%E7%94%A8-%E5%AD%B8%E6%9C%83%E9%AB%98%E9%9A%8E%E5%87%BD%E6%95%B8%E4%B9%8B%E5%BE%8C%E9%83%BD%E4%B8%8D%E6%83%B3%E5%AF%AB-javascript-%E4%BB%A5%E5%A4%96%E7%9A%84%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80%E4%BA%86-dc4b594a045a
            // console.log(FackData.isCompleted);
            if (FackData.isEdit == false) {

                if (FackData.isCompleted == true) {
                    ClassMake = 'completed';
                } else {
                    ClassMake = '';
                }

                TagMake =
                    <div>
                        <label className={ClassMake}>
                            <input
                                id={FackData.id}
                                className="chkbox"
                                type="checkbox"
                                defaultChecked={FackData.isCompleted}
                                onClick={this.handleCheckbox} />
                            {FackData.title}
                        </label>
                        <span className="todo-list-todos-controller">
                            <button id={FackData.id} onClick={this.handleEditmode}>編輯</button>
                            <button id={FackData.id} onClick={this.handleDeleteli}>刪除</button>
                        </span >
                    </div>;
            } else {
                TagMake =
                    <div>
                        {/* https://stackoverflow.com/questions/27827234/how-to-handle-the-onkeypress-event-in-reactjs */}
                        {/* https://stackoverflow.com/questions/43556212/failed-form-proptype-you-provided-a-value-prop-to-a-form-field-without-an-on */}
                        <input id={FackData.id} type="text" defaultValue={FackData.title} onKeyPress={this.handleEdit} />
                        <span className="todo-list-todos-controller">
                            <button id={FackData.id} onClick={this.handleDeleteli}>刪除</button>
                        </span>
                    </div>
                    ;
            }

            liItem.push(
                <li key={FackData.id} className="todo-item">
                    {TagMake}
                </li>
            )

        });

        return (
            <ul className="todo-list-todos">
                {liItem}
            </ul >
        );
    }
}

class TodoListBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = FackData;
        // 為了讓 `this` 能在 callback 中被使用，這裡的綁定是必要的：
        this.handleDeleteli = this.handleDeleteli.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleEditmode = this.handleEditmode.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleAddtodo = this.handleAddtodo.bind(this);
    }

    // 這裡與傳遞到子元件的命名是一樣的只差在子元件模板那要注入事件到子元件，再由子元件反饋監聽物件到父元件這做處理。
    handleDeleteli(id) {
        // console.log(id);
        // console.log(this.state);
        const tdlenght = this.state.todos.lenght;
        this.state.todos.splice(tdlenght - id, 1);
        this.setState(this.state);
    }

    handleCheckbox(id) {
        // console.log(id);
        if (this.state.todos[(id - 1)].isCompleted == false) {
            this.state.todos[(id - 1)].isCompleted = true;
        } else {
            this.state.todos[(id - 1)].isCompleted = false;
        }
        // console.log(this.state);
        this.setState(this.state);
    }

    handleEditmode(id) {
        // console.log(id);
        // console.log(this.state);
        if (this.state.todos[(id - 1)].isEdit == false) {
            this.state.todos[(id - 1)].isEdit = true;
        } else {
            this.state.todos[(id - 1)].isEdit = false;
        }
        this.setState(this.state);
    }

    // https://stackoverflow.com/questions/27827234/how-to-handle-the-onkeypress-event-in-reactjs
    handleEdit(id, title) {
        // console.log(id);
        // console.log(title);
        this.state.todos[(id - 1)].title = title;
        this.state.todos[(id - 1)].isEdit = false;
        this.setState(this.state);
    }

    handleAddtodo(title) {
        console.log('handleAddtodo:' + title);

        // this.state.todos.push();
        // this.setState(this.state);
    }

    render() {
        return (
            <div>
                <TodoListNewTodo addTodo={this.handleAddtodo} />
                {/* https://zh-hant.reactjs.org/docs/components-and-props.html */}
                <TodoListTodos
                    onDeleteli={this.handleDeleteli}
                    onCheckbox={this.handleCheckbox}
                    onEditmode={this.handleEditmode}
                    onEdit={this.handleEdit}
                    FackData={this.state} />
                <TodoListDisplaySort FackData={this.state} />
            </div >
        );
    }
}

const FackData = {
    newTodoText: '',
    todos: [{
        id: 1,
        title: '吃早餐',
        isEdit: false,
        isCompleted: false,
    }, {
        id: 2,
        title: '起床',
        isEdit: false,
        isCompleted: false,
    }, {
        id: 3,
        title: '打開電腦',
        isEdit: false,
        isCompleted: true,
    }],
    nextTodoId: 4,
    filter: 'show_all'
};

ReactDOM.render(
    <div className="todo-list window">
        <TodoListHead />
        <TodoListBody className="todo-list-display-sort" />
    </div>,
    document.getElementById('todo-list')
);