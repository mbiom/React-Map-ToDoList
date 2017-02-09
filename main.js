var React = require('react');
var App = require('./components/App');

React.render(
  <App />,
  document.getElementById('main')
);

var allItems = []
allItems.push("Buy ingredients for Crock Pot");
allItems.push("Pick up chair at IKEA");
allItems.push("Go see mom");

class TodoList extends React.Component {
  constructor(props){
    super(props);
    this.addEvent = this.addEvent.bind(this);
  }
  getInitialState() {
    return { allItems };
  }
  render() {
    var items = this.props.items.map((item) => {
      return <li><TodoItem item={item} /></li>;
    })
    return(
      <div>
        <ul>{items}</ul>
        <p><NewTodoItem addEvent={this.addEvent} /></p>
      </div>
    );
  }
  addEvent(todoItem){
    allItems.push(todoItem.newItem);
    this.setState({ allItems });
  }
}

class TodoItem extends React.Component {
	render(){
		return <div>{this.props.item}</div>;
	}
}

class NewTodoItem extends React.Component {
	constructor(props){
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount(){
		React.findDOMNode(this.refs.itemName).focus();
	}
	render(){
	    return (<form onSubmit={this.onSubmit}>
	    	<input ref="itemName" type="text" />
	    </form>);
	}
	onSubmit(event){
	    event.preventDefault();
	    var input = React.findDOMNode(this.refs.itemName)
	    var newItem = input.value;
	    this.props.addEvent({ newItem });
	    input.value = '';
	}
}

// var objTodoList = <TodoList items={allItems} />;
// module.exports = objTodoList;
// React.render(<objTodoList />, document.getElementById('todolist'));
React.render(<TodoList items={allItems} />, document.getElementById('todolist'));