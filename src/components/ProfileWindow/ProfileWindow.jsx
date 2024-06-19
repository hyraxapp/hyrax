import React, { useEffect, useState } from 'react';
import { getUserProblemStats } from '../../actions/posts';
import './ProfileWindow.css';

const ProfileWindow = () => {
    const user = JSON.parse(localStorage.getItem("profile"));

    // Example state to manage checkbox visibility and user data
    const [showDomains, setShowDomains] = useState({
        algebra: false,
        advancedMath: false,
        problemSolvingAndDataAnalysis : false,
        geometryTrigonometry: false
    });
    const [userData, setUserData] = useState({});
    // Example user data (replace with actual data)
    useEffect(() => {
        if (user) {
            const fetchUserStats = async () => {
                const userStats = await getUserProblemStats(user?.result?._id);
                setUserData(userStats);
            }
            fetchUserStats();
        }
    });
    // Function to toggle visibility of domain sections
    const handleCheckboxChange = (domain) => {
        setShowDomains(prevState => ({
            ...prevState,
            [domain]: !prevState[domain]
        }));
    };

    return (user &&
        <div className="profile_window">
            <div className="profile_container">
                {/* Checkboxes for domains */}
                <div className="checkboxes">
                    <div className="checkBoxItem" onClick={() => handleCheckboxChange('algebra')}>
                        <label>
                            <input type="checkbox" checked={showDomains.algebra} onChange={() => handleCheckboxChange('algebra')} />
                            <label className="checkboxLabel">Algebra</label>
                        </label>
                    </div>
                    <div className="checkBoxItem" onClick={() => handleCheckboxChange('advancedMath')}>
                        <label>
                            <input type="checkbox" checked={showDomains.advancedMath} onChange={() => handleCheckboxChange('advancedMath')} />
                            <label className="checkboxLabel">Advanced Math</label>
                        </label>
                    </div>
                    <div className="checkBoxItem" onClick={() => handleCheckboxChange('problemSolvingAndDataAnalysis')}>
                        <label>
                            <input type="checkbox" checked={showDomains.problemSolvingAndDataAnalysis} onChange={() => handleCheckboxChange('problemSolvingAndDataAnalysis')} />
                            <label className="checkboxLabel">Problem Solving and Data Analysis</label>
                        </label>
                    </div>
                    <div className="checkBoxItem" onClick={() => handleCheckboxChange('geometryTrigonometry')}>
                        <label>
                            <input type="checkbox" checked={showDomains.geometryTrigonometry} onChange={() => handleCheckboxChange('geometryTrigonometry')} />
                            <label className="checkboxLabel">Geometry and Trigonometry</label>
                        </label>
                    </div>
                </div>

                {/* Sections for each domain */}
                {showDomains.algebra && (
                    <div className="subtopics">
                        <h1 className="subtopicTitle">Algebra</h1>
                        <div className="subtopic-grid">
                            <SubTopicSection domain="Linear Equations in One Variable" userData={{easy: userData.algebra.linEqOneVar.easy, medium: userData.algebra.linEqOneVar.medium, hard: userData.algebra.linEqOneVar.hard}} />
                            <SubTopicSection domain="Linear Functions" userData={{easy: userData.algebra.linFunctions.easy, medium: userData.algebra.linFunctions.medium, hard: userData.algebra.linFunctions.hard}} />
                            <SubTopicSection domain="Linear Equations In Two Variables" userData={{easy: userData.algebra.linEqTwoVar.easy, medium: userData.algebra.linEqTwoVar.medium, hard: userData.algebra.linEqTwoVar.hard}} />
                            <SubTopicSection domain="Systems Of Two Linear Equations In Two Variables" userData={{easy: userData.algebra.sysTwoLinEqTwoVar.easy, medium: userData.algebra.sysTwoLinEqTwoVar.medium, hard: userData.algebra.sysTwoLinEqTwoVar.hard}} />
                            <SubTopicSection domain="Linear Inequalities In One Or Two Variables" userData={{easy: userData.algebra.linIneqOneOrTwoVar.easy, medium: userData.algebra.linIneqOneOrTwoVar.medium, hard: userData.algebra.linIneqOneOrTwoVar.hard}} />
                        </div>
                    </div>
                )}
                {showDomains.advancedMath && (
                    <div className="subtopics">
                    <h1 className="subtopicTitle">Advanced Math</h1>
                    <div className="subtopic-grid">
                        <SubTopicSection domain="Nonlinear Functions" userData={{easy: userData.advMath.nonLinFunc.easy, medium: userData.advMath.nonLinFunc.medium, hard: userData.advMath.nonLinFunc.hard}} />
                        <SubTopicSection domain="Nonlinear Equations In One Variable And Systems Of Equations In Two Variables" userData={{easy: userData.advMath.nonLinEqOneVarAndSysEqTwoVar.easy, medium: userData.advMath.nonLinEqOneVarAndSysEqTwoVar.medium, hard: userData.advMath.nonLinEqOneVarAndSysEqTwoVar.hard}} />
                        <SubTopicSection domain="Equivalent expressions" userData={{easy: userData.advMath.equivExpressions.easy, medium: userData.advMath.equivExpressions.medium, hard: userData.advMath.equivExpressions.hard}} />
                    </div>
                </div>
                )}
                {showDomains.problemSolvingAndDataAnalysis && (
                    <div className="subtopics">
                        <h1 className="subtopicTitle">Problem Solving and Data Analysis</h1>
                        <div className="subtopic-grid">
                            <SubTopicSection domain="Ratios, Rates, Proportional Relationships, And Units" userData={{easy: userData.probSolvDataAnalysis.ratioRatePropRelationUnits.easy, medium: userData.probSolvDataAnalysis.ratioRatePropRelationUnits.medium, hard: userData.probSolvDataAnalysis.ratioRatePropRelationUnits.hard}} />
                            <SubTopicSection domain="Percentages" userData={{easy: userData.probSolvDataAnalysis.percentages.easy, medium: userData.probSolvDataAnalysis.percentages.medium, hard: userData.probSolvDataAnalysis.percentages.hard}} />
                            <SubTopicSection domain="One-variable Data: Distributions And Measures Of Center And Spread" userData={{easy: userData.probSolvDataAnalysis.oneVarDataDistribMeasuresCenterSpread.easy, medium: userData.probSolvDataAnalysis.oneVarDataDistribMeasuresCenterSpread.medium, hard: userData.probSolvDataAnalysis.oneVarDataDistribMeasuresCenterSpread.hard}} />
                            <SubTopicSection domain="Two-variable Data: Models And Scatterplots" userData={{easy: userData.probSolvDataAnalysis.twoVarDataModelScatPlot.easy, medium: userData.probSolvDataAnalysis.twoVarDataModelScatPlot.medium, hard: userData.probSolvDataAnalysis.twoVarDataModelScatPlot.hard}} />
                            <SubTopicSection domain="Probability And Conditional Probability" userData={{easy: userData.probSolvDataAnalysis.probConditionalProb.easy, medium: userData.probSolvDataAnalysis.probConditionalProb.medium, hard: userData.probSolvDataAnalysis.probConditionalProb.hard}} />
                            <SubTopicSection domain="Inference From Sample Statistics And Margin Of Error" userData={{easy: userData.probSolvDataAnalysis.infFromSampleStatAndMarginError.easy, medium: userData.probSolvDataAnalysis.infFromSampleStatAndMarginError.medium, hard: userData.probSolvDataAnalysis.infFromSampleStatAndMarginError.hard}} />
                            <SubTopicSection domain="Evaluating Statistical Claims: Observational Studies And Experiments" userData={{easy: userData.probSolvDataAnalysis.evalStatClaimObvStudyAndExperiment.easy, medium: userData.probSolvDataAnalysis.evalStatClaimObvStudyAndExperiment.medium, hard: userData.probSolvDataAnalysis.evalStatClaimObvStudyAndExperiment.hard}} />
                        </div>
                    </div>
                )}
                {showDomains.geometryTrigonometry && (
                    <div className="subtopics">
                        <h1 className="subtopicTitle">Problem Solving and Data Analysis</h1>
                        <div className="subtopic-grid">
                            <SubTopicSection domain="Area And Volume" userData={{easy: userData.geoTrig.areaAndVolume.easy, medium: userData.geoTrig.areaAndVolume.medium, hard: userData.geoTrig.areaAndVolume.hard}} />
                            <SubTopicSection domain="Lines, Angles, And Triangles" userData={{easy: userData.geoTrig.lineAngleTriangle.easy, medium: userData.geoTrig.lineAngleTriangle.medium, hard: userData.geoTrig.lineAngleTriangle.hard}} />
                            <SubTopicSection domain="Right Triangles And Trigonometry" userData={{easy: userData.geoTrig.rightTriangleTrig.easy, medium: userData.geoTrig.rightTriangleTrig.medium, hard: userData.geoTrig.rightTriangleTrig.hard}} />
                            <SubTopicSection domain="Circles" userData={{easy: userData.geoTrig.circles.easy, medium: userData.geoTrig.circles.medium, hard: userData.geoTrig.circles.hard}} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Component for displaying circles and difficulty buttons for each domain
const SubTopicSection = ({ domain, userData }) => {
  const { easy, medium, hard } = userData;
  const [mode, setMode] = useState('Easy');

  const [correct, setCorrect] = useState(easy.correct);
  const [incorrect, setIncorrect] = useState(easy.incorrect);
  const [givenUp, setGivenUp] = useState(easy.giveup);
  const total = Math.max(1, correct + incorrect + givenUp);
  const [correctPercentage, setCorrectPercentage] = useState(parseFloat(correct / total) * 100);
  const [incorrectPercentage, setIncorrectPercentage] = useState(parseFloat(incorrect / total) * 100);
  const [givenUpPercentage, setGivenUpPercentage] = useState(parseFloat(givenUp / total) * 100);

  const handleButtonClick = (difficulty) => {
    setMode(difficulty);
    switch (difficulty) {
      case 'Easy':
        setCorrect(easy.correct);
        setIncorrect(easy.incorrect);
        setGivenUp(easy.giveup);
        setCorrectPercentage(parseFloat(easy.correct / Math.max(1, (easy.correct + easy.incorrect + easy.giveup))) * 100);
        setIncorrectPercentage(parseFloat(easy.incorrect / Math.max(1, (easy.correct + easy.incorrect + easy.giveup))) * 100);
        setGivenUpPercentage(parseFloat(easy.giveup / Math.max(1, (easy.correct + easy.incorrect + easy.giveup))) * 100);
        break;
      case 'Medium':
        setCorrect(medium.correct);
        setIncorrect(medium.incorrect);
        setGivenUp(medium.giveup);
        setCorrectPercentage(parseFloat(medium.correct / Math.max(1, (medium.correct + medium.incorrect + medium.giveup))) * 100);
        setIncorrectPercentage(parseFloat(medium.incorrect / Math.max(1, (medium.correct + medium.incorrect + medium.giveup))) * 100);
        setGivenUpPercentage(parseFloat(medium.giveup / Math.max(1, (medium.correct + medium.incorrect + medium.giveup))) * 100);
        break;
      case 'Hard':
        setCorrect(hard.correct);
        setIncorrect(hard.incorrect);
        setGivenUp(hard.giveup);
        setCorrectPercentage(parseFloat(hard.correct / Math.max(1, (hard.correct + hard.incorrect + hard.giveup))) * 100);
        setIncorrectPercentage(parseFloat(hard.incorrect / Math.max(1, (hard.correct + hard.incorrect + hard.giveup))) * 100);
        setGivenUpPercentage(parseFloat(hard.giveup / Math.max(1, (hard.correct + hard.incorrect + hard.giveup))) * 100);
        break;
      default:
        break;
    }
  };
    return (
        <div className="subtopic-section">
            <h3>{domain}</h3>
            <h3>({mode})</h3>
            {/* Example circle for correct/incorrect/give-up */}
            <div className="accuracy-ring">
                <svg width="100%" height="100%" viewBox="0 0 42 42">
                    <circle cx="21" cy="21" r="15" fill="none" stroke="#ddd" strokeWidth="4" />
                    <circle cx="21" cy="21" r="15" fill="none" stroke="#2ECC40" strokeWidth="4" strokeDasharray={`${correctPercentage} ${100 - correctPercentage}`}/>
                    <circle cx="21" cy="21" r="15" fill="none" stroke="#FF3737" strokeWidth="4" strokeDasharray={`${incorrectPercentage} ${100 - incorrectPercentage}`} strokeDashoffset={`${100-correctPercentage}`} />
                    <circle cx="21" cy="21" r="15" fill="none" stroke="#87CEEB" strokeWidth="4" strokeDasharray={`${givenUpPercentage} ${100 - givenUpPercentage}`} strokeDashoffset={`${100 -(correctPercentage + incorrectPercentage)}`} />
                </svg>
                <div className="accuracy-text">
                    <p>Correct: {correct}</p>
                    <p>Incorrect: {incorrect}</p>
                    <p>Given Up: {givenUp}</p>
                </div>
            </div>
            {/* Difficulty buttons */}
            <div className="difficulty-buttons">
            <button onClick={() => handleButtonClick('Easy')}>Easy</button>
            <button onClick={() => handleButtonClick('Medium')}>Medium</button>
            <button onClick={() => handleButtonClick('Hard')}>Hard</button>
            </div>
        </div>
    );
};

export default ProfileWindow;
