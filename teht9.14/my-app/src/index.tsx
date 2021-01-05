import { assert } from "console";
import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CourseDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CourseDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CourseDescription {
  name: "Ihan jeppis kurssi";
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)} `);
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return <p>{part.name} {part.exerciseCount}, {part.description} </p>
      break;
    case "Using props to pass data":
      return <p>{part.name} {part.exerciseCount}, {part.groupProjectCount} </p>
      break;
    case "Deeper type usage":
      return <p>{part.name} {part.exerciseCount}, {part.description}, {part.exerciseSubmissionLink}</p>
      break;
    case "Ihan jeppis kurssi":
      return <p>{part.name} {part.exerciseCount}, {part.description} </p>
      break;
    default:
      return assertNever(part);
  }
}

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

const Content: React.FC<{ parts: Array<CoursePart> }> = (props) => {
  const lista = props.parts;
  console.log(lista);
  return(
    <div>
      {lista.map((part, indeksi) => <Part part={part} key={indeksi}/>)}
    </div>
  )
};

const Total: React.FC<CourseArray> = (props) => {
  const courseArray = props.courseArray;
  const total = courseArray.reduce((a, b) => a + b.exerciseCount, 0)
  console.log(total);
  return <div><p>Number of exercises {total}</p></div>
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Ihan jeppis kurssi",
      exerciseCount: 15,
      description: "Tällä kurssilla jeppistellään"
    }
  ];

  return (
    <div>
      <Header courseName={courseName}/>
      <Content parts={courseParts}/>
      <Total courseArray={courseParts}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));