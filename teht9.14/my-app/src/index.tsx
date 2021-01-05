import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  courseName: string;
}

interface ContentProps {
  name: string;
  exerciseCount: number;
}

interface CourseArray {
  courseArray: ContentProps[];
}

const Header: React.FC<HeaderProps> = (props) => {
  return <b><p> {props.courseName} </p></b>;
};

const Content: React.FC<CourseArray> = (props) => {
  const courseArray = props.courseArray;
  const elementit = courseArray.map(a => <p key={Math.random()}> {a.name} {a.exerciseCount}</p>)
  return <div>{elementit}</div>
};

const Total: React.FC<CourseArray> = (props) => {
  const courseArray = props.courseArray;
  const total = courseArray.reduce((a, b) => a + b.exerciseCount, 0)
  console.log(total);
  return <div><p>Number of exercises {total}</p></div>
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseArray={courseParts}/>
      <Total courseArray={courseParts}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));