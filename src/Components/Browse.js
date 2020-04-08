import React, { Component } from "react";
import "./Componet.css";
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import axios from 'axios';
import config from '../configuration'
class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = { //state is by default an object
            key: 'student',
            selectedFile: null,
            students: null,
            classes: null,
            Subjectes: null,
            Exams: null,
            Marks: null,
        }
        this.handleSelectTab = this.handleSelectTab.bind(this);
    }

    componentDidMount() {
        this.props.showHeader();
        this.handleSelectTab('student');
    }

    backtoLoginClickHandler = () => {
        this.props.history.push('/Login');
    }

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    handleFile = () => {

      if(this.state.selectedFile === null)
      {
        alert("Select a file to upload!");
        return;
      }
        const data = new FormData()
        data.append('excelfile', this.state.selectedFile)

        axios.post('http://localhost:8081/marks/processFile', data, {}).then((res) => {
            //on success
            console.log(res.data.status);
            alert(res.data.status + res.data.message);
        }).catch((error) => {
            //on error
            console.log("error!");
            alert("error!");
        });

    }
    SheetJSFT = ["xlsx", "xls", "csv"].map(function (x) { return "." + x; }).join(",");


    handleSelectTab(key) {
        this.setState({ key });
        if (key === "class") {
            this.callAPI(config.url +"/masterdata/class", 2);
        }
        else if (key === "subject") {
            this.callAPI(config.url +"/masterdata/subjects", 3);
        }
        else if (key === "exam") {
            this.callAPI(config.url +"/masterdata/exams", 4);
        }
        else if (key === "marks") {
            this.callAPI(config.url +"/masterdata/marks", 5);
        }
        else if (key === "student") {
            this.callAPI(config.url +"/masterdata/students", 1);
        }
    }

    callAPI = (url, key) => {
        axios.get(url, {}).then((res) => {
            //on success
            if (res.data.body.list.length > 0) {
                if (key === 2) { //class API
                    this.setState({
                        classes: res.data.body.list
                    });
                }
                else if (key === 1) { //student
                    this.setState({
                        students: res.data.body.list
                    });
                }
                else if (key === 3) { // subject
                    this.setState({
                        Subjectes: res.data.body.list
                    });
                }
                else if (key === 4) { // Exam
                    this.setState({
                        Exams: res.data.body.list
                    });
                }
                else if (key === 5) { // marks
                    this.setState({
                        Marks: res.data.body.list
                    });
                }
            }
            else {
                alert("No data")
            }
        }).catch((error) => {
            //on error

        });
    }


    render() {
        return (
            <div className="main-div">
                <div className="tab">
                    <Tabs activeKey={this.state.key} onSelect={this.handleSelectTab}
                        id="tab-example">
                        <Tab eventKey="student" title="Student">
                            {this.state.students ? this.getTable("Student", this.state.students) : ""}

                        </Tab>
                        <Tab eventKey="class" title="Class">
                            {this.state.classes ? this.getTable("Class", this.state.classes) : ""}

                        </Tab>
                        <Tab eventKey="subject" title="Subject">
                            <div id="Subject" className="tabcontent"
                               >
                                {this.state.Subjectes ? this.getTable("Subject", this.state.Subjectes) : ""}
                            </div>
                        </Tab>
                        <Tab eventKey="exam" title="Exam">
                            <div id="Exam" className="tabcontent"
                                >
                                {this.state.Exams ? this.getTable("Subject", this.state.Exams) : ""}
                            </div>
                        </Tab>
                        <Tab eventKey="marks" title="Marks">
                            <div id="Marks" className="tabcontent">                                 
                                {this.state.Marks ? this.getTable("Marks", this.state.Marks) : ""}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }

    getTable(name, list) {
        let browseDiv = null;
        browseDiv = name === 'Marks' ?
            <div>
                <label className="custom-file-upload">
                    <input type="file" accept={this.SheetJSFT} onChange={this.onChangeHandler}/>
                    Import Marks
                </label>
                <button type="submit" className="btn btn-success" onClick={this.handleFile}>Upload</button>
            </div> : null

        return (
            <div>
                <h3>{name}</h3>
                {browseDiv}
                <table id={name} className="table">
                    <thead>
                        <tr>
                            {this.getHeaderColumns(list)}
                        </tr>
                    </thead>
                    <tbody>
                        {this.getTableRows(list)}
                    </tbody>
                </table>
            </div>
        )
    }
    getHeaderColumns(list) {
        var keys = Object.keys(list[0]);
        return keys.map((key, index) => {
            return <th key={key}>{key.toUpperCase()}</th>
        })
    }

    getTableRows(list) {
        var keys = Object.keys(list[0]);
        return list.map((item, i) => {
            return (
                <tr key={i}>
                    {keys.map((key,i) => { return (<td key={i}>{item[key]}</td>) })}
                </tr>
            )
        })
    }
}
export default withRouter(Browse)