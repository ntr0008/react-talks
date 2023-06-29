import React, { usestate, useEffect } from "react";
function FriendStatus(props) {
  //Inside the FriendStatus function component, the initial state of isOnline is set to null using the useState hook.
  const [isonline, setIsOnline] = usestate(null);
  function handleStatusChange(status) {
    //The handleStatusChange function is defined to update the isOnline state based on the received status parameter.
    setIsOnline(status.isOnline);
  }
  useEffect(() => {
    // The useEffect hook is used to subscribe to the friend's status and handle the side effect.
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      // The useEffect hook also returns a function. In this case, the function calls ChatAPI.unsubscribeFromFriendStatus with the props.friend.id and the handleStatusChange function.
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatuschange);
    };
  });
  if (isonline == null) {
    //If the isOnline state is null, it returns the string "Loading..." to indicate that the status is being fetched.
    return "Loading...";
  }
  return isOnline ? "Online" : "Offline"; // Finally, if the isOnline state is true, it returns the string "Online", and if it's false, it returns the string "Offline".
}
////////////////////////////////////////////  Q2  ///////////////////////////////////////
function formatDate(date) {
  return date.tolocaleDateString();
}

function Comment(props) {
  // The Comment function component takes in props as its parameter
  // props.author.name is used to display the name of the author.
  // props.author.avatarUrl is used as the source for the author's avatar image.
  // props.text is used to display the comment text.
  // props.date is passed to the formatDate function as an argument to format the comment date.
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img
          classNames="Avatar"
          src={fprops.author.əvatarurl}
          alt={props.author.name} //
        />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formaDate(props.date)}</div>
    </div>
  );
}

const comment = {
  // A comment object is created with properties date, text, and author
  date: new Date(),
  text: "I hope you enjoy learning React!",
  author: {
    name: "Hello Kitty",
    avatarUrl: "http://placekitten.com/9/64/64",
  },
};
const root = ReactDOM.createRoot(document.getElementById("root")); // The ReactDOM.createRoot function is used to create a root instance for rendering React elements into the DOM.
root.render(
  // The root.render method is called to render the Comment component with the comment object properties passed as props.
  <Comment date={comment.date} text={comment.text} author={comment.author} />
);

/////////////////////////////////////////  Q3  ///////////////////////////////////////////
function Child({ setValue }) {
  // The setValue function is passed as a prop
  // the setValue function is called when the button is clicked
  return (
    <>
      <div>Child</div>
      <button onClick={() => setValue("Parent has been updated!")}>
        Change Parent Value
      </button>
    </>
  );
}

function Parent() {
  // Inside the Parent component, the useState hook is called with an initial state value of "I need to be updated from my child"
  const [value, setValue] = React.useState(
    "I need to be updated from my child"
  );

  return (
    <>
      <h3>Update Parent State Challenge (Using Callback)</h3>
      <div className="wrapper">
        <div>Parent</div>
        <div className="box-wrapper">{value}</div>
      </div>

      <div className="wrapper">
        <Child setValue={setValue} />
      </div>
    </>
  );
}

ReactDOM.render(<Parent />, document.getElementById("root"));
//////////////////////////////////////  Q4  //////////////////////////////////////
// it is not a stateless component because it extends the React.Component class and defines a state using the constructor method.
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    // We declare the state as shown below

    this.state = {
      x: "This is x from state",
      y: "This is y from state",
    };
  }
  render() {
    return (
      <div>
        <h1>{this.state.x}</h1>
        <h2>{this.state.y}</h2>
      </div>
    );
  }
}
export default App;
/////////////////////////////////////////////////  Q5  ///////////////////////////////////////////////////

// The purpose of using parent and child components in React is to create a reusable component structure.
// The parent component acts as a container for one or more child components.
// It provides a way to organize and structure applications
function Child() {
  return <div>This is children content</div>;
}

function Parent({ children }) {
  return (
    <div>
      <h3>Parent Component</h3>
      {children}
    </div>
  );
}

function App() {
  return (
    <Parent>
      <Child />
    </Parent>
  );
}

////////////////////////////////////////////////  Q6  //////////////////////////////////////////////
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

export default function App() {
    // The path "/" is associated with the Layout component, which represents the overall layout structure for the application.
    // The index attribute in <Route index element={<Home />} /> specifies that the <Home /> component should be rendered when the URL matches the root path ("/").
    // The path="blogs" attribute in <Route path="blogs" element={<Blogs />} /> specifies that the <Blogs /> component should be rendered when the URL matches the "/blogs" path.
    // The path="contact" attribute in <Route path="contact" element={<Contact />} /> specifies that the <Contact /> component should be rendered when the URL matches the "/contact" path.
    // The path="*" attribute in <Route path="*" element={<NoPage />} /> is a catch-all route, indicating that the <NoPage /> component should be rendered when the URL does not match any of the defined paths.
    // This setup allows for the navigation between different pages of the application based on the URL. 
    // Using React Router is useful as it enables the development of multi-page-like applications within a single-page application framework.
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
/////////////////////////////////////////  Q7  ////////////////////////////////////////////////////////
// Higher Order Component which takes a component
// as input and returns another component
// "GlobalDataSource" is some global data source
// HOCs are functions that take a component as input and return an enhanced component with additional functionalities or behaviors
function HOC(WrappedComponent, selectData) { // The HOC function returns a dynamically created class component, using the class extends React.Component syntax. 
    return class extends React.Component {
      constructor(props) { // Inside the constructor of the returned component, the initial state is set with the data obtained by calling the selectData function with the GlobalDataSource and the props of the wrapped component.
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          data: selectData(GlobalDataSource, props),
        };
      }
      componentDidMount() { //The methods componentDidMount and componentWillUnmount are used to subscribe and unsubscribe to changes in the GlobalDataSource respectively. 
        // Listens to the changes added
        GlobalDataSource.addChangeListener(this.handleChange);
      }
      componentWillUnmount() {
        // Listens to the changes removed
        GlobalDataSource.removeChangeListener(this.handleChange);
      }
      handleChange() { // The handleChange method is invoked whenever a change occurs in the GlobalDataSource
        this.setState({
          data: selectData(GlobalDataSource, this.props),
        });
      }
      render() {
        // Rendering the wrapped component with the latest data data
        return <WrappedComponent data={this.state.data} {...this.props} />;
      }
    };
   }
   ///////////////////////////////////////////////  Q8  /////////////////////////////////////////
import axios from "axios"; // An HTTP GET request is being made to the specified URL using the axios package. The axios library is used for making asynchronous HTTP requests in JavaScript.
import React from "react"; // The code is using the React library, specifically the React.useState and React.useEffect hooks. 

const baseURL = "https://jsonplaceholder.typicode.com/posts/1"; // The axios.get() method is used to send a GET request to the baseURL

export default function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => { // The useEffect hook is used to perform the side effect of making the HTTP request.
    axios.get(baseURL).then((response) => { // Inside the useEffect hook, the axios.get request is made to the baseURL. The response data is then set as the new value of the post state using the setPost function.
      setPost(response.data);
    });
  }, []);

  if (!post) return null; // If the post state is still null the component returns null, rendering nothing.

  return ( // Once the data is available, the post object is rendered, displaying the title and body properties in an HTML structure.
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}