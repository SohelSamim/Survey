
import React, {Component} from 'react';
import './App.css';
import firebase from "firebase";
var uuid = require('uuid');

var firebaseConfig = {
    apiKey: "AIzaSyDqi8csghGwfXYrxCbz7RN1xvD5isu3FTc",
    authDomain: "studentsurvey-1656a.firebaseapp.com",
    databaseURL: "https://studentsurvey-1656a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "studentsurvey-1656a",
    storageBucket: "studentsurvey-1656a.appspot.com",
    messagingSenderId: "439372951300",
    appId: "1:439372951300:web:291603a4f190f5184cea51",
    measurementId: "G-V0K4DL29VJ"
  };
  //Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

class StudentSurvey extends Component {
    orgNameSubmit(event) {
        var name = this.refs.name.value;
        this.setState({ orgName: name }, function () {
            console.log(this.state);
        })
    };

    surveySubmit(event) {
        firebase.database().ref('studentSurvey/' + this.state.uid).set({
            orgName: this.state.orgName,
            answers: this.state.answers
            
        });
        this.setState({isSubmitted:true})
        
    };

    answerSelected(event) {
        var answers = this.state.answers;

        if(event.target.name == 'ans1') {
            answers.ans1 = event.target.value;
        }
        else if(event.target.name == 'ans2') {
            answers.ans2 = event.target.value;
        }
        else if(event.target.name == 'ans3') {
            answers.ans3 = event.target.value;
        }
        else if(event.target.name == 'ans4') {
            answers.ans4 = event.target.value;
        }
        else if(event.target.name == 'ans5') {
            answers.ans5 = event.target.value;
        }

        this.setState({answers:answers},function(){
            console.log(this.state);
        })
    };

    constructor(props) {
        super(props);

        this.state = {
            uid: uuid.v1(),
            orgName: '',
            answers: {
                ans1: '',
                ans2: '',
                ans3: '',
                ans4: '',
                ans5: '',
            },
            isSubmitted: false
            
            
        };
        this.orgNameSubmit = this.orgNameSubmit.bind(this)
        this.surveySubmit = this.surveySubmit.bind(this);
        this.answerSelected = this.answerSelected.bind(this)
            
    }

    render() {
        var name = '';
        var questions = '';

        if (this.state.orgName == '' && this.state.isSubmitted == false) {
            name = <div>

                <h1> Hei! Inter Organisasjons navn eller nummer: </h1>

                <form onSubmit={this.orgNameSubmit}>
                    <input className="sName" type="text" placeholder="Venlgist inter ditt organisasjons nummer/navn" ref="name" />
                </form>
            </div>;
            
        }
        else if (this.state.orgName !== '' && this.state.isSubmitted == false) {
            name = <div>
                <h1> Firma {this.state.orgName} Velkommen til spørudersøkelse </h1>
            </div>;
            questions = <div>
                <form onSubmit={this.surveySubmit}>

                    <div className="Card">
                        <label> 1. I hvilken grad er bedriftens bærekraftsarbeid strategisk viktig?<br />
                                Svar: Skala fra 0 – 5, 0 = Ikke viktig, 5= Helt avgjørende</label> <br />
                        <input type="radio" name="ans1" value="1" onChange={this.answerSelected} /> 1
                        <input type="radio" name="ans1" value="2" onChange={this.answerSelected} /> 2
                        <input type="radio" name="ans1" value="3" onChange={this.answerSelected} /> 3 
                        <input type="radio" name="ans1" value="4" onChange={this.answerSelected} /> 4
                        <input type="radio" name="ans1" value="5" onChange={this.answerSelected} /> 5
                    </div>

                    <div className="Card">
                        <label> 2. Har bedriften utnevnt konkrete personer som er ansvarlig for
                                   bærekraftsarbeidet hos dere?<br/>
                                Svar: JA / NEI / Usikker</label> <br />
                        <input type="radio" name="ans2" value="1" onChange={this.answerSelected} /> Ja
                        <input type="radio" name="ans2" value="2" onChange={this.answerSelected} /> Nei
                        <input type="radio" name="ans2" value="3" onChange={this.answerSelected} /> Usikker
                    </div>

                    <div className="Card">
                        <label> 3. I tilfelle: Er dette en egen stilling?<br/>
                                   Svar: JA / NEI / Usikker</label> <br />
                        <input type="radio" name="ans4" value="jan" onChange={this.answerSelected} /> Ja
                        <input type="radio" name="ans4" value="man" onChange={this.answerSelected} /> Nei
                        <input type="radio" name="ans4" value="dan" onChange={this.answerSelected} /> Usikker
                    </div>

                    < div className="Card">
                        <label> 4. Har bedriften gjennomført miljø, klima eller sosiale bærekraftstiltak<br />
                                det siste året?
                                var: JA / NEI / Usikker</label> <br />
                        <input type="radio" name="ans5" value="1" onChange={this.answerSelected} /> Ja
                        <input type="radio" name="ans5" value="2" onChange={this.answerSelected} /> Nei
                        <input type="radio" name="ans5" value="3" onChange={this.answerSelected} /> Usikker
                    </div>


                    <div className="Card">
                        <label> 7. Hvor bærekraftig anser du [bedrift] å være pr. i dag innenfor disse områdene</label> <br />
                        <input type="radio" name="ans3" value="1" onChange={this.answerSelected} /> People – sosialt og samfunnsmessig bærekraft<br/>
                        <input type="radio" name="ans3" value="2" onChange={this.answerSelected} /> Planet – klima og miljø, både på land, i luft og i hav.<br/>
                        <input type="radio" name="ans3" value="3" onChange={this.answerSelected} /> Profit – økonomisk bærekraft
                    </div>
                    

                    <div className="Card">
                        <label> Andre spørsmål</label> <br/>
                        <input type="radio" name="ans3" value="1" onChange={this.answerSelected} /> Blue
                        <input type="radio" name="ans3" value="2" onChange={this.answerSelected} /> Gull
                        <input type="radio" name="ans3" value="3" onChange={this.answerSelected} /> Rødt
                        <input type="radio" name="ans3" value="4" onChange={this.answerSelected} /> Sort
                        <input type="radio" name="ans3" value="5" onChange={this.answerSelected} /> Hvit
                    </div>
                    <input className="feedback-button" type="submit" value="send skjema" />
                </form>
            </div>
        }
            
        else if (this.state.orgName == '' && this.state.isSubmitted == true) {
            name = <div>
                <h1> Svarene dine er nå sendt Tusen takk!</h1>
            </div>
        }
        return (
            <div>
                { name}
                ========================================
                {questions}
            </div>
    );
    }
}
export default StudentSurvey